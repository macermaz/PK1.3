import { useState, useEffect, useCallback } from 'react';
import type { Patient } from '@/data/patients';
import { sendChatToLlama } from '../services/AIService';

export const useGameSession = (patient: Patient) => {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'patient'}>>([]);
  const [questionsLeft, setQuestionsLeft] = useState(4);
  const [isThinking, setIsThinking] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);

  // Mensaje inicial del paciente
  useEffect(() => {
    const initialMessage = getInitialGreeting(patient.personality);
    setMessages([{ text: initialMessage, sender: 'patient' }]);
  }, [patient]);

  const sendMessage = useCallback(async (text: string) => {
    if (questionsLeft <= 0 || isThinking) return;
    
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setQuestionsLeft(prev => prev - 1);
    setIsThinking(true);
    
    try {
      // Llamada real al backend llama
      const history = messages.map(m => m.text);
      const prompt = `Personalidad: ${patient.personality}\nHistorial: ${history.join('\n')}\nUsuario: ${text}`;
      const result = await sendChatToLlama({ prompt, patientId: patient.id });
      setMessages(prev => [...prev, { text: result.response, sender: 'patient' }]);
      
      // Actualizar puntuación
      setSessionScore(prev => prev + calculatePoints(text));
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsThinking(false);
    }
  }, [patient, questionsLeft, isThinking, messages]);

  const getInitialGreeting = (personality: string): string => {
    const greetings: Record<string, string> = {
      COLABORADOR: `Hola doctor, gracias por atenderme. He estado sintiendo ${getRandomSymptom()} últimamente.`,
      RESERVADO: 'Hola... bueno, no estoy seguro por qué estoy aquí realmente.',
      OCULTISTA: '¿Hola? Bueno, supongo que tengo que estar aquí. Todo está bien realmente.',
      COMPLEJO: 'No sé por qué vine hoy... ayer estaba genial pero ahora todo me da ansiedad.'
    };
    return greetings[personality] || '';
  };

  const calculatePoints = (question: string): number => {
    // Sistema básico de puntuación
    if (question.startsWith('¿Cómo')) return 10;
    if (question.startsWith('¿Por qué')) return 8;
    if (question.startsWith('¿Qué')) return 7;
    return 5;
  };

  const resetSession = () => {
    setMessages([]);
    setQuestionsLeft(4);
    setSessionScore(0);
    setIsThinking(false);
  };

  return { 
    messages, 
    sendMessage, 
    questionsLeft, 
    sessionScore, 
    isThinking,
    resetSession
  };
};

// Funciones locales de ayuda
const getRandomSymptom = () => {
  const symptoms = [
    "mucha ansiedad",
    "dificultad para dormir",
    "falta de concentración",
    "cambios de humor bruscos",
    "palpitaciones fuertes"
  ];
  return symptoms[Math.floor(Math.random() * symptoms.length)];
};