import "server-only";
import { supabaseServer } from "@/lib/supabaseServer";
import {
  EXAM_APPROVAL_VALID_DAYS,
  EXAM_ATTEMPT_WINDOW_HOURS,
  EXAM_BANK_VERSION,
  EXAM_DURATION_MINUTES,
  EXAM_MAX_ATTEMPTS_PER_WINDOW,
  EXAM_QUESTIONS_PER_TYPE,
  EXAM_RETRY_COOLDOWN_MINUTES,
} from "../constants";
import {
  obtenerBancoTecnico,
  preguntasEticasGlobales,
  obtenerPreguntaPorId,
} from "../bancos";
import type { PreguntaPublica } from "../types";
import { sampleSecure, shuffleSecure } from "./random";
import { gradeAttempt, type ExamResponses, type OptionOrder } from "./grading";
import { validateQuestionBanks } from "../validation";
import { assertSubmittableAttempt } from "./policies";

validateQuestionBanks();

type AttemptRow = {
  id: string;
  user_id: string;
  module_id: number;
  status: "started" | "submitted" | "expired";
  created_at: string;
  expires_at: string;
  question_selection: { id: string; tipo: "etica" | "tecnica" }[];
  option_order: OptionOrder;
  attempt_number: number;
  approved: boolean | null;
  application_id: string | null;
};

const addMinutes = (date: Date, minutes: number) =>
  new Date(date.getTime() + minutes * 60_000);
const addDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * 86_400_000);

export async function createAttempt(userId: string, moduleId: number) {
  if (!Number.isInteger(moduleId) || moduleId < 1 || moduleId > 30) {
    throw new Error("INVALID_MODULE");
  }

  const now = new Date();
  const windowStart = new Date(
    now.getTime() - EXAM_ATTEMPT_WINDOW_HOURS * 3_600_000,
  ).toISOString();
  const { data: recent, error: recentError } = await supabaseServer
    .from("committee_exam_attempts")
    .select("id,status,approved,submitted_at,attempt_number")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .gte("created_at", windowStart)
    .order("created_at", { ascending: false });
  if (recentError) throw recentError;
  if ((recent?.length ?? 0) >= EXAM_MAX_ATTEMPTS_PER_WINDOW) {
    throw new Error("ATTEMPT_LIMIT");
  }
  const lastFailed = recent?.find(
    (attempt) => attempt.status === "submitted" && !attempt.approved,
  );
  if (lastFailed?.submitted_at) {
    const retryAt = addMinutes(
      new Date(lastFailed.submitted_at),
      EXAM_RETRY_COOLDOWN_MINUTES,
    );
    if (retryAt > now) throw new Error("RETRY_COOLDOWN");
  }

  const selected = shuffleSecure([
    ...sampleSecure(preguntasEticasGlobales, EXAM_QUESTIONS_PER_TYPE),
    ...sampleSecure(obtenerBancoTecnico(moduleId), EXAM_QUESTIONS_PER_TYPE),
  ]);
  const optionOrder: OptionOrder = {};
  for (const question of selected) {
    optionOrder[question.id] = shuffleSecure([0, 1, 2, 3]);
  }

  const selection = selected.map(({ id, tipo }) => ({ id, tipo }));
  const { data, error } = await supabaseServer
    .from("committee_exam_attempts")
    .insert({
      user_id: userId,
      module_id: moduleId,
      bank_version: EXAM_BANK_VERSION,
      status: "started",
      started_at: now.toISOString(),
      expires_at: addMinutes(now, EXAM_DURATION_MINUTES).toISOString(),
      question_selection: selection,
      option_order: optionOrder,
      attempt_number:
        Math.max(0, ...(recent ?? []).map((item) => item.attempt_number ?? 0)) + 1,
    })
    .select(
      "id,user_id,module_id,status,created_at,expires_at,question_selection,option_order,attempt_number,approved,application_id",
    )
    .single();
  if (error) throw error;
  return publicAttempt(data as AttemptRow);
}

export function publicAttempt(attempt: AttemptRow) {
  const questions: PreguntaPublica[] = attempt.question_selection.map(
    (selected) => {
      const question = obtenerPreguntaPorId(selected.id);
      const order = attempt.option_order[selected.id];
      if (!question || !order) throw new Error("INVALID_STORED_ATTEMPT");
      return {
        id: question.id,
        pregunta: question.pregunta,
        tipo: question.tipo,
        opciones: order.map((originalIndex) => question.opciones[originalIndex]),
      };
    },
  );
  return {
    attempt_id: attempt.id,
    module_id: attempt.module_id,
    expires_at: attempt.expires_at,
    attempt_number: attempt.attempt_number,
    questions,
  };
}

export async function submitAttempt(
  userId: string,
  attemptId: string,
  responses: ExamResponses,
) {
  const { data, error } = await supabaseServer
    .from("committee_exam_attempts")
    .select(
      "id,user_id,module_id,status,created_at,expires_at,question_selection,option_order,attempt_number,approved,application_id",
    )
    .eq("id", attemptId)
    .single();
  if (error || !data) throw new Error("ATTEMPT_NOT_FOUND");
  const attempt = data as AttemptRow;
  try {
    assertSubmittableAttempt(attempt, userId);
  } catch (accessError) {
    if (
      accessError instanceof Error &&
      accessError.message === "ATTEMPT_EXPIRED"
    ) {
    await supabaseServer
      .from("committee_exam_attempts")
      .update({ status: "expired" })
      .eq("id", attempt.id)
      .eq("status", "started");
    }
    throw accessError;
  }

  const result = gradeAttempt(
    attempt.question_selection,
    attempt.option_order,
    responses,
  );
  const submittedAt = new Date();
  const { data: updated, error: updateError } = await supabaseServer
    .from("committee_exam_attempts")
    .update({
      status: "submitted",
      submitted_at: submittedAt.toISOString(),
      responses,
      score: result.score,
      ethics_score: result.ethicsScore,
      technical_score: result.technicalScore,
      approved: result.approved,
      expires_at: result.approved
        ? addDays(submittedAt, EXAM_APPROVAL_VALID_DAYS).toISOString()
        : attempt.expires_at,
    })
    .eq("id", attempt.id)
    .eq("status", "started")
    .select("id")
    .single();
  if (updateError || !updated) throw new Error("ALREADY_SUBMITTED");

  return {
    total: 10,
    correctas: result.score,
    eticas_correctas: result.ethicsScore,
    tecnicas_correctas: result.technicalScore,
    aprobado: result.approved,
  };
}
