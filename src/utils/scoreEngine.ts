// src/utils/scoring.ts
import { QuestionQuality, Case, SessionResult, SessionInsight } from '../types';
import { IMessage } from 'react-native-gifted-chat';

interface ScoreWeights {
  questionQuality: number;
  diagnosticAccuracy: number;
  rapportBuilding: number;
  efficiency: number;
  notesTaking: number;
}

const SCORE_WEIGHTS: ScoreWeights = {
  questionQuality: 0.35,
  diagnosticAccuracy: 0.30,
  rapportBuilding: 0.20,
  efficiency: 0.10,
  notesTaking: 0.05,
};

export function calculateDetailedScore(
  questionQualities: QuestionQuality[],
  messages: IMessage[],
  caseData: Case,
  notes: string[]
): SessionResult {
  // 1. Calcular puntuación de calidad de preguntas
  const questionScore = calculateQuestionScore(questionQualities);
  
  // 2. Calcular precisión diagnóstica
  const diagnosticAccuracy = calculateDiagnosticAccuracy(
    messages,
    caseData.patient.disorder || 'TDAH',
    questionQualities
  );
  
  // 3. Calcular rapport
  const rapportScore = calculateRapportScore(
    questionQualities,
    messages,
    caseData.patient.personality
  );
  
  // 4. Calcular eficiencia
  const efficiencyScore = calculateEfficiencyScore(
    questionQualities.length,
    diagnosticAccuracy
  );
  
  // 5. Calcular puntuación de notas
  const notesScore = calculateNotesScore(notes);
  
  // Puntuación final ponderada
  const finalScore = Math.round(
    questionScore * SCORE_WEIGHTS.questionQuality +
    diagnosticAccuracy * SCORE_WEIGHTS.diagnosticAccuracy +
    rapportScore * SCORE_WEIGHTS.rapportBuilding +
    efficiencyScore * SCORE_WEIGHTS.efficiency +
    notesScore * SCORE_WEIGHTS.notesTaking
  );
  
  // Determinar grado
  const grade = getGrade(finalScore);
  
  // Breakdown de preguntas por categoría
  const questionBreakdown = {
    brown: questionQualities.filter(q => q.category === 'brown').length,
    green: questionQualities.filter(q => q.category === 'green').length,
    blue: questionQualities.filter(q => q.category === 'blue').length,
    purple: questionQualities.filter(q => q.category === 'purple').length,
  };
  
  // Síntomas detectados
  const detectedSymptoms = extractDetectedSymptoms(messages);
  
  return {
    caseId: caseData.id,
    finalScore,
    grade,
    questionQualities,
    questionScore,
    diagnosticAccuracy,
    rapportScore,
    efficiencyScore,
    notesScore,
    questionBreakdown,
    detectedSymptoms,
    correctDiagnosis: caseData.patient.disorder || 'TDAH',
    suggestedDiagnosis: inferDiagnosis(detectedSymptoms, messages),
    disorder: caseData.disorder,
    patientPersonality: caseData.patient.personality,
    timestamp: new Date().toISOString(),
  };
}

function calculateQuestionScore(qualities: QuestionQuality[]): number {
  if (qualities.length === 0) return 0;
  
  const totalScore = qualities.reduce((sum, q) => sum + q.score, 0);
  const avgScore = totalScore / qualities.length;
  
  // Bonus por variedad de tipos de preguntas
  const categories = new Set(qualities.map(q => q.category));
  const varietyBonus = categories.size >= 3 ? 10 : categories.size >= 2 ? 5 : 0;
  
  // Bonus por preguntas de alta calidad consecutivas
  let consecutiveHighQuality = 0;
  let maxConsecutive = 0;
  
  qualities.forEach(q => {
    if (q.score >= 8) {
      consecutiveHighQuality++;
      maxConsecutive = Math.max(maxConsecutive, consecutiveHighQuality);
    } else {
      consecutiveHighQuality = 0;
    }
  });
  
  const streakBonus = maxConsecutive >= 3 ? 15 : maxConsecutive >= 2 ? 8 : 0;
  
  return Math.min(100, (avgScore * 10) + varietyBonus + streakBonus);
}

