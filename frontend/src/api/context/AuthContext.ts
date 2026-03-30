

import React from "react";
interface AuthContextValue{
    token:string|null,
    isAuthenticated:boolean,
    login:(token:string)=>void,
    logout:() => void,
    user:string|null,
    role:string|null
}


const AuthContext = React.createContext<AuthContextValue>({
    token: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    user: null,
    role: null,
});

export default AuthContext;
