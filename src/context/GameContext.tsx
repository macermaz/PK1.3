// src/context/GameContext.tsx
import React, { createContext, useState, type ReactNode } from 'react';

interface GameState {
  gameMode: 'TRAINING' | 'HARD' | 'REALISTIC';
  activeCases: 3[]; // Especifica un tipo mejor
  // ... otras propiedades
}

const initialState: GameState = {
  gameMode: 'TRAINING',
  activeCases: [],
};

export const GameContext = createContext<{
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}>({
  state: initialState,
  setState: () => null,
});

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState(initialState);
  
  return (
    <GameContext.Provider value={{ state, setState }}>
      {children}
    </GameContext.Provider>
  );
};

// Remove useGameContext from this file and move it to a new file named useGameContext.ts