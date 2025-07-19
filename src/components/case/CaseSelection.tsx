// src/components/case/CaseSelection.tsx
import React from 'react';
import PatientCard from './PatientCard';
import ModeSelector from './ModeSelector';
import { GAME_MODES, getPatientsByGameMode, getRandomPatient, type GameModeType } from '../../data/patients';
import { useGameContext } from '../../context/useGameContext';

const CaseSelection: React.FC = () => {
  const { state, actions } = useGameContext();
  const [selectedMode, setSelectedMode] = React.useState<GameModeType>(state.gameMode);
  
  const availablePatients = getPatientsByGameMode(selectedMode);
  
  const handleSelectPatient = (patient: any) => {
    actions.startNewCase(patient, selectedMode);
  };

  const handleRandomCase = () => {
    const randomPatient = getRandomPatient(selectedMode);
    actions.startNewCase(randomPatient, selectedMode);
  };

  const handleBackToMenu = () => {
    actions.hideCaseSelectionScreen();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-2">Selecciona un Caso</h1>
      <p className="text-center text-gray-600 mb-8">Elige un paciente y comienza tu consulta</p>
      
      <ModeSelector 
        modes={GAME_MODES} 
        selectedMode={selectedMode} 
        onSelectMode={setSelectedMode} 
      />
      
      <div className="text-center mb-6">
        <button 
          onClick={handleRandomCase}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mr-4"
        >
          🎲 Caso Aleatorio ({selectedMode})
        </button>
        <span className="text-sm text-gray-500">
          {selectedMode === 'TRAINING' ? 'Solo TDAH, Depresión, Ansiedad' : 
           selectedMode === 'HARD' ? 'Pacientes reservados y complejos' : 'Todos los trastornos'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availablePatients.map(patient => (
          <PatientCard 
            key={patient.id}
            patient={patient}
            onSelect={handleSelectPatient}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={handleBackToMenu}
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          ← Volver al menú principal
        </button>
      </div>
    </div>
  );
};

export default CaseSelection;