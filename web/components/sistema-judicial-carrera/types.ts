export type PerfilTipo = "Jueza" | "Fiscal" | "Magistrada" | "Magistrado";
export type RiesgoEtico = "Excelente" | "Observación" | "Revisión prioritaria";
export type TabId = "panorama" | "directorio" | "dictamen" | "evidencia";
export type InterfaceState = "loading" | "empty" | "error";

export type Resolucion = {
  titulo: string;
  materia: string;
  criterio: string;
  impacto: string;
};

export type PerfilJudicial = {
  id: string;
  nombre: string;
  tipo: PerfilTipo;
  cargo: string;
  entidad: string;
  materia: string;
  experiencia: number;
  formacion: string[];
  desempeno: number;
  etica: number;
  transparencia: number;
  riesgoEtico: RiesgoEtico;
  sintesis: string;
  resoluciones: Resolucion[];
  evidencias: string[];
  observaciones: string[];
};
