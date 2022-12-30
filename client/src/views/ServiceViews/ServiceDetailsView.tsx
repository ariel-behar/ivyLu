import { useLoaderData, Link as RouterLink } from "react-router-dom"

import { Service } from "../../models/Service";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import BackToButton from "../../components/BackToButton";
import { Paper } from "@mui/material";



function ServiceDetailsView() {
    const service = useLoaderData() as Service;

    return (
        <>
            <div>ServiceDetailsView</div>
            <BackToButton whereTo="services" />

            <Paper sx={{padding: '20px'}} style={{ background: '#f5f4ef' }}>
                <Grid container spacing={3}>
                    <Grid item lg={9} >

                        <Stack direction='column' justifyContent='space-between' height='100%'>
                            <Stack direction='column' justifyContent='space-between'>
                                <Typography variant="h3" component='h3'>{service.title}</Typography>
                                <Typography variant="h5" component='h5'>Duration: {service.duration} hours</Typography>
                            </Stack>
                            <Typography variant="body1">{service.description}</Typography>


                            <Stack>
                                <Typography variant="h5" component='h5'>Price: {service.price} BGN</Typography>
                                <Typography variant="h4" color='error'>Available to schedule on............................</Typography>

                                <Button variant="contained" to={`/services/${service._id}/schedule`} component={RouterLink}>Schedule</Button>
                            </Stack>
                        </Stack>

                    </Grid>

                    <Grid item lg={3}>
                        <img src={service.imgUrl} alt={`${service.title}`} style={{ width: 'auto', height: '400px' }} />
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default ServiceDetailsView