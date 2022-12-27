import { createContext, useCallback, useContext, useState } from "react";

export const NotificationContext = createContext<object | null>(null);


type TypesType = {
    error: string,
    warn: string,
    info: string,
    success: string
}

export const types: TypesType = {
    error: 'danger',
    warn: 'warn',
    info: 'info',
    success: 'success',
};

type InitialNotificationStateType = {
    show: boolean,
    message: string,
    type: string,
};

const initialNotificationState: InitialNotificationStateType = { 
    show: false, 
    message: '', 
    type: types.error 
};


interface NotificationProviderProps {
    children: React.ReactNode
}

export const NotificationProvider = ({
    children
}:NotificationProviderProps) => {
    const [notification, setNotification] = useState<InitialNotificationStateType>(initialNotificationState);

    const displayNotification = useCallback((message: string, type = types.error) => {
        setNotification({show: true, message, type});

        setTimeout(() => {
            setNotification(initialNotificationState);
        }, 5000);
    }, [initialNotificationState]);

    const hideNotification = useCallback(() => {
        setNotification(initialNotificationState)
    }, [initialNotificationState])

        return (
        <NotificationContext.Provider value={{notification, displayNotification, hideNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => {
    const state = useContext(NotificationContext);

    return state;
};