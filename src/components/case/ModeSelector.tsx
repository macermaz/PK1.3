import React from 'react';

interface ModeSelectorProps {
  modes: { id: string; name: string; description: string; color: string }[];
  selectedMode: string;
  onSelectMode: (mode: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ modes, selectedMode, onSelectMode }) => (
  <div className="flex justify-center gap-4 mb-6">
    {modes.map(mode => (
      <button
        key={mode.id}
        className={`px-4 py-2 rounded-lg font-semibold border transition-all duration-200 ${mode.color} ${selectedMode === mode.id ? 'ring-2 ring-purple-400' : ''}`}
        onClick={() => onSelectMode(mode.id)}
      >
        {mode.name}
      </button>
    ))}
  </div>
);

export default ModeSelector;
