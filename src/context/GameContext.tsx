// src/context/GameContext.tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext } from 'react';
import type { Patient } from '@/data/patients';

export type GameMode = 'TRAINING' | 'HARD' | 'REALISTIC';

export interface GameState {
  currentPatient: Patient | null;
  gameMode: GameMode;
  activeCases: Patient[];
  showModeSelection: boolean;
}

export interface GameActions {
  startNewCase: () => void;
  selectModeAndStartCase: (mode: GameMode) => void;
  endCurrentCase: () => void;
  openActiveCase: (patientId: string) => void;
  removeActiveCase: (patientId: string) => void;
  backToMenu: () => void;
}

export interface GameContextType {
  state: GameState;
  actions: GameActions;
}

export const GameContext = createContext<GameContextType | null>(null);