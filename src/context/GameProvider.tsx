import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { ReactNode } from 'react';
import type { Patient } from '@/data/patients';
import { GameContext } from '@/context/GameContext';
import type { GameState, GameActions } from '../../GameContext copy';

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCases, setActiveCases] = useLocalStorage<Patient[]>('psykat-active-cases', []);
  const [state, setState] = useState<GameState>({
    currentPatient: null,
    gameMode: 'TRAINING',
    activeCases
  });

  const actions: GameActions = {
    startNewCase: (patient, mode) => {
      if (patient) {
        let updatedCases = state.activeCases.filter((c: Patient) => c.id !== patient.id);
        if (updatedCases.length >= 3) {
          updatedCases = updatedCases.slice(1);
        }
        updatedCases = [...updatedCases, patient];
        setActiveCases(updatedCases);
        setState({
          currentPatient: patient,
          gameMode: mode,
          activeCases: updatedCases
        });
      } else {
        setState({
          ...state,
          currentPatient: null
        });
      }
    },
    endCurrentCase: () => {
      setState({
        ...state,
        currentPatient: null
      });
    },
    openActiveCase: (patientId: string) => {
      const patient = state.activeCases.find((c: Patient) => c.id === patientId);
      if (patient) {
        setState({
          ...state,
          currentPatient: patient
        });
      }
    },
    removeActiveCase: (patientId: string) => {
      const updatedCases = state.activeCases.filter((c: Patient) => c.id !== patientId);
      setActiveCases(updatedCases);
      setState({
        ...state,
        activeCases: updatedCases
      });
    }
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
};
