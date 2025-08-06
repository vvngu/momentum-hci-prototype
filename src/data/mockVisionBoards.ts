import type { VisionBoard } from '@/types/vision.types';

export const initialVisionBoards: VisionBoard[] = [
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