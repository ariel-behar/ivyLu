import { Outlet, NavLink as RouterNavLink, useLocation, useNavigate } from "react-router-dom"

import { useAuthContext } from "../../contexts/AuthContext";
import { isAuthRouteGuard } from "../../hoc/isAuthRouteGuard";

import Stack from "@mui/material/Stack"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import Container from "@mui/material/Container";
import { useEffect } from "react";


function ManagementRootView() {
    const { isAdmin } = useAuthContext() as { isAdmin: boolean };
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/management') {

            navigate('/management/orders')
        }
    }, [])

    return (
        <Container>
            <div>ManagementRootView</div>

            <Stack direction='row' justifyContent='center'>
                <Breadcrumbs
                    aria-label="breadcrumb"
                >
                    <Link
                        mx={2}
                        underline="hover"
                        to="/management/orders"
                        component={RouterNavLink}
                        sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                    >
                        Orders
                    </Link>
                    <Link
                        mx={2}
                        underline="hover"
                        to="/management/schedule"
                        component={RouterNavLink}
                        sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                    >
                        Schedule
                    </Link>
                    <Link
                        mx={2}
                        underline="hover"
                        to="/management/services"
                        component={RouterNavLink}
                        sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                    >
                        Services
                    </Link>
                    <Link
                        mx={2}
                        underline="hover"
                        to="/management/products"
                        component={RouterNavLink}
                        sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                    >
                        Products
                    </Link>

                    {isAdmin &&
                        <Link
                            mx={2}
                            underline="hover"
                            to="/management/clients"
                            component={RouterNavLink}
                            sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                        >
                            Clients
                        </Link>
                    }

                    {isAdmin &&
                        <Link
                            mx={2}
                            underline="hover"
                            to="/management/staff"
                            component={RouterNavLink}
                            sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                        >
                            Staff
                        </Link>
                    }

                </Breadcrumbs>

            </Stack>

            <Outlet />
        </Container>
    )
}

export default isAuthRouteGuard(ManagementRootView)