import type { TriageRule } from "../types";

export const triageRules: TriageRule[] = [
  {
    id: "dolor-pecho",
    terms: ["dolor de pecho", "pecho opresivo", "opresion en el pecho", "dolor toracico"],
    signal: {
      id: "signal-dolor-pecho",
      label: "Posible senal de alarma cardiopulmonar",
      severity: "posible_emergencia",
      explanation: "El dolor u opresion en pecho puede requerir valoracion presencial inmediata.",
    },
    action: {
      id: "action-atencion-inmediata",
      title: "Busca ayuda presencial inmediata",
      description: "Usa numeros oficiales de emergencia disponibles en tu localidad. La plataforma no contacto a ningun servicio externo.",
      priority: "urgente",
      origin: "reglas_locales",
    },
  },
  {
    id: "respiracion",
    terms: ["no puedo respirar", "dificultad para respirar", "falta de aire", "respira con dificultad"],
    signal: {
      id: "signal-respiracion",
      label: "Posible dificultad respiratoria",
      severity: "posible_emergencia",
      explanation: "La dificultad respiratoria intensa puede avanzar rapidamente y requiere atencion profesional urgente.",
    },
    action: {
      id: "action-respiracion",
      title: "Prioriza atencion urgente",
      description: "Permanece acompanado si es posible y busca ayuda presencial inmediata. No se activo ningun servicio desde este MVP.",
      priority: "urgente",
      origin: "reglas_locales",
    },
  },
  {
    id: "neurologico",
    terms: ["perdida de conciencia", "convulsion", "debilidad de un lado", "confusion repentina", "no puede hablar"],
    signal: {
      id: "signal-neurologico",
      label: "Posible senal neurologica de alarma",
      severity: "posible_emergencia",
      explanation: "Cambios repentinos de conciencia, habla, fuerza o convulsiones ameritan valoracion inmediata.",
    },
    action: {
      id: "action-neuro",
      title: "No esperes a que desaparezca",
      description: "Busca atencion profesional de urgencia con los canales oficiales de tu localidad.",
      priority: "urgente",
      origin: "reglas_locales",
    },
  },
  {
    id: "fiebre-persistente",
    terms: ["fiebre alta", "fiebre persistente", "temperatura muy alta", "fiebre de varios dias"],
    signal: {
      id: "signal-fiebre",
      label: "Fiebre que requiere seguimiento",
      severity: "consulta_prioritaria",
      explanation: "La fiebre alta o persistente puede requerir consulta profesional, especialmente con otros sintomas.",
    },
    action: {
      id: "action-fiebre",
      title: "Prepara consulta prioritaria",
      description: "Registra temperatura, duracion, sintomas asociados y antecedentes para compartirlos con personal de salud.",
      priority: "prioritaria",
      origin: "reglas_locales",
    },
  },
  {
    id: "deshidratacion",
    terms: ["vomito persistente", "diarrea intensa", "no retiene liquidos", "orina muy poco"],
    signal: {
      id: "signal-deshidratacion",
      label: "Posible riesgo de deshidratacion",
      severity: "consulta_prioritaria",
      explanation: "Perdida importante de liquidos o imposibilidad de retenerlos puede requerir valoracion pronta.",
    },
    action: {
      id: "action-deshidratacion",
      title: "Monitorea liquidos y consulta",
      description: "Observa evolucion y busca atencion profesional si persiste o empeora. No se indican medicamentos ni dosis.",
      priority: "prioritaria",
      origin: "reglas_locales",
    },
  },
  {
    id: "seguimiento",
    terms: ["cansancio", "dolor de cabeza", "tos", "dolor muscular", "malestar"],
    signal: {
      id: "signal-seguimiento",
      label: "Sintomas para seguimiento informado",
      severity: "seguimiento_recomendado",
      explanation: "Los sintomas declarados pueden organizarse y observarse para decidir si se requiere consulta.",
    },
    action: {
      id: "action-seguimiento",
      title: "Registra evolucion",
      description: "Anota inicio, cambios, intensidad, temperatura si aplica y factores que empeoran o mejoran.",
      priority: "pronta",
      origin: "reglas_locales",
    },
  },
];