function calculateDiagnosticAccuracy(
  messages: IMessage[],
  correctDisorder: string,
  qualities: QuestionQuality[]
): number {
  // Síntomas clave por trastorno
  const disorderSymptoms = {
    'TDAH': [
      'concentración', 'atención', 'distraigo', 'olvido', 'inquieto',
      'impulsivo', 'desorganizado', 'hiperactividad'
    ],
    'Depresión': [
      'triste', 'vacío', 'sin energía', 'dormir', 'apetito',
      'culpa', 'muerte', 'interés', 'placer'
    ],
    'Ansiedad': [
      'nervioso', 'preocupo', 'miedo', 'pánico', 'corazón',
      'respirar', 'sudor', 'tensión'
    ],
  };
  
  const targetSymptoms = disorderSymptoms[correctDisorder] || [];
  const patientMessages = messages.filter(m => m.user._id === 2).map(m => m.text.toLowerCase());
  
  // Contar síntomas detectados
  let symptomsFound = 0;
  targetSymptoms.forEach(symptom => {
    if (patientMessages.some(msg => msg.includes(symptom))) {
      symptomsFound++;
    }
  });
  
  const detectionRate = (symptomsFound / targetSymptoms.length) * 100;
  
  // Bonus por preguntas de síntomas (azules) bien hechas
  const symptomQuestions = qualities.filter(q => q.category === 'blue');
  const avgSymptomQuality = symptomQuestions.length > 0 
    ? symptomQuestions.reduce((sum, q) => sum + q.score, 0) / symptomQuestions.length
    : 5;
  
  const qualityBonus = avgSymptomQuality >= 8 ? 15 : avgSymptomQuality >= 6 ? 8 : 0;
  
  return Math.min(100, detectionRate + qualityBonus);
}

function calculateRapportScore(
  qualities: QuestionQuality[],
  messages: IMessage[],
  personality: string
): number {
  let score = 60; // Base score
  
  // Análisis de preguntas empáticas (moradas)
  const empathyQuestions = qualities.filter(q => q.category === 'purple');
  if (empathyQuestions.length > 0) {
    score += empathyQuestions.length * 10;
    const avgEmpathyScore = empathyQuestions.reduce((sum, q) => sum + q.score, 0) / empathyQuestions.length;
    score += avgEmpathyScore;
  }
  
  // Ajuste según personalidad del paciente
  if (personality === 'secretive' || personality === 'reserved') {
    // Con pacientes difíciles, el rapport es más valioso
    const greenQuestions = qualities.filter(q => q.category === 'green');
    if (greenQuestions.length >= 2) {
      score += 15; // Bonus por construir confianza gradualmente
    }
  }
  
  // Análisis de la progresión de la conversación
  const patientMessages = messages.filter(m => m.user._id === 2);
  let messageLength = 0;
  patientMessages.forEach((msg, index) => {
    messageLength += msg.text.length;
    // Si las respuestas se vuelven más largas, indica mejor rapport
    if (index > 0 && msg.text.length > patientMessages[index - 1].text.length * 1.2) {
      score += 3;
    }
  });
  
  // Penalización por preguntas de baja calidad
  const poorQuestions = qualities.filter(q => q.score < 5);
  score -= poorQuestions.length * 5;
  
  return Math.max(0, Math.min(100, score));
}

function calculateEfficiencyScore(questionCount: number, diagnosticAccuracy: number): number {
  // Ideal es obtener buena precisión con pocas preguntas
  let score = 100;
  
  if (questionCount > 4) {
    score -= (questionCount - 4) * 10;
  }
  
  // Bonus si se logra alta precisión con pocas preguntas
  if (questionCount <= 3 && diagnosticAccuracy >= 80) {
    score += 20;
  }
  
  return Math.max(0, Math.min(100, score));
}

function calculateNotesScore(notes: string[]): number {
  if (notes.length === 0) return 0;
  
  let score = notes.length * 20; // 20 puntos por nota
  
  // Bonus por notas detalladas
  notes.forEach(note => {
    if (note.length > 50) score += 10;
  });
  
  return Math.min(100, score);
}

function getGrade(score: number): 'S' | 'A' | 'B' | 'C' {
  if (score >= 95) return 'S';
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  return 'C';
}

function extractDetectedSymptoms(messages: IMessage[]): string[] {
  const symptoms: string[] = [];
  const patientMessages = messages.filter(m => m.user._id === 2);
  
  // Lista de síntomas comunes a detectar
  const symptomPatterns = [
    { pattern: /no puedo concentrar/i, symptom: 'Dificultad de concentración' },
    { pattern: /me distraigo/i, symptom: 'Distracción fácil' },
    { pattern: /olvido/i, symptom: 'Olvidos frecuentes' },
    { pattern: /inquiet|no puedo estar quiet/i, symptom: 'Inquietud motora' },
    { pattern: /trist|deprimid/i, symptom: 'Estado de ánimo deprimido' },
    { pattern: /no duermo|insomnio/i, symptom: 'Problemas de sueño' },
    { pattern: /ansios|nervios/i, symptom: 'Ansiedad' },
    { pattern: /sin energía|cansad/i, symptom: 'Fatiga' },
    { pattern: /no como|apetito/i, symptom: 'Cambios en el apetito' },
    { pattern: /culpa|inútil/i, symptom: 'Sentimientos de culpa' },
  ];
  
  patientMessages.forEach(msg => {
    symptomPatterns.forEach(({ pattern, symptom }) => {
      if (pattern.test(msg.text) && !symptoms.includes(symptom)) {
        symptoms.push(symptom);
      }
    });
  });
  
  return symptoms;
}

