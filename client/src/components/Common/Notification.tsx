import { InitialNotificationStateType, useNotificationContext } from "../../contexts/NotificationContext";
import { ToastContainer, toast, Flip } from 'react-toastify';

function Notification() {
    const { notifications } = useNotificationContext() as any;

    notifications.forEach((notification: InitialNotificationStateType) => {
        if (!notification.show) {
            return null;
        }

        if (notification.type === 'success') {
            toast.success(notification.message);
        } else if (notification.type === 'warning') {
            toast.warn(notification.message);
        } else if (notification.type === 'error') {
            toast.error(notification.message);
        } else if (notification.type === 'info') {
            toast.info(notification.message);
        } else {
            toast(notification.message);
        }
    });



    return (
        <ToastContainer
            position="bottom-right"
            transition={Flip}
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    )
}

export default Notification