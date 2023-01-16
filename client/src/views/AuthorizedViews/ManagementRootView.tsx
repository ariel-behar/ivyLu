import { useEffect, useState } from "react";
import { Outlet, NavLink as RouterNavLink, useLocation, useNavigate } from "react-router-dom"

import { useAuthContext } from "../../contexts/AuthContext";
import { isAuthRouteGuard } from "../../hoc/isAuthRouteGuard";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


function ManagementRootView() {
    const { isAdmin } = useAuthContext() as { isAdmin: boolean };
    const [value, setValue] = useState(0);
    const location = useLocation();
    const navigate = useNavigate()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (location.pathname === '/management') {

            navigate('/management/orders')
        }
    }, [])

    return (
        <Box py={3} sx={{flexGrow: 1, backgroundColor: 'common.white'}}>
            <Container>
                <div>ManagementRootView</div>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Orders" value={0} component={RouterNavLink} to='/management/orders' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />
                            <Tab label="Schedule" value={1} component={RouterNavLink} to='/management/schedule' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />
                            <Tab label="Services" value={2} component={RouterNavLink} to='/management/services' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />
                            <Tab label="Products" value={3} component={RouterNavLink} to='/management/products' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />

                            {isAdmin && <Tab label="Clients" value={4} component={RouterNavLink} to='/management/clients' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />}
                            {isAdmin && <Tab label="Staff" value={5} component={RouterNavLink} to='/management/staff' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />}


                        </Tabs>
                    </Box>
                </Box>


                <Outlet />

            </Container>
        </Box>
    )
}

export default isAuthRouteGuard(ManagementRootView)