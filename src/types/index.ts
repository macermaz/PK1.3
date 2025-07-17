export interface User {
  id: string;
  email: string;
  name: string;
  level: number;
  xp: number;
  streak: number;
  isStudent: boolean;
  isPremium: boolean;
}

export interface PsykatMood {
  id: string;
  name: 'idle' | 'happy' | 'curious' | 'sleeping' | 'excited' | 'thinking' | 'celebrating' | 'concerned';
  duration?: number;
}

export interface GameCase {
  id: string;
  title: string;
  disorder: string;
  difficulty: 'training' | 'hard' | 'realistic';
  patient: Patient;
  isActive: boolean;
  progress: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  personality: 'collaborative' | 'reserved' | 'secretive' | 'complex';
  currentMood: string;
  backstory: string;
}