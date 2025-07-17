import React from 'react';

interface MenuCardProps {
  title: string;
  description: string;
  color?: string;
  onClick?: () => void;
  highlight?: boolean;
  disabled?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({ title, description, color = '', onClick, highlight, disabled }) => (
  <button
    className={`w-full p-6 rounded-xl shadow-md border transition-all duration-200 text-left focus:outline-none ${color} ${highlight ? 'ring-2 ring-purple-400' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
  >
    <div className="font-bold text-lg mb-2">{title}</div>
    <div className="text-gray-700 mb-2">{description}</div>
    {highlight && <div className="mt-2 text-xs text-purple-600 font-semibold">Disponible</div>}
  </button>
);

export default MenuCard;

