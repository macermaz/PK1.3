export interface Disorder {
  id: string;
  name: string;
  category: string;
  difficulty: 'training' | 'hard' | 'realistic';
  symptoms: string[];
  keyQuestions: string[];
  diagnosticCriteria: string[];
}

export const disorders: Disorder[] = [
  {
    id: 'adhd',
    name: 'TDAH (Trastorno por Déficit de Atención e Hiperactividad)',
    category: 'Neurodesarrollo',
    difficulty: 'training',
    symptoms: [
      'Dificultad para mantener la atención',
      'Hiperactividad motora',
      'Impulsividad',
      'Desorganización',
      'Dificultades en el trabajo/estudios'
    ],
    keyQuestions: [
      '¿Cuándo comenzaron estos síntomas?',
      '¿Cómo afectan a tu vida diaria?',
      '¿Tienes problemas para concentrarte?',
      '¿Te resulta difícil estar quieto?'
    ],
    diagnosticCriteria: [
      'Síntomas presentes antes de los 12 años',
      'Presentes en múltiples contextos',
      'Deterioro significativo del funcionamiento'
    ]
  },
  {
    id: 'depression',
    name: 'Trastorno Depresivo Mayor',
    category: 'Estado de Ánimo',
    difficulty: 'training',
    symptoms: [
      'Estado de ánimo deprimido',
      'Pérdida de interés o placer',
      'Cambios en el apetito',
      'Trastornos del sueño',
      'Fatiga y pérdida de energía'
    ],
    keyQuestions: [
      '¿Cómo describirías tu estado de ánimo?',
      '¿Has perdido interés en actividades que antes disfrutabas?',
      '¿Cómo están tus patrones de sueño?',
      '¿Tienes pensamientos de autolesión?'
    ],
    diagnosticCriteria: [
      'Episodio de al menos 2 semanas',
      'Cambio del funcionamiento previo',
      'Deterioro significativo'
    ]
  },
  {
    id: 'panic',
    name: 'Trastorno de Pánico',
    category: 'Ansiedad',
    difficulty: 'training',
    symptoms: [
      'Ataques de pánico recurrentes',
      'Preocupación por futuros ataques',
      'Cambios de comportamiento',
      'Síntomas físicos intensos',
      'Miedo a perder el control'
    ],
    keyQuestions: [
      '¿Puedes describir qué sientes durante un ataque?',
      '¿Con qué frecuencia ocurren?',
      '¿Hay situaciones que los desencadenan?',
      '¿Evitas ciertos lugares por miedo?'
    ],
    diagnosticCriteria: [
      'Ataques de pánico inesperados recurrentes',
      'Preocupación persistente',
      'Cambio de comportamiento significativo'
    ]
  }
];