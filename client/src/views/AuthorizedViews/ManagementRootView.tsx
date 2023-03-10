import { useState } from "react";
import { Outlet, NavLink as RouterNavLink } from "react-router-dom"

import { useAuthContext } from "../../contexts/AuthContext";
import { isAuthRouteGuard } from "../../hoc/isAuthRouteGuard";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "@mui/material/styles/styled";

const StyledTabs = styled(Tabs)`
	background-color: ${({theme}) => theme.palette.main.beige};

	& a.Mui-selected { 
		color: ${({theme}) => theme.palette.main.black};
	}

	.tab {
		&.active { 
			font-weight: bold 
		}
	}
`

function ManagementRootView() {
    const { isAdmin } = useAuthContext() as { isAdmin: boolean };
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box py={3} sx={{ flexGrow: 1, background: "url('https://ivy-lu.s3.eu-central-1.amazonaws.com/patterns/light-background-pattern.jpg')" }}>
            <Container>
                <div>ManagementRootView</div>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <StyledTabs
                            TabIndicatorProps={{ style: { backgroundColor: "#2c2c2c" } }}
                            value={value}
                            onChange={handleChange}
							variant="scrollable"
							scrollButtons
							allowScrollButtonsMobile
                        >
                            <Tab className="tab" label="Orders" value={0} component={RouterNavLink} to='/management/orders' />
                            <Tab className="tab" label="Schedule" value={1} component={RouterNavLink} to='/management/schedule' />
                            <Tab className="tab" label="Services" value={2} component={RouterNavLink} to='/management/services' />
                            <Tab className="tab" label="Products" value={3} component={RouterNavLink} to='/management/products' />

                            {isAdmin && <Tab className="tab" label="Clients" value={4} component={RouterNavLink} to='/management/clients' />}
                            {isAdmin && <Tab className="tab" label="Staff" value={5} component={RouterNavLink} to='/management/staff' />}


                        </StyledTabs>
                    </Box>
                </Box>


                <Outlet />

            </Container>
        </Box>
    )
}

export default isAuthRouteGuard(ManagementRootView)