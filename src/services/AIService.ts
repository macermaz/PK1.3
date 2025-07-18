// src/services/AIService.ts
interface SendChatParams {
  prompt: string;
  patientId: string;
  temperature?: number;
  maxTokens?: number;
}

export async function sendChatToLlama({ prompt, patientId, temperature = 0.7, maxTokens = 150 }: SendChatParams) {
  try {
    // Obtener datos del paciente para el contexto
    const patientData = getPatientContext(patientId);
    
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt, 
        patientId,
        personality: patientData?.personality || 'COLABORADOR',
        disorder: patientData?.disorder || 'TDAH',
        temperature, 
        maxTokens 
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error conectando con modelo local:', error);
    
    // Fallback a respuestas simuladas si el modelo no está disponible
    return {
      response: generateFallbackResponse(prompt),
      patientId
    };
  }
}

function getPatientContext(patientId: string): { personality: string; disorder: string } | null {
  // Esta función debería obtener datos del paciente actual
  // Por ahora retornamos valores por defecto
  return {
    personality: 'COLABORADOR',
    disorder: 'TDAH'
  };
}

function generateFallbackResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('concentr') || lowerPrompt.includes('atención')) {
    return "Sí, es verdad... me cuesta mucho concentrarme. Mi mente salta de una cosa a otra constantemente.";
  }
  
  if (lowerPrompt.includes('sientes') || lowerPrompt.includes('emocion')) {
    return "Me siento... como si estuviera en una montaña rusa emocional. A veces bien, a veces muy agobiado.";
  }
  
  if (lowerPrompt.includes('dormir') || lowerPrompt.includes('sueño')) {
    return "El sueño es un problema grande para mí. Me cuesta dormirme porque mi mente no para.";
  }
  
  if (lowerPrompt.includes('trabajo') || lowerPrompt.includes('estudios')) {
    return "En el trabajo he tenido varios problemas últimamente. Se me olvidan las cosas importantes.";
  }
  
  return "Hmm... no estoy seguro de cómo explicarlo. ¿Podrías preguntarme de otra manera?";
}

// Función para verificar si el backend está disponible
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:3001/api/health');
    const data = await response.json();
    return data.status === 'ok' && data.modelLoaded;
  } catch {
    return false;
  }
}