import React from 'react';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'patient';
  isUser?: boolean;
  isThinking?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  text, 
  isUser = false,
  isThinking = false
}) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
          isUser 
            ? 'bg-primary text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        {isThinking ? (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

export default MessageBubble;