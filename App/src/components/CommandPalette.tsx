import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, Home, User, Settings, Folder, MessageSquare, Bell, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const items = [
    { icon: <Home className="h-4 w-4" />, label: 'Go to Dashboard', shortcut: 'G D', action: () => navigate('/dashboard') },
    { icon: <User className="h-4 w-4" />, label: 'View Profile', shortcut: 'G P', action: () => navigate('/profile') },
    { icon: <Folder className="h-4 w-4" />, label: 'Browse Projects', shortcut: 'G L', action: () => navigate('/projects') },
    { icon: <MessageSquare className="h-4 w-4" />, label: 'Open Chats', shortcut: 'G C', action: () => navigate('/chat') },
    { icon: <Bell className="h-4 w-4" />, label: 'Notifications Center', shortcut: 'G N', action: () => navigate('/notifications') },
    { icon: <Settings className="h-4 w-4" />, label: 'Account Settings', shortcut: 'G S', action: () => navigate('/settings') },
    { icon: <CreditCard className="h-4 w-4" />, label: 'View Pricing & Plans', shortcut: 'G R', action: () => navigate('/pricing') },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[50vh]"
      >
        {/* Search bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-900 gap-3">
          <Search className="h-5 w-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500 text-sm"
          />
          <kbd className="hidden sm:inline-block bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-sans font-medium uppercase">
            ESC
          </kbd>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredItems.length > 0 ? (
            <div className="flex flex-col gap-0.5">
              {filteredItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-left hover:bg-zinc-900 transition-colors text-sm text-zinc-300 hover:text-zinc-100 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/60 border border-zinc-900 px-1.5 py-0.5 rounded group-hover:bg-zinc-800/80">
                    {item.shortcut}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-zinc-500 text-xs">
              No commands found for "{search}"
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-zinc-900/30 border-t border-zinc-900/80 flex items-center justify-between text-[10px] text-zinc-500 font-medium">
          <div className="flex items-center gap-1">
            <Terminal className="h-3 w-3" />
            <span>DevCollab Command Palette</span>
          </div>
          <span>Use ↑↓ keys to navigate</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
