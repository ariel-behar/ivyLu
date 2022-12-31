import { createContext, useCallback, useContext, useState } from "react";

export const NotificationContext = createContext<object | null>(null);


type TypesType = {
    error: string,
    warning: string,
    info: string,
    success: string
}

export const types: TypesType = {
    error: 'error',
    warning: 'warn',
    info: 'info',
    success: 'success',
};

export type InitialNotificationStateType = {
    show: boolean,
    message: string,
    type: string,
};

const initialNotificationState: InitialNotificationStateType[] = [
    { 
        show: false, 
        message: '', 
        type: types.error 
    }
];


interface NotificationProviderProps {
    children: React.ReactNode
}

export const NotificationProvider = ({
    children
}:NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<InitialNotificationStateType[]>(initialNotificationState);

    const displayNotification = useCallback(async (errObj: object, type = types.error) => {
        let newNotificationContentObj: object; 

        if(errObj instanceof Error) {
            newNotificationContentObj = errObj
        } else {
            newNotificationContentObj = await errObj as object
        }

        if(newNotificationContentObj.hasOwnProperty('errors')) {
            let newErrors: InitialNotificationStateType[] = [];

            Object.keys(newNotificationContentObj['errors' as keyof typeof newNotificationContentObj]).forEach(err => {
                let message = `${newNotificationContentObj['errors' as keyof typeof newNotificationContentObj][err]['message' as keyof typeof err]}`

                newErrors.push({show: true, message, type})
            })

            setNotifications(newErrors)
        } else {
            let message = newNotificationContentObj['message' as keyof typeof newNotificationContentObj]
            setNotifications([{show: true, message , type}]);
        }

        setTimeout(() => {
            setNotifications(initialNotificationState);
        }, 5000);
    }, []);


    const hideNotification = useCallback(() => {
        setNotifications(initialNotificationState)
    }, [])

        return (
        <NotificationContext.Provider value={{ notifications, displayNotification, hideNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => {
    const state = useContext(NotificationContext);

    return state;
};