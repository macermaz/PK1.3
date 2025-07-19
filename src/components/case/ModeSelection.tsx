// src/components/case/ModeSelection.tsx
import React from 'react';
import { useGameContext } from '../../context/useGameContext';
import type { GameMode } from '../../context/GameContext';

const ModeSelection: React.FC = () => {
  const { actions } = useGameContext();

  const modes = [
    {
      id: 'TRAINING' as GameMode,
      title: 'Modo Entrenamiento',
      description: 'Pacientes colaborativos con síntomas básicos',
      disorders: 'TDAH, Depresión, Ansiedad',
      color: 'bg-green-100 hover:bg-green-200 border-green-300 text-green-800',
      icon: '🎓'
    },
    {
      id: 'HARD' as GameMode,
      title: 'Modo Difícil',
      description: 'Pacientes reservados que ocultan información',
      disorders: 'Personalidades complejas + Backend IA',
      color: 'bg-orange-100 hover:bg-orange-200 border-orange-300 text-orange-800',
      icon: '🧠'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Selecciona Dificultad</h1>
        <p className="text-gray-600">Elige el modo de juego y comenzará una consulta aleatoria</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        {modes.map(mode => (
          <button
            key={mode.id}
            onClick={() => actions.selectModeAndStartCase(mode.id)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${mode.color}`}
          >
            <div className="text-4xl mb-4">{mode.icon}</div>
            <h2 className="text-xl font-bold mb-2">{mode.title}</h2>
            <p className="text-sm mb-3">{mode.description}</p>
            <div className="text-xs font-medium bg-white bg-opacity-50 rounded px-2 py-1">
              {mode.disorders}
            </div>
          </button>
        ))}
      </div>

      <div className="text-center mt-8">
        <button 
          onClick={actions.backToMenu}
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          ← Volver al menú
        </button>
      </div>
    </div>
  );
};

export default ModeSelection;