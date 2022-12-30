import { useLoaderData } from "react-router-dom"
import BackToButton from "../../components/BackToButton";
import { Service } from "../../models/Service";

function ServiceScheduleView() {
	const service = useLoaderData() as Service;

	return (
		<>
			<div>ServiceScheduleView</div>
			<BackToButton whereTo="services" />
			
			<h4>{service._id}</h4>
		</>
	)
}

export default ServiceScheduleView