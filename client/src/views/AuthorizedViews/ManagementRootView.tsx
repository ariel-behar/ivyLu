import { Outlet, NavLink as RouterNavLink } from "react-router-dom"

import { useAuthContext } from "../../contexts/AuthContext";
import { isAuthRouteGuard } from "../../hoc/isAuthRouteGuard";

import Stack from "@mui/material/Stack"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"


function ManagementRootView() {
    const { isAdmin } = useAuthContext() as {isAdmin: boolean};

    return (
        <>
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

                    {isAdmin
                        ? <Link
                            mx={2}
                            underline="hover"
                            to="/management/clients"
                            component={RouterNavLink}
                            sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                        >
                            Clients
                        </Link>
                        : ''
                    }
                    {isAdmin
                        ? <Link
                            mx={2}
                            underline="hover"
                            to="/management/staff"
                            component={RouterNavLink}
                            sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                        >
                            Staff
                        </Link>
                        : ''
                    }

                </Breadcrumbs>

            </Stack>

            <Outlet />
        </>
    )
}

export default isAuthRouteGuard(ManagementRootView)