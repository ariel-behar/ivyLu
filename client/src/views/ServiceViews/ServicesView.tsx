import {  useOutletContext } from "react-router-dom";

import { Service } from "../../models/Service";

import ImageList from "@mui/material/ImageList";
import ServiceCard from "./ServiceCard";

function ServicesView() {
    const services = useOutletContext() as Service[];

    return (
        <>
            <div>ServicesView </div>
            <ImageList
                // sx={{ width: 500, height: 450 }}
                cols={3}
                // rowHeight={164}
                gap={10}
            >
                {
                    services.map(service => (
                        <ServiceCard service={service} />
                    ))
                }
            </ImageList>
        </>
    )
}

export default ServicesView