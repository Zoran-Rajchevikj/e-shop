// 2. AuthProvider.tsx - ОВДЕ се дефинирани функциите login и logout

import { useState, useEffect, type ReactNode } from 'react';
import AuthContext from "../../../api/context/AuthContext.ts";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    const extractRoleFromToken = (decodedPayload: any) => {
        try {
            const rolesArray = decodedPayload.roles;
            if (Array.isArray(rolesArray) && rolesArray.length > 0) {
                // Провери дали е објект со authority властност
                if (typeof rolesArray[0] === 'object' && rolesArray[0].authority) {
                    return rolesArray[0].authority;
                }
                // Провери дали е директно стринг
                if (typeof rolesArray[0] === 'string') {
                    return rolesArray[0];
                }
            }
            return null;
        } catch (error) {
            console.error("Error extracting role:", error);
            return null;
        }
    };
    // Кога компонентата ќе се вчита, провери дали има token во localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setToken(savedToken);
            try{
                const payloadBase = savedToken.split(".")[1];
                const decodedPayload = JSON.parse(atob(payloadBase));
                setUser(decodedPayload.sub);
                const extractedRole = extractRoleFromToken(decodedPayload);
                setRole(extractedRole);

            }
            catch (error){
                console.error("Invalid token:", error);
                setToken(null);
                setUser(null);
                setRole(null);
                localStorage.removeItem("token");
            }

        }
    }, []);

    // Кога ќе се позове login функцијата
    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        const payloadBase = newToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase));

        setUser(decodedPayload.sub);
        const extractedRole = extractRoleFromToken(decodedPayload);
        setRole(extractedRole);

    };

    // Кога ќе се позове logout функцијата
    const logout = () => {
        localStorage.removeItem("token"); // Избришав token-от од localStorage
        setToken(null); // Избришав го и од React state
        setUser(null);
        setRole(null);
    };



    const value = {
        token,
        isAuthenticated: !!token, // true ако token постои, false ако не постои
        login,
        logout,
        user,
        role
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;