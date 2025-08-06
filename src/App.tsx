import React, { useState, useEffect, useCallback } from 'react';

// TypeScript interfaces
interface Habit {
  id: string;
  name: string;
  emoji: string;
  streak: number;
  goal: string;
  progress: number;
  completedToday: boolean;
  category: string;
}

interface VisionImage {
  id: string;
  emoji: string;
  label: string;
}

interface VisionBoard {
  id: string;
  title: string;
  emoji: string;
  images: VisionImage[];
  statement: string;
}

interface Quote {
  text: string;
  author: string;
}

type NavigationTab = 'dashboard' | 'vision' | 'calendar' | 'insights' | 'settings';

// Mock data
const initialHabits: Habit[] = [
  {
    id: '1',
    name: 'Drink Water',
    emoji: '💧',
    streak: 5,
    goal: '8 glasses',
    progress: 75,
    completedToday: false,
    category: 'health'
  },
  {
    id: '2',
    name: 'Morning Run',
    emoji: '🏃‍♂️',
    streak: 12,
    goal: '30 minutes',
    progress: 100,
    completedToday: true,
    category: 'fitness'
  },
  {
    id: '3',
    name: 'Read',
    emoji: '📚',
    streak: 2,
    goal: '20 pages',
    progress: 30,
    completedToday: false,
    category: 'learning'
  }
];

const visionBoards: VisionBoard[] = [
  {
    id: '1',
    title: 'My Fitness Goals',
    emoji: '🏃‍♂️',
    images: [
      { id: '1', emoji: '🏃‍♂️', label: 'Marathon' },
      { id: '2', emoji: '💪', label: 'Strong' },
      { id: '3', emoji: '🥗', label: 'Healthy' },
      { id: '4', emoji: '⚖️', label: 'Balance' },
      { id: '5', emoji: '😊', label: 'Happy' }
    ],
    statement: 'I want to run a marathon by next year and feel strong and energetic every day.'
  },
  {
    id: '2',
    title: 'Learning Journey',
    emoji: '📚',
    images: [
      { id: '6', emoji: '📚', label: 'Books' },
      { id: '7', emoji: '🎓', label: 'Degree' },
      { id: '8', emoji: '💻', label: 'Code' },
      { id: '9', emoji: '🌱', label: 'Growth' },
      { id: '10', emoji: '🚀', label: 'Career' }
    ],
    statement: 'Reading 20 minutes daily will help me advance my career and personal growth.'
  }
];

