import { useState, useEffect, useCallback } from 'react';
import type { Quote } from '@/types/ui.types';
import { quotes } from '@/data/quotes';

export const useQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);

  useEffect(() => {
    // Rotate quotes daily based on date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;
    
    setCurrentQuote(quotes[quoteIndex]);
  }, []);

  const getRandomQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  return {
    currentQuote,
    getRandomQuote
  };
};