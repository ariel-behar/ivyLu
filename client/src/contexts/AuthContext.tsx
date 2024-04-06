import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { User } from '../models/User';

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

interface Props {
    children: React.ReactNode
}

export const AuthProvider = ({
    children
}:Props) => {
    const [user, setUser] = useLocalStorage('user', initialUserState);

    const login = (userData: User) => {
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
        <AuthContext.Provider value={{user: user as User, login, logout, isLoggedIn, isHairdresser, isClient, isOperator, isAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
};