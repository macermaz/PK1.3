import React from 'react';
import { Patient } from '@/data/patients';

interface PatientCardProps {
  patient: Patient;
  onSelect: (patient: Patient) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 border-2 border-gray-200 hover:border-purple-300"
      onClick={() => onSelect(patient)}
    >
      <div className="p-4">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-dashed border-purple-300 rounded-xl w-16 h-16 flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="font-bold text-lg text-gray-800">{patient.name}</h3>
            <p className="text-gray-600">{patient.age} años</p>
            <div className="mt-1">
              <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                {patient.disorder}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Personalidad: {patient.personality}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            patient.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
            patient.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {patient.difficulty === 'EASY' ? 'Fácil' : 
             patient.difficulty === 'MEDIUM' ? 'Medio' : 'Difícil'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
