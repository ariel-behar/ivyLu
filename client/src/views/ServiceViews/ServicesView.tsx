import {  useOutletContext } from "react-router-dom";

import { Service } from "../../models/Service";

import ImageList from "@mui/material/ImageList";
import ServiceCard from "../../components/ServiceCard";
import Typography from "@mui/material/Typography";
import uniqid from "uniqid";
import Box from "@mui/material/Box";

function ServicesView() {
    const services = useOutletContext() as Service[];

    return (
        <Box py={3}>
            <div>ServicesView </div>

            <Typography variant="h3" sx={{ color: 'common.white' }}>Services</Typography>
            <ImageList
                cols={1}
                gap={100}
                sx={{
                    overflow: 'hidden',
                    padding: '20px'
                }}
            >
                {
                    services.map(service => (
                        <ServiceCard service={service} key={uniqid()} />
                    ))
                }
            </ImageList>
        </Box>
    )
}

export default ServicesView