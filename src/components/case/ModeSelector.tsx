// src/components/case/ModeSelector.tsx
import React from 'react';
import type { GameMode, GameModeType } from '../../data/patients';

interface ModeSelectorProps {
  modes: GameMode[];
  selectedMode: GameModeType;
  onSelectMode: (mode: GameModeType) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ modes, selectedMode, onSelectMode }) => (
  <div className="flex justify-center gap-4 mb-6 flex-wrap">
    {modes.map(mode => (
      <button
        key={mode.id}
        className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all duration-200 ${mode.color} ${
          selectedMode === mode.id ? 'ring-2 ring-purple-400 transform scale-105' : 'hover:scale-102'
        }`}
        onClick={() => onSelectMode(mode.id)}
      >
        <div className="text-sm font-bold">{mode.name}</div>
        <div className="text-xs mt-1 opacity-80">{mode.description}</div>
      </button>
    ))}
  </div>
);

export default ModeSelector;