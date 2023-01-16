import Container from "@mui/material/Container";
import { ContextType } from "react";
import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import ViewTitlePresenter from "../../components/ViewTitlePresenter";
import { Service } from "../../models/Service";

import hairdresserEquipment from '../../assets/img/hairdresser-equipment.jpg'

function ServicesRootView() {
	const services = useLoaderData() as Service[];

	return (
		<>
			<ViewTitlePresenter image={hairdresserEquipment}> Services </ViewTitlePresenter>

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