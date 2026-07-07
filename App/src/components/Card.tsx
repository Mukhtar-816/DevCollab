import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  glass = false,
  padding = 'md',
  className = '',
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };

  return (
    <div
      className={`
        rounded-2xl transition-all duration-200 border
        ${glass 
          ? 'bg-zinc-900/40 backdrop-blur-xl border-zinc-800/80 shadow-lg shadow-black/20' 
          : 'bg-zinc-900 border-zinc-800/80 shadow-md'
        }
        ${hoverable ? 'hover:border-zinc-700/80 hover:bg-zinc-900/60 hover:-translate-y-0.5' : ''}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
