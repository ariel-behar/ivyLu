import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';


export const AuthContext = createContext<object | null>(null);

const initialUserState = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    role: '',
    AUTH_TOKEN: '',
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

    const isLoggedIn = user.userId ? true : false;
    
    return (
        <AuthContext.Provider value={{user, login, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
};