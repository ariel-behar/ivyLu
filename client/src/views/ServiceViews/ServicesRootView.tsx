import Container from "@mui/material/Container";
import { ContextType } from "react";
import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import { Service } from "../../models/Service";

function ServicesRootView() {
	const services = useLoaderData() as Service[];

	return (
		<>
			<Container>
				<div>ServicesRootView</div>

				<Outlet context={services} />
			</Container>
		</>
	)
}

export function useServices() {
	return useOutletContext<ContextType<any>>();
}

export default ServicesRootView