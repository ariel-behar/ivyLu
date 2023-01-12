import { Navigate } from "react-router-dom";
import React from 'react';
import { useAuthContext } from "../contexts/AuthContext";

export const isOperatorAdminRouteGuard = (Component: React.FunctionComponent<React.PropsWithChildren>) => {

    const WrapperComponent = (props?: React.PropsWithChildren) => {
        const { isOperator, isAdmin } = useAuthContext() as {isOperator:boolean, isAdmin: boolean};

        return (isOperator || isAdmin)
            ? <Component {...props} />
            : <Navigate to="/login" />
    }

    return WrapperComponent;
};