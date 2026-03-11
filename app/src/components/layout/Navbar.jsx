import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X, Code2, LayoutDashboard, User, LogOut, LogIn, UserPlus, Globe } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/", icon: Globe },
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Profile", path: "/profile", icon: User },
    ];

    const authLinks = [
        { name: "Login", path: "/login", icon: LogIn },
        { name: "Register", path: "/register", icon: UserPlus },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="rounded-lg bg-primary p-1.5 text-primary-foreground">
                            <Code2 size={24} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">DevCollab</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    isActive(link.path)
                                        ? "bg-accent/10 text-primary"
                                        : "text-foreground/60 hover:text-foreground hover:bg-accent/5"
                                )}
                            >
                                <link.icon size={18} />
                                <span>{link.name}</span>
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-border mx-2" />

                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </Button>

                        <div className="flex items-center space-x-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background animate-in slide-in-from-top-4 duration-300">
                    <div className="space-y-1 px-4 pt-2 pb-3">
                        {[...navLinks, ...authLinks].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={cn(
                                    "flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors",
                                    isActive(link.path)
                                        ? "bg-accent/10 text-primary"
                                        : "text-foreground/60 hover:text-foreground hover:bg-accent/5"
                                )}
                            >
                                <link.icon size={20} />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
