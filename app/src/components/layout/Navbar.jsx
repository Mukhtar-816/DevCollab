import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, Code2, LayoutDashboard, User, LogOut, LogIn, UserPlus, Globe } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify";
import { useApp } from "../../context/AppContext.jsx";
import { logout } from "../../redux/authSlice/auth.Actions"; // Import your logout action

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {setLoading} = useApp();

    // 1. Hybrid State Access
    const { isAuthenticated, setIsAuthenticated } = useApp(); // Gatekeeper
    // const { user } = useSelector((state) => state.auth);      // Data

    const isActive = (path) => location.pathname === path;

    // 2. Logic-Based Links
    const publicLinks = [{ name: "Home", path: "/", icon: Globe }];
    const privateLinks = [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Profile", path: "/profile", icon: User },
    ];

    const handleLogout = async () => {
        try {
            setLoading(true);
            await dispatch(logout()).unwrap();
            toast.success("logged out Successfully.")
            setIsAuthenticated(false); // Update Context Gate
            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
        finally {
            setLoading(false);
        }
    };

    const user = {
        username: "jasonidheididneideindin",
        role: "dev"
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md border-border/40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="rounded-lg bg-primary p-1.5 text-primary-foreground transition-transform group-hover:scale-110">
                            <Code2 size={24} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">DevCollab</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {/* Always show public links, show private if auth */}
                        {[...publicLinks, ...(isAuthenticated ? privateLinks : [])].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                                    isActive(link.path)
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground/60 hover:text-foreground hover:bg-accent"
                                )}
                            >
                                <link.icon size={18} />
                                <span>{link.name}</span>
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-border mx-2" />

                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                            {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
                        </Button>

                        <div className="flex items-center space-x-2 ml-2">
                            {isAuthenticated ? (
                                <>
                                    <div className="h-10 w-10 hover:scale-120 hover:border-[2px] border-white/50 transition-all duration-300 rounded-full">
                                        <img
                                            className="h-full w-full object-cover rounded-full"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWY2rbTZubB5i-IrHqk4q_v9z1UAIo2vhq1A&s" />
                                    </div>
                                    <div className="flex flex-col items-end mr-2">
                                        <span className="text-xs font-bold text-primary truncate max-w-11">{user?.username|| "Developer"}</span>
                                        <span className="text-[10px] text-muted-foreground truncate max-w-11 capitalize">{user?.role || "Member"}</span>
                                    </div>
                                    <Button size="sm" onClick={handleLogout} className="bg-transparent border-red-500/50 hover:bg-red-500/10 text-red-500">
                                        <LogOut size={20} className="" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost" size="sm">Login</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button size="sm" className="bg-primary hover:opacity-90 text-primary-foreground">Get Started</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
                    <div className="space-y-1 px-4 pt-2 pb-6">
                        {[...publicLinks, ...(isAuthenticated ? privateLinks : [])].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={cn(
                                    "flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium",
                                    isActive(link.path) ? "bg-primary/10 text-primary" : "text-foreground/60"
                                )}
                            >
                                <link.icon size={20} />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-border mt-2">
                            {isAuthenticated ? (
                                <Button onClick={handleLogout} className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20">
                                    <LogOut size={18} className="mr-2" /> Logout
                                </Button>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)}><Button className="w-full bg-primary text-primary-foreground">Register</Button></Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;