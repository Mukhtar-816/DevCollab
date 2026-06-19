import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const ContextProvider = ({children} : any) => {

    const [isAuthenticated, setIsAuthenticated] :any = useState(false);
    const [user, setUser] : any = useState([]);


    const checkAuth = async() => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) return;

        setIsAuthenticated(true);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return(
        <AuthContext.Provider value={isAuthenticated} >
            {children}
        </AuthContext.Provider>
    )
};


export const useAuth = () => useContext(AuthContext);