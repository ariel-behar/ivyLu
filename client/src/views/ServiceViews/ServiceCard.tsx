import { Link as RouterLink } from "react-router-dom";
import uniqid from 'uniqid'

import { useAuthContext } from '../../contexts/AuthContext'

import { Service } from '../../models/Service'

import Button from '@mui/material/Button'
import ImageListItem from '@mui/material/ImageListItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface Props {
    service: Service
}

function ServiceCard({service}: Props) {
    const { isLoggedIn } = useAuthContext() as {isLoggedIn: boolean};
    return (
        <ImageListItem key={uniqid()}>
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
                width='100%'
                position='absolute'
                bottom='0'
                sx={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)'
                }}
            >
                <Button variant="contained" to={isLoggedIn ? `/services/${service._id}/schedule` : `/login`} component={RouterLink}>Schedule</Button>

                <Stack direction='column'>
                    <Typography variant="body1" sx={{ color: 'common.white' }}>Duration: <b> {service.duration} minutes</b></Typography>
                    <Typography variant="body1" sx={{ color: 'common.white' }}>Price: <b>{service.price} BGN</b></Typography>

                </Stack>
            </Stack>
        </ImageListItem>
    )
}

export default ServiceCard