import React from 'react';

const PsykatHeader: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <img src="/assets/psykat-avatar.png" alt="PSYKAT" className="w-24 h-24 rounded-full shadow-lg mb-4 animate-bounce" />
    <div className="text-2xl font-bold text-purple-700">PSYKAT</div>
    <div className="text-sm text-gray-500">Tu guía en la consulta psicológica</div>
  </div>
);

export default PsykatHeader;

