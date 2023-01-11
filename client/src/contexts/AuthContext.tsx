import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext<object | null>(null);

const initialUserState = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    role: '',
    authToken: '',
};

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthProvider = ({
    children
}:AuthProviderProps) => {
    const [user, setUser] = useLocalStorage('user', initialUserState);

    const login = (userData: object) => {
        try {
            setUser(userData)
        } catch (err) {
            console.log(err)
        }
    };

    const logout = () => {
        try {
            setUser(initialUserState)
        } catch (err) {
            console.log(err)
        }
    }

    const isLoggedIn = user._id ? true : false;

    const isClient = user.role === 1 ? true: false;

    const isHairdresser = user.role === 2 ? true: false;

    const isOperator = user.role === 3 ? true: false;

    const isAdmin = user.role === 4 ? true: false;
    
    return (
        <AuthContext.Provider value={{user, login, logout, isLoggedIn, isHairdresser, isClient, isOperator, isAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
};