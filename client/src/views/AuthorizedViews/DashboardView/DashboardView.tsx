import { useState } from "react";
import { NavLink as RouterNavLink, Outlet, useLocation } from "react-router-dom";

import { isAuthRouteGuard } from "../../../hoc/isAuthRouteGuard";

import styled from "@mui/material/styles/styled";

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

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


function DashboardView() {
	const location = useLocation()
	const [value, setValue] = useState(getTabValue(location.pathname));

	function getTabValue(path: string){
		if(path === '/dashboard'){
			return 0;
		} else if(path === '/dashboard/orders'){
			return 0;
		}else if(path === '/dashboard/appointments'){
			return 1;
		}else if(path === '/dashboard/profile'){
			return 2;
		}
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box py={3} sx={{ flexGrow: 1, background: "url('https://ivy-lu.s3.eu-central-1.amazonaws.com/patterns/light-background-pattern.jpg')" }}>
			<Container>
				<div>DashboardView</div>

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
							<Tab className="tab" label="My Orders" value={0} component={RouterNavLink} to='/dashboard/orders' />
							<Tab className="tab" label="My Appointments" value={1} component={RouterNavLink} to='/dashboard/appointments' />
							<Tab className="tab" label="Profile" value={2} component={RouterNavLink} to='/dashboard/profile' />
						</StyledTabs>
					</Box>
				</Box>

				<Box sx={{ p: 3 }}>
					<Outlet />
				</Box>

			</Container>
		</Box>
	)
}

export default isAuthRouteGuard(DashboardView)

