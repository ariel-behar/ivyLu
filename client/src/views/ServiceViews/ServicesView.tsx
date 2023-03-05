import { useOutletContext } from "react-router-dom";
import uniqid from "uniqid";

import { Service } from "../../models/Service";
import ServiceCard from "../../components/ServiceCard";

import ImageList from "@mui/material/ImageList";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function ServicesView() {
    const services = useOutletContext() as Service[];

    return (
        <Box py={3}>
            <div>ServiceView</div>

            <Stack direction='row' alignItems='center' sx={{ overflow: 'hidden' }}>
                <Typography variant="h3" sx={{ color: 'common.white', marginRight: '30px' }}>Services</Typography>
                <hr style={{ width: '100%', height: '2px' }} />
            </Stack>

            <ImageList
                cols={1}
                sx={{
                    overflow: 'hidden',
                    padding: '20px',
                    gap: {xs: '50px!important', md: '100px!important'}
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