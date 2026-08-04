export const EXAM_QUESTIONS_PER_TYPE = 5;
export const EXAM_PASSING_SCORE = 7;
export const EXAM_DURATION_MINUTES = 30;
export const EXAM_APPROVAL_VALID_DAYS = 90;
export const EXAM_MAX_ATTEMPTS_PER_WINDOW = 3;
export const EXAM_ATTEMPT_WINDOW_HOURS = 24;
export const EXAM_RETRY_COOLDOWN_MINUTES = 30;
export const EXAM_BANK_VERSION = "pr19-88c347d7-v1";

// Política: cada inicio cuenta en la ventana móvil de 24 h, incluso si se
// abandona. El enfriamiento corre desde el envío reprobado más reciente.
