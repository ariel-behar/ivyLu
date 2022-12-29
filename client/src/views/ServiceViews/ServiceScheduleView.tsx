import { useLoaderData } from "react-router-dom"
import BackToButton from "../../components/BackToButton";
import { ServiceFromDBInterface } from "../../types/serviceTypes"

function ServiceScheduleView() {
	const service = useLoaderData() as ServiceFromDBInterface;

	return (
		<>
			<div>ServiceScheduleView</div>
			<BackToButton whereTo="services" />
			
			<h4>{service._id}</h4>
		</>
	)
}

export default ServiceScheduleView