import { createContext } from 'react';
import type { Patient } from '@/data/patients';

export type GameMode = 'TRAINING' | 'HARD' | 'REALISTIC';

export interface GameState {
  currentPatient: Patient | null;
  gameMode: GameMode;
  activeCases: Patient[];
}

export interface GameActions {
  startNewCase: (patient: Patient | null, mode: GameMode) => void;
  endCurrentCase: () => void;
  openActiveCase: (patientId: string) => void;
  removeActiveCase: (patientId: string) => void;
}

export const GameContext = createContext<{ state: GameState; actions: GameActions } | undefined>(undefined);
