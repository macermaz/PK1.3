import React from 'react';
import { useGameContext } from '@/context/useGameContext';

const ActiveCasesMenu: React.FC = () => {
  const { state, actions } = useGameContext();

  if (state.activeCases.length === 0) {
    return <div className="text-center text-gray-500 py-8">No hay casos activos.</div>;
  }

  return (
    <div className="py-8">
      <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">Casos Activos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {state.activeCases.map(patient => (
          <div key={patient.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
            <img src={patient.avatar} alt={patient.name} className="w-16 h-16 rounded-full mb-2" />
            <div className="font-bold text-lg">{patient.name}</div>
            <div className="text-sm text-gray-600 mb-2">{patient.disorder}</div>
            <button
              className="mt-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200"
              onClick={() => actions.openActiveCase(patient.id)}
            >Abrir Caso</button>
            <button
              className="mt-2 px-4 py-1 bg-red-100 text-red-700 rounded-lg text-xs hover:bg-red-200"
              onClick={() => actions.removeActiveCase(patient.id)}
            >Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCasesMenu;
