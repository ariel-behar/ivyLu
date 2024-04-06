import { Navigate } from "react-router-dom";
import React from 'react';
import { useAuthContext } from "../contexts/AuthContext";

export const isAdminRouteGuard = (Component: React.FunctionComponent<React.PropsWithChildren>) => {

    const WrapperComponent = (props?: React.PropsWithChildren) => {
        const { isAdmin } = useAuthContext() as {isAdmin: boolean};

        return isAdmin  
            ? <Component {...props} />
            : <Navigate to="/login" />
    }

    return WrapperComponent;
};