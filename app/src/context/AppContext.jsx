import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { refreshAccessToken } from "../redux/authSlice/auth.Actions";
import { getUserProfile } from "../redux/userSlice/user.Actions";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [isAppReady, setIsAppReady] = useState(false);
    const dispatch = useDispatch();

    // 1. Immediate Auth Check
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem("accessToken");
    });

    // 2. Activity Tracker (useRef prevents unnecessary re-renders)
    const lastActivity = useRef(Date.now());

    useEffect(() => {
        const updateActivity = () => {
            lastActivity.current = Date.now();
        };

        window.addEventListener("mousemove", updateActivity);
        window.addEventListener("keydown", updateActivity);
        window.addEventListener("click", updateActivity);

        return () => {
            window.removeEventListener("mousemove", updateActivity);
            window.removeEventListener("keydown", updateActivity);
            window.removeEventListener("click", updateActivity);
        };
    }, []);

    // 3. Initial Verification (On App Load)
    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    await dispatch(getUserProfile()).unwrap();
                    setIsAuthenticated(true);
                } catch (err) {
                    localStorage.removeItem("accessToken");
                    setIsAuthenticated(false);
                }
            }
            setIsAppReady(true);
        };
        verifyUser();
    }, [dispatch]);

    // 4. Activity-Aware Silent Refresh
    useEffect(() => {
        let silentRefresh;

        if (isAuthenticated) {
            silentRefresh = setInterval(async () => {
                const now = Date.now();
                const minutesSinceLastActivity = (now - lastActivity.current) / (1000 * 60);

                // Only refresh if user was active in the last 20 minutes
                if (minutesSinceLastActivity < 20) {
                    console.log("Refreshing Session (User Active)...");
                    try {
                        await dispatch(refreshAccessToken()).unwrap();
                    } catch (err) {
                        console.error("Session refresh failed", err);
                        setIsAuthenticated(false);
                    }
                } else {
                    console.log("Session refresh skipped (User Idle)");
                }
            }, 10 * 60 * 1000); // Check every 10 minutes
        }

        return () => {
            if (silentRefresh) clearInterval(silentRefresh);
        };
    }, [isAuthenticated, dispatch]);

    return (
        <AppContext.Provider value={{ loading, setLoading, isAuthenticated, setIsAuthenticated }}>
            {isAppReady ? children : (
                <div className="bg-slate-950 h-screen w-full flex items-center justify-center">
                    <div className="animate-pulse text-indigo-500 font-bold tracking-widest uppercase">
                        Loading DevCollab...
                    </div>
                </div>
            )}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useApp must be used within a AppProvider");
    return context;
};