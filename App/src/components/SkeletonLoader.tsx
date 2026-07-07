import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
}) => {
  const styles: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const variantClasses = {
    text: 'rounded-md h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      style={styles}
      className={`
        bg-zinc-900/80 animate-pulse border border-zinc-900/30
        ${variantClasses[variant]}
        ${className}
      `}
    />
  );
};

export default SkeletonLoader;
