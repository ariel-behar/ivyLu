import { useState } from "react";

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { isAuthRouteGuard } from "../../../hoc/isAuthRouteGuard";
import { NavLink as RouterNavLink, Outlet } from "react-router-dom";

function DashboardView() {

	return (
		<Container>
			<div>DashboardView</div>

			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs aria-label="basic tabs example">
						<Tab label="Profile" component={RouterNavLink} to='/dashboard/profile' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />
						<Tab label="Orders" component={RouterNavLink} to='/dashboard/orders' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />
						<Tab label="Appointments" component={RouterNavLink} to='/dashboard/appointments' sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} />
					</Tabs>
				</Box>
			</Box>

			<Box sx={{ p: 3 }}>
				<Outlet />
			</Box>

		</Container>
	)
}

export default isAuthRouteGuard(DashboardView)

