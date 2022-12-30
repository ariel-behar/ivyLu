import uniqid from "uniqid";
import { Link as RouterLink, useLoaderData } from "react-router-dom";

import { Service } from "../../models/Service";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function ServicesGuestCustomerView() {
    const services = useLoaderData() as Service[];

    return (
        <>
            <div>ServicesGuestCustomerView</div>
            <ImageList
                // sx={{ width: 500, height: 450 }}
                cols={3}
                // rowHeight={164}
                gap={10}
            >
                {
                    services.map(service => (
                        <RouterLink to={`/services/${service._id}/details`} key={uniqid()}>
                            <ImageListItem >
                                <img style={{ width: 'auto', height: '400px' }}
                                    src={`${service.imgUrl}`}
                                    alt={service.title}
                                    loading='lazy'
                                />
                                <Stack
                                    direction='row'
                                    justifyContent='center'
                                    py={2}
                                    px={1}
                                    width='100%'
                                    position='absolute'
                                    top='0'
                                    sx={{
                                        backgroundColor: 'rgba(30, 30, 30, 0.5)'
                                    }}
                                >
                                    <Typography variant="h6" color='white' component='h6'>{service.title}</Typography>
                                </Stack>

                                <Stack
                                    direction='row'
                                    justifyContent='space-around'
                                    spacing={1}
                                    py={2}
                                    px={1}
                                    width='100%'
                                    position='absolute'
                                    bottom='0'
                                    sx={{
                                        backgroundColor: 'rgba(30, 30, 30, 0.5)'
                                    }}
                                >
                                    <Button variant="contained" to={`/services/${service._id}/schedule`} component={RouterLink}>Schedule</Button>
                                    <Button variant="contained" to={`/services/${service._id}/details`} component={RouterLink}>Details</Button>
                                </Stack>
                            </ImageListItem>

                        </RouterLink>
                    ))
                }
            </ImageList>
        </>
    )
}

export default ServicesGuestCustomerView