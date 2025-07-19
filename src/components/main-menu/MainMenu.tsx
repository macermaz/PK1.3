// src/components/main-menu/MainMenu.tsx
import React from 'react';
import MenuCard from './MenuCard';
import PsykatHeader from './PsykatHeader';
import { useGameContext } from '@/context/useGameContext';
import ActiveCasesMenu from './ActiveCasesMenu';

const MainMenu: React.FC = () => {
  const { state, actions } = useGameContext();
  const [showActiveCases, setShowActiveCases] = React.useState(false);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <PsykatHeader />
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <MenuCard 
          title="Nuevo Caso" 
          description="Selecciona dificultad y comienza consulta aleatoria"
          color="bg-purple-100 hover:bg-purple-200 border-purple-300"
          onClick={actions.startNewCase}
          highlight
        />
        
        <MenuCard 
          title="Casos Activos" 
          description={`${state.activeCases.length} consultas en progreso`}
          color="bg-blue-100 hover:bg-blue-200 border-blue-300"
          onClick={() => setShowActiveCases(true)}
          disabled={state.activeCases.length === 0}
        />
        
        <MenuCard 
          title="Logros" 
          description="Revisa tus logros desbloqueados"
          color="bg-green-100 hover:bg-green-200 border-green-300"
          disabled
        />
        
        <MenuCard 
          title="Estadísticas" 
          description="Mira tu progreso y métricas"
          color="bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
          disabled
        />
      </div>

      {showActiveCases && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShowActiveCases(false)}
            >
              ×
            </button>
            <ActiveCasesMenu />
          </div>
        </div>
      )}
      
      <div className="mt-12 text-center text-gray-600">
        <p>PSYKAT - Simulador de Psicología Gamificado</p>
        <p className="text-sm mt-2">Versión 2.0 | IA Local Conectada</p>
      </div>
    </div>
  );
};

export default MainMenu;