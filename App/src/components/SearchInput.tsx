import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onClear,
  value,
  className = '',
  ...props
}) => {
  return (
    <div className="relative flex items-center w-full">
      <div className="absolute left-3.5 text-zinc-400 pointer-events-none flex items-center justify-center">
        <Search className="h-4 w-4" />
      </div>
      <input
        value={value}
        className={`
          w-full text-sm rounded-xl bg-zinc-900 border border-zinc-800 transition-all duration-200 outline-none text-zinc-100 placeholder-zinc-500 py-2 pl-10 pr-10
          focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 text-zinc-400 hover:text-zinc-200 transition-colors p-1 rounded-full hover:bg-zinc-800"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
