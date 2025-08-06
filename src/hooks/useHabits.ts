import { useCallback } from 'react';
import toast from 'react-hot-toast';
import type { Habit } from '@/types/habit.types';
import { useLocalStorage } from './useLocalStorage';
import { initialHabits } from '@/data/mockHabits';

export const useHabits = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('momentum-habits', initialHabits);

  const completeHabit = useCallback((habitId: string) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === habitId && !habit.completedToday) {
          // Show celebration toast
          toast.success(`🎉 Great job completing ${habit.name}!`, {
            duration: 3000,
            style: {
              background: '#10b981',
              color: 'white',
            },
          });

          // Track interaction for HCI research
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
  }, [setHabits]);

  const addHabit = useCallback((newHabit: Omit<Habit, 'id'>) => {
    const habit: Habit = {
      ...newHabit,
      id: Date.now().toString(), // Simple ID generation for prototype
    };
    
    setHabits(prevHabits => [...prevHabits, habit]);
    toast.success(`Added new habit: ${habit.name}`);
  }, [setHabits]);

  const getTotalStreak = useCallback(() => {
    return habits.reduce((sum, habit) => sum + habit.streak, 0);
  }, [habits]);

  const getCompletedTodayCount = useCallback(() => {
    return habits.filter(habit => habit.completedToday).length;
  }, [habits]);

  return {
    habits,
    completeHabit,
    addHabit,
    getTotalStreak,
    getCompletedTodayCount
  };
};