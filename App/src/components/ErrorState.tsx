import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-red-500/20 rounded-2xl bg-rose-500/5 my-4">
      <div className="text-rose-400 mb-3.5 bg-rose-500/10 p-3 rounded-full border border-rose-500/20">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-200 mb-1">{title}</h3>
      <p className="text-xs text-zinc-500 max-w-sm mb-4 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-1.5 px-3 rounded-lg hover:bg-indigo-500/10"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
