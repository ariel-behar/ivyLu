import { Navigate } from "react-router-dom";
import React from 'react';
import { useAuthContext } from "../contexts/AuthContext";

export const isGuestRouteGuard = (Component: React.FunctionComponent<React.PropsWithChildren>) => {

    const WrapperComponent = (props?: React.PropsWithChildren) => {
        const { isLoggedIn } = useAuthContext() as {isLoggedIn: boolean};

        return isLoggedIn  
            ? <Navigate to="/" />
            : <Component {...props} />
    }

    return WrapperComponent;
};