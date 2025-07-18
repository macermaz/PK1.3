// src/hooks/useGameSession.tsx
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
    const initialMessage = getInitialGreeting(patient.personality, patient.disorder);
    setMessages([{ text: initialMessage, sender: 'patient' }]);
  }, [patient]);

  const sendMessage = useCallback(async (text: string) => {
    if (questionsLeft <= 0 || isThinking) return;
    
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setQuestionsLeft(prev => prev - 1);
    setIsThinking(true);
    
    try {
      // Crear contexto de conversación para el modelo
      const conversationHistory = messages
        .slice(-4) // Últimos 4 mensajes para contexto
        .map(m => `${m.sender === 'user' ? 'Psicólogo' : 'Paciente'}: ${m.text}`)
        .join('\n');
      
      const contextualPrompt = conversationHistory ? 
        `Historial de conversación:\n${conversationHistory}\n\nPsicólogo: ${text}` : 
        text;
      
      const result = await sendChatToLlama({ 
        prompt: contextualPrompt, 
        patientId: patient.id,
        temperature: getTemperatureByPersonality(patient.personality),
        maxTokens: 150
      });
      
      setMessages(prev => [...prev, { text: result.response, sender: 'patient' }]);
      
      // Actualizar puntuación basada en calidad de pregunta
      setSessionScore(prev => prev + calculateQuestionScore(text, patient.disorder));
      
    } catch (error) {
      console.error('Error generating response:', error);
      // Mensaje de error amigable
      setMessages(prev => [...prev, { 
        text: "Disculpa, no te escuché bien. ¿Podrías repetir la pregunta?", 
        sender: 'patient' 
      }]);
    } finally {
      setIsThinking(false);
    }
  }, [patient, questionsLeft, isThinking, messages]);

  const getInitialGreeting = (personality: string, disorder: string): string => {
    const greetings = {
      'COLABORADOR': {
        'TDAH': 'Hola doctor, gracias por recibirme. He estado teniendo problemas para concentrarme últimamente.',
        'Depresión': 'Hola... vengo porque mi familia me insistió. No me he sentido bien últimamente.',
        'Ansiedad': 'Hola doctor, estoy aquí porque he estado muy nervioso y ansioso.'
      },
      'RESERVADO': {
        'TDAH': 'Hola... bueno, no estoy seguro de qué decir exactamente.',
        'Depresión': 'Hola. Mi familia dice que debería hablar con alguien.',
        'Ansiedad': 'Hola... esto es un poco incómodo para mí.'
      },
      'OCULTISTA': {
        'TDAH': '¿Hola? Realmente no sé por qué estoy aquí. Todo está bien.',
        'Depresión': 'Hola. No creo que necesite estar aquí, pero bueno...',
        'Ansiedad': 'Hola. Solo vengo porque me dijeron que viniera, pero estoy bien.'
      },
      'COMPLEJO': {
        'TDAH': 'Hola... hoy me siento confundido. Ayer estaba bien pero ahora todo me abruma.',
        'Depresión': 'Hola doctor... algunos días son buenos, otros terribles. Hoy no sé qué pensar.',
        'Ansiedad': 'Hola... mis emociones cambian mucho. A veces ansioso, a veces tranquilo.'
      }
    };
    
    return greetings[personality]?.[disorder] || 'Hola doctor, gracias por atenderme.';
  };

  const getTemperatureByPersonality = (personality: string): number => {
    const temperatures = {
      'COLABORADOR': 0.7,
      'RESERVADO': 0.5,
      'OCULTISTA': 0.6,
      'COMPLEJO': 0.8
    };
    return temperatures[personality] || 0.7;
  };

  const calculateQuestionScore = (question: string, disorder: string): number => {
    let score = 5; // Base score
    
    // Bonus por preguntas abiertas
    if (question.startsWith('¿Cómo') || question.startsWith('¿Qué')) score += 5;
    if (question.startsWith('¿Por qué') || question.startsWith('¿Cuándo')) score += 8;
    
    // Bonus por preguntas específicas del trastorno
    const disorderKeywords = {
      'TDAH': ['concentr', 'atención', 'olvid', 'inquiet', 'impulsiv'],
      'Depresión': ['ánimo', 'trist', 'energía', 'dormir', 'interés'],
      'Ansiedad': ['ansios', 'nervios', 'preocup', 'miedo', 'pánico']
    };
    
    const keywords = disorderKeywords[disorder] || [];
    const hasRelevantKeyword = keywords.some(keyword => 
      question.toLowerCase().includes(keyword)
    );
    
    if (hasRelevantKeyword) score += 10;
    
    return Math.min(score, 25); // Máximo 25 puntos por pregunta
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