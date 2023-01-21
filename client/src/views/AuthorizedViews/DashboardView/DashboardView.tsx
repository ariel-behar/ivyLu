import { useState } from "react";
import { NavLink as RouterNavLink, Outlet } from "react-router-dom";

import { isAuthRouteGuard } from "../../../hoc/isAuthRouteGuard";

import lightPattern from '../../../assets/img/light-background-pattern.jpg'

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";


function DashboardView() {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box py={3} sx={{ flexGrow: 1, background: `url('${lightPattern}')` }}>
			<Container>
				<div>DashboardView</div>

				<Box sx={{ width: '100%' }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs
							TabIndicatorProps={{ style: { backgroundColor: "#2c2c2c" } }}
							value={value}
							onChange={handleChange}
							sx={{ '& a.Mui-selected ': { color: 'main.black' }, backgroundColor: 'main.beige' }}
						>
							<Tab label="My Orders" value={0} component={RouterNavLink} to='/dashboard/orders' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />
							<Tab label="My Appointments" value={1} component={RouterNavLink} to='/dashboard/appointments' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />
							<Tab label="Profile" value={2} component={RouterNavLink} to='/dashboard/profile' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />
						</Tabs>
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

