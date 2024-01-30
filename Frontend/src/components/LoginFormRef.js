import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [LoggedIn, setLoggedIn] = useState(false);

    
    const checkLoginStatus = () => {
        fetch("http://localhost:8081/cookie", { credentials: "include" })
            .then(response => response.json())
            .then(userData => {
                setLoggedIn(userData.verified);
            })
            .catch(error => {
                console.error("Error checking login status:", error);
            });
    };

    
    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ LoggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
