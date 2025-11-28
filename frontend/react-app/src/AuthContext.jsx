import React, {createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in when the app loads
        fetch('http://localhost:8080/api/v1/auth/login')
            .then(response => response.json())
            .then(data => {
                setUser(data.user); // Adjust based on your API response
                setLoading(false);
            }).catch((e) => {
            // Navigate to the login page...
        });
    }, []);

    const login = (loggedInUser) => {
        setUser(loggedInUser);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}