import React from 'react';

export const StatusBar: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="bg-gray-50 h-11 flex justify-between items-center px-5 text-sm font-semibold">
      <span>{currentTime}</span>
      <span className="ml-4">📶 📶 🔋</span>
    </div>
  );
};