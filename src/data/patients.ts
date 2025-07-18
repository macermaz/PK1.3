export type PersonalityType = 
  | 'COLABORADOR'
  | 'RESERVADO'
  | 'OCULTISTA'
  | 'COMPLEJO';

export interface Patient {
  id: string;
  name: string;
  age: number;
  disorder: string;
  personality: PersonalityType;
  avatar: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export const PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    name: 'Carlos Mendoza',
    age: 28,
    disorder: 'TDAH',
    personality: 'COLABORADOR',
    avatar: '/assets/avatars/male1.png',
    difficulty: 'EASY'
  },
  {
    id: 'pat-2',
    name: 'Ana López',
    age: 35,
    disorder: 'Depresión',
    personality: 'RESERVADO',
    avatar: '/assets/avatars/female1.png',
    difficulty: 'EASY'
  },
  {
    id: 'pat-3',
    name: 'Roberto Díaz',
    age: 42,
    disorder: 'Trastorno de Pánico',
    personality: 'OCULTISTA',
    avatar: '/assets/avatars/male2.png',
    difficulty: 'MEDIUM'
  },
  {
    id: 'pat-4',
    name: 'María González',
    age: 31,
    disorder: 'Ansiedad Generalizada',
    personality: 'COMPLEJO',
    avatar: '/assets/avatars/female2.png',
    difficulty: 'HARD'
  }
];

export const GAME_MODES = [
  { id: 'TRAINING', name: 'Modo Entrenamiento', description: 'Practica con casos básicos', color: 'bg-green-100' },
  { id: 'HARD', name: 'Modo Difícil', description: 'Casos complejos con pacientes diversos', color: 'bg-yellow-100' },
  { id: 'REALISTIC', name: 'Modo Realista', description: 'Comorbilidad y casos ultra-realistas', color: 'bg-red-100' }
];