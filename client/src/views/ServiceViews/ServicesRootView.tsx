import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

function ServicesRootView() {

	return (
		<Container>
			<div>ServicesRootView</div>

			<Outlet />

		</Container>
	)
}

export default ServicesRootView