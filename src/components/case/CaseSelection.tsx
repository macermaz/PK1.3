import React from 'react';
import PatientCard from './PatientCard';
import ModeSelector from './ModeSelector';
import { PATIENTS, GAME_MODES } from '../../data/patients';
import { useGameContext } from '../../context/GameContext';

const CaseSelection: React.FC = () => {
  const { actions } = useGameContext();
  const [selectedMode, setSelectedMode] = React.useState('TRAINING');
  
  const handleSelectPatient = (patient: typeof PATIENTS[0]) => {
    actions.startNewCase(patient, selectedMode as any);
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
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PATIENTS.map(patient => (
          <PatientCard 
            key={patient.id}
            patient={patient}
            onSelect={handleSelectPatient}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={() => actions.startNewCase(null, 'TRAINING')}
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          ← Volver al menú principal
        </button>
      </div>
    </div>
  );
};

export default CaseSelection;