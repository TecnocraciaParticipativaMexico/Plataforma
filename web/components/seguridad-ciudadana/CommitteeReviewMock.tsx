import { committeeReviews } from "@/lib/seguridad-ciudadana/mockData";

const statusLabels = {
  orientacion: "Orientación",
  revision_civica: "Revisión cívica",
  priorizacion: "Priorización",
  seguimiento: "Seguimiento",
};

const levelColors = ["#E5007D", "#0054A6", "#39B54A", "#702F8A"];

export function CommitteeReviewMock() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="mb-3 inline-flex rounded-full bg-[#0054A6]/10 px-3 py-1 text-xs font-bold uppercase text-[#0054A6]">
        Comités ciudadanos
      </div>
      <h2 className="text-xl font-bold text-slate-950">Revisión ciudadana mock por niveles</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Flujo demostrativo sin backend real. Su función futura sería revisar consistencia, detectar patrones, sugerir rutas institucionales y proteger privacidad.
      </p>
      <p className="mt-2 rounded-2xl border-l-4 border-[#F7931E] bg-[#F7931E]/10 p-4 text-sm leading-6 text-slate-700">
        Estos comités no acusan, no emiten dictamen oficial, no sustituyen autoridad y no reciben información fuera de este navegador.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {committeeReviews.map((review, index) => (
          <article key={review.level} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: levelColors[index % levelColors.length] }} />
            <div className="pl-2">
              <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-[#E5007D] ring-1 ring-slate-200">
                {statusLabels[review.status]}
              </span>
              <h3 className="mt-3 font-bold text-slate-950">{review.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{review.description}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#0054A6]">{review.nextStep}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
