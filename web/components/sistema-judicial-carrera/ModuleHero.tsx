type ModuleHeroProps = {
  perfilesCount: number;
  avgScore: number;
  evidenceCount: number;
};

export function ModuleHero({ perfilesCount, avgScore, evidenceCount }: ModuleHeroProps) {
  return (
    <section className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="h-3 bg-gradient-to-r from-[#E4007C] via-[#F97316] via-[#F2C300] via-[#16A34A] via-[#0EA5E9] to-[#702F8A]" />
      <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_0.8fr] lg:p-7">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Fundamento legal nacional</div>
          <h2 className="mt-2 text-2xl font-black leading-tight text-[#0A4E84] md:text-4xl">
            Carrera judicial observable, comparable y verificable
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 md:text-base">
            Fundamentado en los artículos 1, 6, 17, 20, 21, 94, 97, 100, 102 y 116 de la Constitución; la Ley General de Transparencia y Acceso a la Información Pública; la Ley General de Responsabilidades Administrativas; la Ley de Carrera Judicial del Poder Judicial de la Federación y la legislación aplicable en protección de datos personales.
          </p>
        </div>
        <aside className="rounded-[24px] bg-[#0A4E84] p-5 text-white shadow-sm">
          <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase text-[#F2C300]">
            Control cívico
          </div>
          <p className="mt-4 text-sm leading-6 text-white/90">
            El módulo compara trayectoria, resoluciones, tiempos, formación, evidencia y observaciones ciudadanas sin invadir la función jurisdiccional.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-white/10 p-3">
              <div className="text-2xl font-black">{perfilesCount}</div>
              <div className="text-[11px] font-bold uppercase text-white/70">Perfiles</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <div className="text-2xl font-black">{avgScore}</div>
              <div className="text-[11px] font-bold uppercase text-white/70">Índice</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <div className="text-2xl font-black">{evidenceCount}</div>
              <div className="text-[11px] font-bold uppercase text-white/70">Fuentes</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
