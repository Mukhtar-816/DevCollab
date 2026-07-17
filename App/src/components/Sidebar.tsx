import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Home, Folder, CheckSquare, MessageSquare, Bell,
  Settings, CreditCard, ChevronLeft, ChevronRight,
  Command, LogOut, User,
  User2,
  UserRoundArrowLeft
} from 'lucide-react';
import { logout } from '../redux/slices/authSlice/auth.actions';
import Avatar from './Avatar';
import Dropdown from './Dropdown';
import CommandPalette from './CommandPalette';
import { toast } from 'react-toastify';

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state: any) => state.user);


  const handleLogout = async () => {
    try {
      await dispatch(logout() as any).unwrap();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (err: any) {
      toast.error(err.message || "Logout failed");
    }
  };

  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { to: '/projects', label: 'Projects', icon: <Folder className="h-5 w-5" /> },
    { to: '/invitations', label: 'Invitations', icon: <UserRoundArrowLeft className="h-5 w-5" /> },
    { to: '/profile', label: 'Profile', icon: <User2 className="h-5 w-5" /> },
    { to: '/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { to: '/pricing', label: 'Pricing Plans', icon: <CreditCard className="h-5 w-5" /> },
    { to: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },

  ];

  const userDropdownItems = [
    { label: 'Profile Page', icon: <User className="h-4 w-4" />, onClick: () => navigate('/profile') },
    { label: 'Settings', icon: <Settings className="h-4 w-4" />, onClick: () => navigate('/settings') },
    { label: 'Logout', icon: <LogOut className="h-4 w-4" />, danger: true, onClick: handleLogout },
  ];

  // Sync keyboard shortcut Cmd/Ctrl + K to open command palette
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const displayName = profile?.name || user?.email?.split('@')[0] || 'User';
  const displayAvatar = profile?.avatar || '';

  return (
    <>
      <div
        className={`
          absolute h-full md:relative flex flex-col max-h-screen bg-zinc-950 border-r border-zinc-900 transition-all duration-300 z-45
          ${isCollapsed ? 'w-20' : 'w-50  md:w-64'}
        `}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-zinc-900 border border-zinc-800 rounded-full p-1 text-zinc-400 hover:text-zinc-200 transition-colors z-50 cursor-pointer shadow-md"
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-900/60 flex-shrink-0">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black shadow-md shadow-indigo-500/20">
            D
          </div>
          {!isCollapsed && (
            <span className="font-extrabold text-sm tracking-tight text-zinc-100 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              DevCollab
            </span>
          )}
        </div>

        {/* Command Search Shortcut Button */}
        <div className="px-3 py-4 flex-shrink-0">
          <button
            onClick={() => setIsPaletteOpen(true)}
            className={`
              flex items-center gap-2 w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700/80 rounded-xl px-3.5 py-2 text-left text-zinc-500 transition-all
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <Command className="h-4 w-4" />
            {!isCollapsed && (
              <>
                <span className="text-xs flex-1">Search actions...</span>
                <kbd className="bg-zinc-800 border border-zinc-700/60 px-1.5 py-0.5 rounded text-[9px] text-zinc-400 font-mono font-medium">
                  ⌘K
                </kbd>
              </>
            )}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col overflow-y-auto px-3 space-y-1 py-1 no-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              // onClick={() => setIsCollapsed(true)}
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
                ${isActive
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/15 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Footer Profile */}
        <div className="p-3 border-t mt-10 border-zinc-900/60 flex-shrink-0">
          <Dropdown
            align="right"
            trigger={
              <button className="flex items-center gap-3 w-full p-2 hover:bg-zinc-900/60 rounded-xl transition-all text-left">
                <Avatar src={displayAvatar} name={displayName} size="sm" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-zinc-200 truncate">{displayName}</p>
                    <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
                  </div>
                )}
              </button>
            }
            items={userDropdownItems}
          />
        </div>
      </div>

      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  );
};

export default Sidebar;
