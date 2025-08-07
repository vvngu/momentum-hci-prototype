import React from 'react';
import { HabitCard, WelcomeCard, QuoteCard } from '@/components/features/dashboard';
import { VisionBoard } from '@/components/features/vision';
import { Calendar } from '@/components/features/calendar';
import { Insights } from '@/components/features/insights';
import { PhoneFrame, StatusBar, Navigation } from '@/components/layout';
import { useHabits, useNavigation, useQuotes } from '@/hooks';
import { initialVisionBoards } from '@/data';
import { Settings } from '@/components/features/settings';

const App: React.FC = () => {
  const { habits, completeHabit, getTotalStreak } = useHabits();
  const { activeTab, navigateTo, canNavigateTo } = useNavigation();
  const { currentQuote } = useQuotes();

  const renderDashboard = () => (
    <div className="h-full overflow-y-auto p-5 pb-32">
      <div className="text-center mb-5 text-sm font-bold text-primary-500 uppercase tracking-wide">
        Main Dashboard
      </div>
      
      <WelcomeCard totalStreak={getTotalStreak()} />
      <QuoteCard quote={currentQuote} />
      
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onComplete={completeHabit} />
      ))}
    </div>
  );

  const renderVisionBoard = () => (
    <div className="h-full overflow-y-auto p-5 pb-32">
      <div className="text-center mb-5 text-sm font-bold text-primary-500 uppercase tracking-wide">
        Your Vision Boards
      </div>
      
      {initialVisionBoards.map((board) => (
        <VisionBoard key={board.id} board={board} />
      ))}
      
      <button className="w-full p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md cursor-pointer">
        + Create New Vision Board
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-5">
      <PhoneFrame>
        <StatusBar />
        
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'vision' && renderVisionBoard()}
        {activeTab === 'calendar' && <Calendar habits={habits} />}
        {activeTab === 'insights' && <Insights habits={habits} />}
        {activeTab === 'settings' && <Settings habits={habits} />}
        
        <Navigation 
          activeTab={activeTab} 
          onTabChange={navigateTo} 
          canNavigateTo={canNavigateTo} 
        />
        {activeTab === 'dashboard' && (
          <button 
            className="absolute bottom-24 right-5 w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            onClick={() => console.log('Add habit functionality')}
          >
            <span className="text-2xl">+</span>
          </button>
        )}
      </PhoneFrame>
    </div>
  );
};

export default App;