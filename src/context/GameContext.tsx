// src/context/GameContext.tsx
import React, { createContext, useState, type ReactNode } from 'react';
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

export interface GameContextType {
  state: GameState;
  actions: GameActions;
}

export const GameContext = createContext<GameContextType | null>(null);