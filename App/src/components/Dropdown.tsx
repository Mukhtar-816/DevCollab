import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`
            absolute mt-2 w-48 rounded-xl bg-zinc-900 border border-zinc-800 p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150
            ${align === 'right' ? 'right-0' : 'left-0'}
          `}
        >
          <div className="flex flex-col gap-0.5">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`
                  flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors
                  ${item.danger 
                    ? 'text-rose-400 hover:bg-rose-500/10' 
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }
                `}
              >
                {item.icon && <span className="flex-shrink-0 opacity-80">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
