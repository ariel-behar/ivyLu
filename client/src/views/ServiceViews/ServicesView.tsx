import {  useOutletContext } from "react-router-dom";

import { Service } from "../../models/Service";

import ImageList from "@mui/material/ImageList";
import ServiceCard from "../../components/ServiceCard";
import Typography from "@mui/material/Typography";
import uniqid from "uniqid";

function ServicesView() {
    const services = useOutletContext() as Service[];

    return (
        <>
            <div>ServicesView </div>

            <Typography variant="h3" sx={{ color: 'common.white' }}>Services</Typography>
            <ImageList
                cols={1}
                gap={100}
                sx={{
                    overflow: 'hidden'
                }}
            >
                {
                    services.map(service => (
                        <ServiceCard service={service} key={uniqid()} />
                    ))
                }
            </ImageList>
        </>
    )
}

export default ServicesView