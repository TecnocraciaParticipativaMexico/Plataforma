export function CitizenOpinionDocument() {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E4007C]">Dictamen ciudadano demostrativo</p>
          <h3 className="mt-2 text-2xl font-black text-[#0A4E84]">Opinión técnica ciudadana no vinculante</h3>
        </div>
        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
          Folio DC-06-2026-014 · v0.3 · 2026-07-20
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Info title="Integrantes participantes" value="3 integrantes mock con especialidad agraria, derechos humanos y evidencia documental." />
        <Info title="Especialidad" value="Revisión ciudadana de expediente, cronología y documentos aportados voluntariamente." />
        <Info title="Hechos revisados" value="Conflicto comunitario con actas, testimonios y solicitud de orientación para próximos pasos." />
        <Info title="Documentos considerados" value="Acta comunitaria, mapa demostrativo, lista de evidencias y relato de hechos." />
        <Info title="Puntos de coincidencia" value="Hay necesidad de ordenar fechas, identificar autoridad relacionada y preservar documentos originales." />
        <Info title="Puntos de desacuerdo" value="El alcance de cada documento requiere revisión profesional y posible apoyo de intérprete." />
        <Info title="Opinión mayoritaria" value="El expediente ciudadano está listo para revisión jurídica externa y para preparar preguntas concretas." />
        <Info title="Opiniones particulares" value="Una opinión sugiere ampliar la cronología antes de compartir cualquier documento sensible." />
        <Info title="Preguntas pendientes" value="¿Existe plazo legal cercano? ¿Qué autoridad emitió el acto? ¿Hay documentos originales bajo resguardo?" />
        <Info title="Próximos pasos" value="Buscar asesoría profesional, revisar privacidad de anexos y preparar versión corregida del borrador ciudadano." />
      </div>

      <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
        Este dictamen es una opinión técnica ciudadana, informativa y no vinculante. No constituye sentencia, resolución judicial, peritaje oficial ni asesoría jurídica personalizada.
      </p>
    </article>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <section className="rounded-2xl bg-slate-50 p-4">
      <h4 className="text-sm font-black text-[#0A4E84]">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-slate-600">{value}</p>
    </section>
  );
}
