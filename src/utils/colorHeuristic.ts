// Asigna color a la pregunta según posición y palabras clave

const CONTEXT_KW = ['trabajo', 'familia', 'estudios', 'relación'];
const SYMPTOM_KW = ['dormir', 'apetito', 'ansiedad', 'estado de ánimo'];
const EMOTION_RGX = /(cómo te sientes|emocion|sentim)/i;

export function classifyQuestion(text: string, idx: number): 'brown' | 'green' | 'blue' | 'purple' {
  if (idx === 0) return 'brown';           // apertura
  if (SYMPTOM_KW.some(k => text.toLowerCase().includes(k))) return 'blue';
  if (CONTEXT_KW.some(k => text.toLowerCase().includes(k))) return 'green';
  if (EMOTION_RGX.test(text)) return 'purple';
  return 'green';
}