const quotes: Quote[] = [
  { text: "Small daily improvements lead to stunning results.", author: "Robin Sharma" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" }
];

const MomentumApp: React.FC = () => {
  // State management
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('momentum-habits');
    return saved ? JSON.parse(saved) : initialHabits;
  });
  
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [showCelebration, setShowCelebration] = useState(false);

  // Save habits to localStorage
  useEffect(() => {
    localStorage.setItem('momentum-habits', JSON.stringify(habits));
  }, [habits]);

  // Set daily quote
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;
    setCurrentQuote(quotes[quoteIndex]);
  }, []);

  // Helper functions
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning!', emoji: '🌅' };
    if (hour < 17) return { text: 'Good Afternoon!', emoji: '☀️' };
    return { text: 'Good Evening!', emoji: '🌙' };
  };

  const getTotalStreak = () => {
    return habits.reduce((sum, habit) => sum + habit.streak, 0);
  };

  const canNavigateTo = (tab: NavigationTab) => {
    return ['dashboard', 'vision'].includes(tab);
  };

  // Event handlers
  const completeHabit = useCallback((habitId: string) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === habitId && !habit.completedToday) {
          // Show celebration
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 1000);

          // Log for HCI research
          console.log('Habit Completed:', {
            habitId: habit.id,
            habitName: habit.name,
            previousStreak: habit.streak,
            timestamp: new Date().toISOString()
          });

          return {
            ...habit,
            completedToday: true,
            progress: 100,
            streak: habit.streak + 1
          };
        }
        return habit;
      })
    );
  }, []);

  const navigateTo = useCallback((tab: NavigationTab) => {
    console.log('Navigation:', { from: activeTab, to: tab, timestamp: new Date().toISOString() });
    if (canNavigateTo(tab)) {
      setActiveTab(tab);
    }
  }, [activeTab]);

  // Components
  const StatusBar = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    return (
      <div className="bg-gray-50 h-11 flex justify-between items-center px-5 text-sm font-semibold">
        <span>{currentTime}</span>
        <span>📶 📶 🔋</span>
      </div>
    );
  };

  const WelcomeCard = () => {
    const greeting = getTimeBasedGreeting();
    return (
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-5 rounded-2xl mb-5">
        <div className="text-lg font-bold mb-2">
          {greeting.text} {greeting.emoji}
        </div>
        <div className="text-sm opacity-90">
          You're doing great - {getTotalStreak()} total streak days!
        </div>
      </div>
    );
  };

  const QuoteCard = () => (
    <div className="bg-gradient-to-r from-yellow-200 to-orange-300 p-4 rounded-xl mb-5 text-center">
      <div className="italic text-base mb-2">"{currentQuote.text}"</div>
      <div className="text-xs text-gray-600">- {currentQuote.author}</div>
    </div>
  );

  const HabitCard = ({ habit }: { habit: Habit }) => (
    <div className="bg-gray-50 rounded-xl p-4 mb-3 border-l-4 border-green-500">
      <div className="flex justify-between items-start mb-2">
        <div className="font-semibold text-base">
          {habit.emoji} {habit.name}
        </div>
        <div className="text-xs text-gray-500">
          {habit.streak} day streak
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-3">
        Goal: {habit.goal}
      </div>
      
      <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-3">
        <div 
          className="bg-gradient-to-r from-green-500 to-emerald-400 h-full transition-all duration-300"
          style={{ width: `${habit.progress}%` }}
        />
      </div>
      
      <button
        onClick={() => completeHabit(habit.id)}
        disabled={habit.completedToday}
        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          habit.completedToday 
            ? 'bg-gray-500 text-white cursor-default' 
            : 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md cursor-pointer'
        }`}
      >
        {habit.completedToday ? '✓ Completed Today' : 'Mark Complete'}
      </button>
    </div>
  );

  const VisionBoardComponent = ({ board }: { board: VisionBoard }) => (
    <div className="bg-gray-50 rounded-xl p-4 mb-5">
      <h4 className="mb-3 text-gray-800 font-medium">
        {board.emoji} {board.title}
      </h4>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        {board.images.map((image) => (
          <div
            key={image.id}
            className="aspect-square bg-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-400 hover:scale-105 transition-all duration-200"
          >
            <span className="text-xl">{image.emoji}</span>
            <span className="text-xs mt-1">{image.label}</span>
          </div>
        ))}
        
        <div className="aspect-square bg-primary-500 rounded-lg flex flex-col items-center justify-center text-white cursor-pointer hover:bg-primary-600 transition-all duration-200">
          <span className="text-xl">➕</span>
          <span className="text-xs mt-1">Add</span>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 italic text-center mt-2">
        "{board.statement}"
      </div>
    </div>
  );

  const Navigation = () => {
    const tabs: { id: NavigationTab; label: string }[] = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'vision', label: 'Vision' },
      { id: 'calendar', label: 'Calendar' },
      { id: 'insights', label: 'Insights' },
      { id: 'settings', label: 'Settings' },
    ];

    return (
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const canNavigate = canNavigateTo(tab.id);
          
          return (
            <div
              key={tab.id}
              onClick={() => canNavigate ? navigateTo(tab.id) : null}
              className={`flex flex-col items-center p-2 transition-all ${
                isActive ? 'text-primary-500' : 'text-gray-400'
              } ${canNavigate ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            >
              <div className={`w-6 h-6 mb-1 rounded-full ${
                isActive ? 'bg-primary-500' : 'bg-gray-400'
              }`} />
              <div className="text-xs font-medium capitalize">{tab.label}</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render screens
  const renderDashboard = () => (
    <div className="h-full overflow-y-auto p-5 pb-24">
      <div className="text-center mb-5 text-sm font-bold text-primary-500 uppercase tracking-wide">
        Main Dashboard
      </div>
      
      <WelcomeCard />
      <QuoteCard />
      
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );

  const renderVisionBoard = () => (
    <div className="h-full overflow-y-auto p-5 pb-24">
      <div className="text-center mb-5 text-sm font-bold text-primary-500 uppercase tracking-wide">
        Your Vision Boards
      </div>
      
      {visionBoards.map((board) => (
        <VisionBoardComponent key={board.id} board={board} />
      ))}
      
      <button 
        className="w-full p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md cursor-pointer"
        onClick={() => console.log('Create new vision board')}
      >
        + Create New Vision Board
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-5">
      {/* Phone Frame */}
      <div className="w-80 h-[640px] bg-black rounded-[3rem] p-3 shadow-2xl relative">
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          <StatusBar />
          
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'vision' && renderVisionBoard()}
          
          <Navigation />
          
          {/* Add Habit Button - only show on dashboard */}
          {activeTab === 'dashboard' && (
            <button 
              className="absolute bottom-24 right-5 w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              onClick={() => console.log('Add habit functionality')}
            >
              <span className="text-2xl">+</span>
            </button>
          )}
          
          {/* Celebration animation */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="text-4xl animate-bounce">🎉</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MomentumApp;