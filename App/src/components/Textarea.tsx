import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-medium text-zinc-400 select-none">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full text-sm rounded-xl bg-zinc-900 border transition-all duration-200 outline-none text-zinc-100 placeholder-zinc-500 py-2.5 px-3.5 min-h-[100px] resize-y
            ${error 
              ? 'border-rose-500/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20' 
              : 'border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-[11px] text-rose-500 font-medium">{error}</span>
        )}
        {!error && helperText && (
          <span className="text-[11px] text-zinc-500">{helperText}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
