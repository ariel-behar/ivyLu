import { Outlet, NavLink as RouterNavLink } from "react-router-dom"


import Stack from "@mui/material/Stack"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import { useAuthContext } from "../../contexts/AuthContext";
import { isAuthRouteGuard } from "../../hoc/isAuthRouteGuard";

function ManagementView() {
    const { isAdmin } = useAuthContext() as any;

    return (
        <>
            <div>ManagementView</div>

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

                    {
                        isAdmin
                            ? <Link
                                mx={2}
                                underline="hover"
                                to="/management/users"
                                component={RouterNavLink}
                                sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                            >
                                Users
                            </Link>
                            : ''
                    }
                </Breadcrumbs>

            </Stack>

            <Outlet />
        </>
    )
}

export default isAuthRouteGuard(ManagementView)