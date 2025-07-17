// Cliente para interactuar con el backend Llama
interface SendChatParams {
  prompt: string;
  patientId: string;
  temperature?: number;
  maxTokens?: number;
}

export async function sendChatToLlama({ prompt, patientId, temperature = 0.7, maxTokens = 150 }: SendChatParams) {
  const response = await fetch('http://localhost:3001/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, patientId, temperature, maxTokens })
  });
  if (!response.ok) throw new Error('Error en la respuesta del modelo');
  return await response.json();
}
