import { committeeReviews } from "@/lib/seguridad-ciudadana/mockData";

const statusLabels = {
  orientacion: "Orientación",
  revision_civica: "Revisión cívica",
  priorizacion: "Priorización",
  seguimiento: "Seguimiento",
};

export function CommitteeReviewMock() {
  return (
    <section className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#F7C9DD]">
      <div className="mb-3 inline-flex rounded-full bg-[#EADCFF] px-3 py-1 text-xs font-bold uppercase text-[#4B238D]">
        Comités mock
      </div>
      <h2 className="text-xl font-bold text-[#0A4E84]">Orientación cívica por especialidad</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Flujo demostrativo sin backend real. Estos comités no emiten dictamen oficial, no sustituyen autoridad y no reciben información fuera de este navegador.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {committeeReviews.map((review) => (
          <article key={review.level} className="rounded-2xl bg-[#F8FAFC] p-4 ring-1 ring-slate-100">
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-[#E4007C] ring-1 ring-[#F7C9DD]">
              {statusLabels[review.status]}
            </span>
            <h3 className="mt-3 font-bold text-[#0A4E84]">{review.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{review.description}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#005C7E]">{review.nextStep}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
