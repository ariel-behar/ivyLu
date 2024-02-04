import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

function LogoutView() {
    const navigate = useNavigate();
    const { logout } = useAuthContext() as any;

    useEffect(() => {
        logout();
        navigate('/');

    });

    return null;
}

export default LogoutView;
