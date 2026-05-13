"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AuthGuard from "../../../components/AuthGuard";

type Dictamen = {
  id: string;
  proposal_id: string;
  module_id: number | null;
  module_name: string | null;
  proposal_title: string | null;
  folio: string | null;
  report_version: number | null;
  report_type: string | null;
  status: string | null;
  facts: string | null;
  evidence_summary: string | null;
  methodology: string | null;
  technical_analysis: string | null;
  legal_human_rights_basis: string | null;
  risks: string | null;
  impact_analysis: string | null;
  recommendations: string | null;
  public_summary: string | null;
  final_conclusion: string | null;
  conflict_of_interest_review: string | null;
  chain_of_custody_summary: string | null;
  document_hash: string | null;
  chain_head_hash: string | null;
  locked: boolean;
  created_at: string;
};

export default function DictamenDetallePage() {
  const params = useParams();
  const dictamenId = params?.id as string;

  const [dictamen, setDictamen] = useState<Dictamen | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDictamen();
  }, []);

  async function cargarDictamen() {
    const res = await fetch("/api/comites/dictamenes");
    const data = await res.json();

    if (data.ok) {
      const encontrado = (data.reports || []).find(
        (r: Dictamen) => r.id === dictamenId
      );
      setDictamen(encontrado || null);
    }

    setLoading(false);
  }

  function Section({
    title,
    content,
  }: {
    title: string;
    content: string | null;
  }) {
    if (!content) return null;

    return (
      <div className="rounded-[24px] bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
          {title}
        </div>

        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">
          {content}
        </pre>
      </div>
    );
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#0A4E84]">
        <div className="mx-auto max-w-md">
          <Link
            href="/comites/panel"
            className="mb-4 inline-block text-sm font-semibold"
          >
            ← Volver al panel
          </Link>

          {loading ? (
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              Cargando dictamen...
            </div>
          ) : !dictamen ? (
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              No se encontró el dictamen.
            </div>
          ) : (
            <>
              <section className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="text-sm font-bold text-[#C2187A]">
                  Dictamen técnico colegiado
                </div>

                <h1 className="mt-2 text-3xl font-bold leading-tight">
                  {dictamen.proposal_title || "Dictamen sin título"}
                </h1>

                <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  <div>
                    Folio: <strong>{dictamen.folio}</strong>
                  </div>
                  <div>
                    Estado: <strong>{dictamen.status}</strong>
                  </div>
                  <div>
                    Versión: <strong>{dictamen.report_version || 1}</strong>
                  </div>
                  <div>
                    Módulo:{" "}
                    <strong>
                      {dictamen.module_id} {dictamen.module_name}
                    </strong>
                  </div>
                  <div>
                    Creado:{" "}
                    <strong>
                      {new Date(dictamen.created_at).toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-xs leading-6 text-blue-900">
                  Este dictamen preliminar organiza hechos, evidencia,
                  metodología, riesgos y recomendaciones. No sustituye autoridad
                  competente ni peritaje judicial formal.
                </div>
              </section>

              <section className="mt-6 space-y-4">
                <Section title="Hechos identificados" content={dictamen.facts} />
                <Section title="Evidencia disponible" content={dictamen.evidence_summary} />
                <Section title="Metodología" content={dictamen.methodology} />
                <Section title="Análisis técnico" content={dictamen.technical_analysis} />
                <Section title="Base jurídica y DDHH" content={dictamen.legal_human_rights_basis} />
                <Section title="Riesgos" content={dictamen.risks} />
                <Section title="Impacto" content={dictamen.impact_analysis} />
                <Section title="Recomendaciones" content={dictamen.recommendations} />
                <Section title="Conflictos de interés" content={dictamen.conflict_of_interest_review} />
                <Section title="Cadena de custodia" content={dictamen.chain_of_custody_summary} />
                <Section title="Resumen público" content={dictamen.public_summary} />
                <Section title="Conclusión" content={dictamen.final_conclusion} />

                <div className="rounded-[24px] bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C2187A]">
                    Integridad
                  </div>

                  <div className="mt-3 break-words text-xs leading-6 text-slate-700">
                    <div>
                      Hash documental:
                      <br />
                      <strong>{dictamen.document_hash || "Pendiente"}</strong>
                    </div>

                    <div className="mt-3">
                      Chain head:
                      <br />
                      <strong>{dictamen.chain_head_hash || "Pendiente"}</strong>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
