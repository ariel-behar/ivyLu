import uniqid from 'uniqid'
import ImageListItem from '@mui/material/ImageListItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Service } from "../models/Service";
import YellowHoverableButton from "./Buttons/YellowHoverableButton";

interface Props {
    service: Service
}
function ServiceCard({ service }: Props) {

    return (
        <ImageListItem key={uniqid()} sx={{ overflow: 'hidden' }}>
            <img style={{ width: 'auto', height: '400px' }}
                src={`${service.imgUrl}`}
                alt={service.title}
                loading='lazy'
            />
            <Stack
                direction='row'
                justifyContent='right'
                alignItems='end'
                px={5}
                width='150%'
                height='100%'
                position='absolute'
                top='-89%'
                right='-5%'
                sx={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    transform: "rotate(10deg)"
                }}
            >
                <Typography
                    component={"h4"}
                    color="common.white"
                    sx={{
                        fontSize: '4.75rem',
                    }}
                >
                    {service.title}
                </Typography>
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

                <Stack direction='column'>
                    <Typography variant="body1" sx={{ color: 'common.white' }}>Duration: <b> {service.duration} minutes</b></Typography>
                    <Typography variant="body1" sx={{ color: 'common.white' }}>Price: <b>{service.price} BGN</b></Typography>
                </Stack>

                <YellowHoverableButton entity={service} entityType='service' text='Schedule now' />
            </Stack>
        </ImageListItem>
    )
}
export default ServiceCard


