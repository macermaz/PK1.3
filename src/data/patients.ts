// src/data/patients.ts
export type PersonalityType = 
  | 'COLABORADOR'
  | 'RESERVADO'
  | 'OCULTISTA'
  | 'COMPLEJO';

export type DifficultyType = 'EASY' | 'MEDIUM' | 'HARD';
export type GameModeType = 'TRAINING' | 'HARD' | 'REALISTIC';

export interface Patient {
  id: string;
  name: string;
  age: number;
  disorder: string;
  personality: PersonalityType;
  avatar: string;
  difficulty: DifficultyType;
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
    disorder: 'Ansiedad',
    personality: 'OCULTISTA',
    avatar: '/assets/avatars/male2.png',
    difficulty: 'MEDIUM'
  },
  {
    id: 'pat-4',
    name: 'María González',
    age: 31,
    disorder: 'TDAH',
    personality: 'COMPLEJO',
    avatar: '/assets/avatars/female2.png',
    difficulty: 'HARD'
  },
  // Pacientes adicionales para TRAINING mode
  {
    id: 'pat-5',
    name: 'Luis Fernández',
    age: 24,
    disorder: 'Depresión',
    personality: 'COLABORADOR',
    avatar: '/assets/avatars/male3.png',
    difficulty: 'EASY'
  },
  {
    id: 'pat-6',
    name: 'Carmen Silva',
    age: 29,
    disorder: 'Ansiedad',
    personality: 'RESERVADO',
    avatar: '/assets/avatars/female3.png',
    difficulty: 'EASY'
  }
];

export interface GameMode {
  id: GameModeType;
  name: string;
  description: string;
  color: string;
}

export const GAME_MODES: GameMode[] = [
  { 
    id: 'TRAINING', 
    name: 'Modo Entrenamiento', 
    description: 'Practica con casos básicos (TDAH, Depresión, Ansiedad)', 
    color: 'bg-green-100 text-green-800 border-green-300' 
  },
  { 
    id: 'HARD', 
    name: 'Modo Difícil', 
    description: 'Casos complejos con pacientes diversos', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300' 
  },
  { 
    id: 'REALISTIC', 
    name: 'Modo Realista', 
    description: 'Comorbilidad y casos ultra-realistas', 
    color: 'bg-red-100 text-red-800 border-red-300' 
  }
];

// Función helper para obtener pacientes por modo de juego
export function getPatientsByGameMode(mode: GameModeType): Patient[] {
  switch (mode) {
    case 'TRAINING':
      return PATIENTS.filter(p => 
        ['TDAH', 'Depresión', 'Ansiedad'].includes(p.disorder) && 
        p.difficulty === 'EASY'
      );
    case 'HARD':
      return PATIENTS.filter(p => p.difficulty !== 'EASY');
    case 'REALISTIC':
      return PATIENTS; // Todos los pacientes disponibles
    default:
      return PATIENTS;
  }
}

// Función helper para obtener paciente aleatorio por modo
export function getRandomPatient(mode: GameModeType): Patient {
  const availablePatients = getPatientsByGameMode(mode);
  const randomIndex = Math.floor(Math.random() * availablePatients.length);
  return availablePatients[randomIndex];
}