import { committeeLevels } from "@/lib/fiscalia-ia/data/mock";

export function CommitteesPanel() {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#12141c] p-5 shadow-xl shadow-black/40">
      <div className="mb-5">
        <h2 className="text-lg font-black uppercase text-white">Comités territoriales y acompañamiento cívico</h2>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Los comités son una preparación visual para revisión comunitaria futura. No tienen autoridad oficial, no acusan y no sustituyen instituciones.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {committeeLevels.map((committee) => (
          <article key={committee.level} className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: committee.accent }} />
            <div className="pl-2">
              <h3 className="font-black text-white">{committee.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{committee.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {committee.canReview.map((item) => (
                  <span key={item} className="rounded-full border border-zinc-800 bg-[#12141c] px-3 py-1 text-[11px] font-bold text-slate-300">{item}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
