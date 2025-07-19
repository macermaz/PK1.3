// src/context/GameProvider.tsx
import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { ReactNode } from 'react';
import type { Patient } from '@/data/patients';
import { getRandomPatient } from '@/data/patients';
import { GameContext } from './GameContext';
import type { GameState, GameActions, GameMode } from './GameContext';

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCases, setActiveCases] = useLocalStorage<Patient[]>('psykat-active-cases', []);
  const [state, setState] = useState<GameState>({
    currentPatient: null,
    gameMode: 'TRAINING',
    activeCases,
    showModeSelection: false
  });

  const actions: GameActions = {
    startNewCase: () => {
      setState(prev => ({
        ...prev,
        showModeSelection: true,
        currentPatient: null
      }));
    },

    selectModeAndStartCase: (mode: GameMode) => {
      const randomPatient = getRandomPatient(mode);
      
      // Añadir a casos activos
      let updatedCases = state.activeCases.filter((c: Patient) => c.id !== randomPatient.id);
      if (updatedCases.length >= 3) {
        updatedCases = updatedCases.slice(1);
      }
      updatedCases = [...updatedCases, randomPatient];
      setActiveCases(updatedCases);

      setState({
        currentPatient: randomPatient,
        gameMode: mode,
        activeCases: updatedCases,
        showModeSelection: false
      });
    },
    
    endCurrentCase: () => {
      setState(prev => ({
        ...prev,
        currentPatient: null,
        showModeSelection: false
      }));
    },
    
    openActiveCase: (patientId: string) => {
      const patient = state.activeCases.find((c: Patient) => c.id === patientId);
      if (patient) {
        setState(prev => ({
          ...prev,
          currentPatient: patient,
          showModeSelection: false
        }));
      }
    },
    
    removeActiveCase: (patientId: string) => {
      const updatedCases = state.activeCases.filter((c: Patient) => c.id !== patientId);
      setActiveCases(updatedCases);
      setState(prev => ({
        ...prev,
        activeCases: updatedCases
      }));
    },

    backToMenu: () => {
      setState(prev => ({
        ...prev,
        showModeSelection: false,
        currentPatient: null
      }));
    }
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
};