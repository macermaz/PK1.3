import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim() === '' || disabled) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return React.createElement(
    "div",
    { className: "p-4 bg-white border-t" },
    React.createElement(
      "div",
      { className: "flex" },
      React.createElement("input", {
        type: "text",
        value: inputText,
        onChange: (e) => setInputText(e.target.value),
        onKeyPress: (e) => e.key === "Enter" && handleSubmit(),
        className:
          "flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary",
        placeholder: "Escribe tu pregunta...",
        disabled: disabled,
      }),
      React.createElement(
        "button",
        {
          onClick: handleSubmit,
          disabled: disabled || inputText.trim() === "",
          className: `p-3 rounded-r-lg ${
            !disabled
              ? "bg-primary text-white hover:bg-primary-dark"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`,
        },
        "Enviar"
      )
    ),
    !disabled &&
      React.createElement(
        "div",
        { className: "flex flex-wrap gap-2 mt-2" },
        React.createElement(
          "button",
          {
            onClick: () => setInputText("¿Cómo te sientes cuando...?"),
            className: "text-xs bg-accent text-gray-800 px-2 py-1 rounded-full",
          },
          "¿Cómo te sientes cuando...?"
        ),
        React.createElement(
          "button",
          {
            onClick: () => setInputText("¿Qué síntomas has notado?"),
            className: "text-xs bg-accent text-gray-800 px-2 py-1 rounded-full",
          },
          "¿Qué síntomas has notado?"
        )
      )
  );
};

export default ChatInput;