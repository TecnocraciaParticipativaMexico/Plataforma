import { estados, promedio, scoreClass } from "./data";
import { ProfileDetail } from "./ProfileDetail";
import type { PerfilJudicial } from "./types";

type ProfilesDirectoryProps = {
  filteredProfiles: PerfilJudicial[];
  query: string;
  selectedProfile: PerfilJudicial;
  onQueryChange: (query: string) => void;
  onSelectProfile: (profileId: string) => void;
};

export function ProfilesDirectory({ filteredProfiles, query, selectedProfile, onQueryChange, onSelectProfile }: ProfilesDirectoryProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <label htmlFor="buscar-perfil" className="block rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#E4007C]">Buscador de perfiles</span>
          <input
            id="buscar-perfil"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Buscar por nombre, materia, entidad o cargo"
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#E4007C] focus:bg-white"
          />
        </label>

        {filteredProfiles.length ? (
          <div className="space-y-3">
            {filteredProfiles.map((perfil) => {
              const active = selectedProfile.id === perfil.id;
              return (
                <button
                  key={perfil.id}
                  type="button"
                  onClick={() => onSelectProfile(perfil.id)}
                  className={`w-full rounded-[24px] p-4 text-left shadow-sm ring-1 transition focus:outline-none focus:ring-2 focus:ring-[#E4007C] ${
                    active ? "bg-[#0A4E84] text-white ring-[#0A4E84]" : "bg-white text-slate-700 ring-slate-200 hover:bg-[#E0F2FE]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-black">{perfil.nombre}</div>
                      <div className={`mt-1 text-xs leading-5 ${active ? "text-white/75" : "text-slate-500"}`}>{perfil.tipo} - {perfil.entidad}</div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${active ? "bg-white/15 text-white" : scoreClass(promedio(perfil))}`}>
                      {promedio(perfil)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className={`rounded-2xl border p-4 ${estados.empty.tone}`}>
            <div className="font-black">{estados.empty.title}</div>
            <p className="mt-1 text-sm">{estados.empty.description}</p>
          </div>
        )}
      </div>

      <ProfileDetail selectedProfile={selectedProfile} />
    </section>
  );
}
