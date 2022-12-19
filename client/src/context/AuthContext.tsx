import { useState, createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';


export const AuthContext = createContext<object | null>(null);

const initialUserState = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    AUTH_TOKEN: '',
};

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({
    children
}:AuthProviderProps) => {
    const [user, setUser] = useLocalStorage('user', initialUserState);

    const login = (userData: object) => {
        try {
            setUser(JSON.stringify(userData))
        } catch (err) {
            console.log(err)
        }
    };
    
    return (
        <AuthContext.Provider value={{user, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
};