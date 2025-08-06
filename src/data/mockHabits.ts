import type { Habit } from '@/types/habit.types';

export const initialHabits: Habit[] = [
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