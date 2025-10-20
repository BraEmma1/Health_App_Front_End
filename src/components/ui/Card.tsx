import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-soft border border-gray-100',
        hover && 'hover:shadow-card transition-shadow duration-300',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
