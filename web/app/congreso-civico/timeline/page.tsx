import Link from "next/link";
import {
  alertasCongresoCivico,
  iniciativasCongresoCivico,
  timelineCongresoCivico,
} from "../../lib/congresoCivico";

const tipoEventoPorFase = {
  "1.": "Registro",
  "2.": "Revision ciudadana",
  "3.": "Alerta civica",
  "4.": "Seguimiento",
} as const;

const tipoColor = {
  Registro: "bg-[#0EA5E9] text-white",
  "Revision ciudadana": "bg-[#8B5CF6] text-white",
  "Alerta civica": "bg-[#E4007C] text-white",
  Seguimiento: "bg-[#16A34A] text-white",
} as const;

type TipoEvento = keyof typeof tipoColor;

function obtenerTipoEvento(fase: string): TipoEvento {
  const clave = Object.keys(tipoEventoPorFase).find((prefijo) => fase.startsWith(prefijo));

  return clave ? tipoEventoPorFase[clave as keyof typeof tipoEventoPorFase] : "Seguimiento";
}

function obtenerIniciativaRelacionada(fase: string) {
  if (fase.startsWith("1.")) {
    return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === "ini-003");
  }

  if (fase.startsWith("2.")) {
    return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === "ini-001");
  }

  if (fase.startsWith("3.")) {
    return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === "ini-002");
  }

  return iniciativasCongresoCivico.find((iniciativa) => iniciativa.id === "ini-003");
}

function obtenerAlertaRelacionada(fase: string) {
  if (fase.startsWith("3.")) {
    return alertasCongresoCivico.find((alerta) => alerta.id === "alt-001");
  }

  if (fase.startsWith("4.")) {
    return alertasCongresoCivico.find((alerta) => alerta.id === "alt-003");
  }

  return undefined;
}

export default function CongresoCivicoTimelinePage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A4E84]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/congreso-civico" className="mb-5 inline-block text-sm font-semibold text-[#E4007C]">
          {"<-"} Volver a Congreso Civico
        </Link>

        <section className="mb-8 max-w-3xl">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E4007C]">
            Timeline civico
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Como avanza cada tema
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-700">
            Sigue las etapas principales: registro, revision, alerta y seguimiento.
          </p>
        </section>

        <section className="grid gap-5">
          {timelineCongresoCivico.map((item) => {
            const iniciativa = obtenerIniciativaRelacionada(item.fase);
            const alerta = obtenerAlertaRelacionada(item.fase);
            const tipoEvento = obtenerTipoEvento(item.fase);

            return (
              <article key={item.id} className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-[#F7C9DD]">
                <div className="h-2 bg-gradient-to-r from-[#E4007C] via-[#8B5CF6] to-[#0EA5E9]" />
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F2C300] px-3 py-1 text-xs font-bold text-[#1F2937]">
                      {item.fase}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${tipoColor[tipoEvento]}`}>
                      {tipoEvento}
                    </span>
                  </div>

                  <p className="mt-4 text-base leading-7 text-slate-700">{item.descripcion}</p>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-[#E0F2FE] p-4">
                      <h3 className="mb-2 text-sm font-bold text-[#0A4E84]">Iniciativa relacionada</h3>
                      {iniciativa ? (
                        <div>
                          <Link
                            href={`/congreso-civico/iniciativas/${iniciativa.id}`}
                            className="font-bold text-[#E4007C]"
                          >
                            {iniciativa.titulo}
                          </Link>
                          <p className="mt-2 text-sm leading-6 text-slate-700">{iniciativa.tema}</p>
                        </div>
                      ) : (
                        <p className="text-sm leading-6 text-slate-600">Sin iniciativa relacionada.</p>
                      )}
                    </div>

                    <div className="rounded-2xl bg-[#FFF1A8] p-4">
                      <h3 className="mb-2 text-sm font-bold text-[#1F2937]">Alerta civica</h3>
                      {alerta ? (
                        <div>
                          <div className="font-bold text-[#0A4E84]">{alerta.tipo}</div>
                          <p className="mt-2 text-sm leading-6 text-slate-700">{alerta.descripcion}</p>
                        </div>
                      ) : (
                        <p className="text-sm leading-6 text-slate-700">Sin alerta civica en esta etapa.</p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
