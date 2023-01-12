import { createContext, useCallback, useContext, useState } from "react";

export const NotificationContext = createContext<object | null>(null);


type TNotificationsTypes = {
    error: string,
    warning: string,
    info: string,
    success: string
}

export const nofiticationTypes: TNotificationsTypes = {
    error: 'error',
    warning: 'warn',
    info: 'info',
    success: 'success',
};

export type TInitialNotificationState = {
    show: boolean,
    message: string,
    type: string,
};

const initialNotificationState: TInitialNotificationState[] = [
    { 
        show: false, 
        message: '', 
        type: nofiticationTypes.error 
    }
];

interface Props {
    children: React.ReactNode
}

export const NotificationProvider = ({
    children
}:Props) => {
    const [notifications, setNotifications] = useState<TInitialNotificationState[]>(initialNotificationState);

    const displayNotification = useCallback(async (errObj: object, type = nofiticationTypes.error) => {
        let newNotificationContentObj: object; 

        if(errObj instanceof Error) {
            newNotificationContentObj = errObj
        } else {
            newNotificationContentObj = await errObj as object
        }

        if(newNotificationContentObj.hasOwnProperty('errors')) {
            let newErrors: TInitialNotificationState[] = [];

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