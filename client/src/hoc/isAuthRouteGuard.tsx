import { Navigate } from "react-router-dom";
import React from 'react';
import { useAuthContext } from "../contexts/AuthContext";

export const isAuthRouteGuard = (Component: React.FunctionComponent<React.PropsWithChildren>) => {

    const WrapperComponent = (props?: React.PropsWithChildren) => {
        const { isLoggedIn } = useAuthContext() as { isLoggedIn: boolean};

        return isLoggedIn  
            ? <Component {...props} />
            : <Navigate to="/login" />
    }

    return WrapperComponent;
};