function inferDiagnosis(symptoms: string[], messages: IMessage[]): string {
  // Sistema simple de inferencia basado en síntomas detectados
  const disorderScores = {
    'TDAH': 0,
    'Depresión': 0,
    'Ansiedad': 0,
  };
  
  // Mapeo de síntomas a trastornos
  symptoms.forEach(symptom => {
    if (symptom.includes('concentración') || symptom.includes('Distracción') || 
        symptom.includes('Inquietud') || symptom.includes('Olvidos')) {
      disorderScores['TDAH'] += 2;
    }
    if (symptom.includes('deprimido') || symptom.includes('energía') || 
        symptom.includes('culpa') || symptom.includes('apetito')) {
      disorderScores['Depresión'] += 2;
    }
    if (symptom.includes('Ansiedad') || symptom.includes('nervios') || 
        symptom.includes('preocup')) {
      disorderScores['Ansiedad'] += 2;
    }
  });
  
  // Encontrar el trastorno con mayor puntuación
  let maxScore = 0;
  let diagnosis = 'No concluyente';
  
  Object.entries(disorderScores).forEach(([disorder, score]) => {
    if (score > maxScore) {
      maxScore = score;
      diagnosis = disorder;
    }
  });
  
  return diagnosis;
}

export function generateSessionInsights(
  result: SessionResult,
  caseData: Case
): SessionInsight[] {
  const insights: SessionInsight[] = [];
  
  // Insight sobre calidad de preguntas
  if (result.questionScore >= 80) {
    insights.push({
      type: 'positive',
      title: 'Excelente técnica de entrevista',
      description: 'Tus preguntas fueron bien formuladas y apropiadas para el contexto.',
      icon: 'star',
    });
  } else if (result.questionScore < 60) {
    insights.push({
      type: 'improvement',
      title: 'Mejorar formulación de preguntas',
      description: 'Intenta usar más preguntas abiertas que inviten al paciente a compartir.',
      icon: 'lightbulb',
    });
  }
  
  // Insight sobre rapport
  if (result.rapportScore >= 80) {
    insights.push({
      type: 'positive',
      title: 'Excelente construcción de rapport',
      description: 'Lograste establecer una buena conexión con el paciente.',
      icon: 'heart',
    });
  } else if (caseData.patient.personality === 'secretive' && result.rapportScore >= 60) {
    insights.push({
      type: 'positive',
      title: 'Buen manejo de paciente difícil',
      description: 'Considerando la personalidad reservada del paciente, lograste un buen rapport.',
      icon: 'shield',
    });
  }
  
  // Insight sobre eficiencia
  if (result.efficiencyScore >= 90) {
    insights.push({
      type: 'positive',
      title: 'Diagnóstico eficiente',
      description: 'Obtuviste información clave con el mínimo de preguntas necesarias.',
      icon: 'zap',
    });
  }
  
  // Insight sobre precisión diagnóstica
  if (result.diagnosticAccuracy >= 90) {
    insights.push({
      type: 'positive',
      title: 'Diagnóstico preciso',
      description: 'Identificaste correctamente los síntomas principales del trastorno.',
      icon: 'target',
    });
  } else if (result.diagnosticAccuracy < 60) {
    insights.push({
      type: 'improvement',
      title: 'Explorar más síntomas',
      description: 'Intenta indagar más sobre síntomas específicos del trastorno sospechado.',
      icon: 'search',
    });
  }
  
  // Insight sobre balance de preguntas
  const questionTypes = Object.values(result.questionBreakdown);
  const maxQuestions = Math.max(...questionTypes);
  const minQuestions = Math.min(...questionTypes.filter(q => q > 0));
  
  if (maxQuestions - minQuestions <= 1) {
    insights.push({
      type: 'positive',
      title: 'Buen balance en tipos de preguntas',
      description: 'Utilizaste una variedad equilibrada de preguntas contextuales, exploratorias y empáticas.',
      icon: 'balance',
    });
  }
  
  // Insights específicos por personalidad
  if (caseData.patient.personality === 'complex' && result.finalScore >= 80) {
    insights.push({
      type: 'achievement',
      title: 'Maestría con casos complejos',
      description: 'Manejaste exitosamente las contradicciones y complejidades del paciente.',
      icon: 'trophy',
    });
  }
  
  return insights;
}