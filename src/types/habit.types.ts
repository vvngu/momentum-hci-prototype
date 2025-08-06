export interface Habit {
    id: string;
    name: string;
    emoji: string;
    streak: number;
    goal: string;
    progress: number;
    completedToday: boolean;
    category: string;
  }