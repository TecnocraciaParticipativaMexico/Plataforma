import "server-only";
import { supabaseServer } from "@/lib/supabaseServer";
import {
  EXAM_APPROVAL_VALID_DAYS,
  EXAM_BANK_VERSION,
  EXAM_DURATION_MINUTES,
  EXAM_QUESTIONS_PER_TYPE,
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
import { toPublicQuestion } from "../public";

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
    .rpc("create_committee_exam_attempt", {
      p_user_id: userId,
      p_module_id: moduleId,
      p_bank_version: EXAM_BANK_VERSION,
      p_expires_at: addMinutes(now, EXAM_DURATION_MINUTES).toISOString(),
      p_question_selection: selection,
      p_option_order: optionOrder,
    })
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
      return toPublicQuestion(question, order);
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
