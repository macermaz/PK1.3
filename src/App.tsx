import React from 'react';
import { GameProvider } from './context/GameProvider';
import MainMenu from './components/main-menu/MainMenu';
import CaseSelection from './components/case/CaseSelection';
import ChatScreen from './components/chat/ChatScreen';
import { useGameContext } from './context/useGameContext';

const AppRouter: React.FC = () => {
  const { state } = useGameContext();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
      {!state.currentPatient ? (
        state.activeCases.length > 0 ? (
          <CaseSelection />
        ) : (
          <MainMenu />
        )
      ) : (
        <ChatScreen patient={state.currentPatient} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppRouter />
    </GameProvider>
  );
};

export default App;