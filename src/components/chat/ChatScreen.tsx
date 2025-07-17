import React, { useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { useGameSession } from '@/hooks/useGameSession';
import type { Patient } from '@/data/patients';
import { useGameContext } from '../../context/useGameContext';

const ChatScreen: React.FC<{ patient: Patient }> = ({ patient }) => {
  const { messages, sendMessage, questionsLeft, sessionScore, isThinking } = useGameSession(patient);
  const { actions } = useGameContext();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Desplazar al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleEndSession = () => {
    actions.endCurrentCase();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader patient={patient} onBack={handleEndSession} />
      
      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((msg, index) => (
          <MessageBubble 
            key={index}
            text={msg.text}
            sender={msg.sender}
            isUser={msg.sender === 'user'}
          />
        ))}
        {isThinking && (
          <MessageBubble 
            text="..."
            sender="patient"
            isThinking
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Contador de preguntas y puntuación */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-t">
        <div className="font-medium">
          Preguntas restantes: 
          <span className={`ml-1 ${
            questionsLeft > 2 ? 'text-green-600' : 
            questionsLeft > 1 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {questionsLeft}
          </span>
        </div>
        <div className="font-medium">Puntos: <span className="text-purple-600">{sessionScore}</span></div>
      </div>
      
      {/* Entrada de chat */}
      <ChatInput 
        onSendMessage={sendMessage}
        disabled={questionsLeft <= 0 || isThinking}
      />
    </div>
  );
};

export default ChatScreen;