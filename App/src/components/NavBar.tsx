import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, Settings, Folder } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice/auth.actions';
import { toast } from 'react-toastify';
import Button from './Button';
import Avatar from './Avatar';
import Dropdown from './Dropdown';

export const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { user, profile } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (!isAuthenticated) return;
    try {
      await dispatch(logout() as any).unwrap();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error: any) {
      toast.error(error?.message || "Logout failed. Please try again.");
    }
  };

  const displayName = profile?.name || user?.email?.split('@')[0] || 'User';
  const displayAvatar = profile?.avatar || '';

  const userDropdownItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, onClick: () => navigate('/dashboard') },
    { label: 'View Profile', icon: <User className="h-4 w-4" />, onClick: () => navigate('/profile') },
    { label: 'Browse Projects', icon: <Folder className="h-4 w-4" />, onClick: () => navigate('/projects') },
    { label: 'Settings', icon: <Settings className="h-4 w-4" />, onClick: () => navigate('/settings') },
    { label: 'Logout', icon: <LogOut className="h-4 w-4" />, danger: true, onClick: handleLogout },
  ];

  return (
    <motion.div
      className="flex w-full h-[64px] border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-40 select-none"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="flex w-full justify-between items-center px-6 md:px-12">
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-all">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-extrabold text-xs">
            D
          </div>
          <span className="font-extrabold text-sm tracking-tight text-zinc-100">
            DevCollab
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => navigate('/auth')}
              >
                Join Now
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="hidden sm:inline-flex"
              >
                Go to App
              </Button>
              <Dropdown
                align="right"
                trigger={
                  <button className="flex items-center gap-2.5 p-1 hover:bg-zinc-900 rounded-xl transition-all cursor-pointer">
                    <Avatar src={displayAvatar} name={displayName} size="sm" />
                  </button>
                }
                items={userDropdownItems}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NavBar;