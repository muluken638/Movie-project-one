// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (token) => {
        localStorage.setItem('token', token); // Store the token in localStorage
        setUser(token);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
