import { useLoaderData } from "react-router-dom"
import { Service } from "../../models/Service";

import BackToButton from "../../components/BackToButton";
import ServiceDetailsCard from "../AuthorizedViews/ServicesViews/ServiceDetailsCard";

function ServiceDetailsView() {
    const {service} = useLoaderData() as {service: Service};

    return (
        <>
            <div>ServiceDetailsView</div>
            <BackToButton whereTo="services" />

            <ServiceDetailsCard service={service} />
        </>
    )
}

export default ServiceDetailsView