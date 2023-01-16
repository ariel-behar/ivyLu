import { useOutletContext } from "react-router-dom";

import { Service } from "../../models/Service";

import ImageList from "@mui/material/ImageList";
import ServiceCard from "../../components/ServiceCard";
import Typography from "@mui/material/Typography";
import uniqid from "uniqid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function ServicesView() {
    const services = useOutletContext() as Service[];

    return (
        <Box py={3}>

            <Stack direction='row' alignItems='center' sx={{ overflow: 'hidden' }}>
                <Typography variant="h3" sx={{ color: 'common.white', marginRight: '30px' }}>Services</Typography>
                <hr style={{ width: '100%', height: '2px' }} />
            </Stack>

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