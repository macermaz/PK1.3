import React from 'react';
import MenuCard from './MenuCard';
import PsykatHeader from './PsykatHeader';
import { useGameContext } from '@/context/useGameContext';
import ActiveCasesMenu from './ActiveCasesMenu';

const MainMenu: React.FC = () => {
  const { actions } = useGameContext();
  const [showActiveCases, setShowActiveCases] = React.useState(false);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <PsykatHeader />
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <MenuCard 
          title="Nuevo Caso" 
          description="Comienza una nueva consulta con un paciente"
          color="bg-purple-100 hover:bg-purple-200 border-purple-300"
          onClick={() => actions.startNewCase(null, 'TRAINING')}
          highlight
        />
        
      <MenuCard 
        title="Casos Activos" 
        description="Continúa tus consultas en progreso"
        color="bg-blue-100 hover:bg-blue-200 border-blue-300"
        onClick={() => setShowActiveCases(true)}
        highlight
      />
        
      <MenuCard 
        title="Logros" 
        description="Revisa tus logros desbloqueados"
        color="bg-green-100 hover:bg-green-200 border-green-300"
        disabled
      />
      {showActiveCases && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowActiveCases(false)}>
              &times;
            </button>
            <ActiveCasesMenu />
          </div>
        </div>
      )}
        
        <MenuCard 
          title="Estadísticas" 
          description="Mira tu progreso y métricas"
          color="bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
          disabled
        />
      </div>
      
      <div className="mt-12 text-center text-gray-600">
        <p>PSYKAT - Simulador de Psicología Gamificado</p>
        <p className="text-sm mt-2">Versión Pre-Alpha | Solo Modo Entrenamiento Disponible</p>
      </div>
    </div>
  );
};

export default MainMenu;
