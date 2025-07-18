import React from 'react';
import type { Patient } from '../../data/patients';

interface ChatHeaderProps {
  patient: Patient;
  onBack: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ patient, onBack }) => (
  <div className="flex items-center p-4 bg-purple-100 border-b">
    <button onClick={onBack} className="mr-4 text-lg">←</button>
    <img src={patient.avatar || '/default-avatar.png'} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
    <div>
      <div className="font-bold text-purple-700">{patient.name}</div>
      <div className="text-xs text-green-600">En línea</div>
    </div>
  </div>
);

export default ChatHeader;
