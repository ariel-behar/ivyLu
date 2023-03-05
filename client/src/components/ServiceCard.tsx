import { motion } from 'framer-motion';

import { Service } from "../models/Service";
import YellowHoverableButton from './Buttons/YellowHoverableButton';

import styled from '@mui/material/styles/styled';

import ImageListItem from '@mui/material/ImageListItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';

const StyledImg = styled(motion.img)`
    width: auto; 
    height: 400px;

    @media (max-width: 1199px){
        height: inherit;
    }

    @media (max-width: 499px){
        height: 130px;
    }

`

const StyledServiceTitleStack = styled(Stack)`
    padding-left: 40px;
    padding-right: 40px;
    width: 150%;
    height: 100%;
    position: absolute;
    top: -89%;
    right: -5%;
    background-color: rgba(30, 30, 30, 0.5);
    transform: rotate(10deg);

    .service-title {
        color: white;
        font-size: 4.75rem;
    }

    @media (max-width: 1199px){
        right: -5%;
        .service-title {
            font-size: 3rem;
        }
    }

    @media (max-width: 899px){
        right: -5%;
        .service-title {
            font-size: 2rem;
        }
    }

    @media (max-width: 499px){
        right: -12%;
        .service-title {
            font-size: 1.5rem;
        }
    }
`

const StyledBottomDetailsStack = styled(Stack)`
    padding-top: 16px;
    padding-bottom: 16px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: rgba(30, 30, 30, 0.5);

    color: white;

    @media (max-width: 899px){
        position: static;
    }
`

interface Props {
    service: Service
}
function ServiceCard({ service }: Props) {

    return (
        <>
            <ImageListItem sx={{ overflow: 'hidden' }}
                component={motion.div}
                whileHover={{
                    scale: 1.02,
                }}
            >
                <StyledImg src={`${service.imgUrl}`} alt={service.title} loading='lazy' />

                <StyledServiceTitleStack direction='row' justifyContent='right' alignItems='end' >
                    <Typography component={"h4"} className='service-title'> {service.title} </Typography>
                </StyledServiceTitleStack>

                <StyledBottomDetailsStack direction='row' justifyContent='space-around' spacing={1} >
                    <Stack direction='column'>
                        <Typography variant="body1">Duration: <b> {service.duration} minutes</b></Typography>
                        <Typography variant="body1">Price: <b>{service.price} BGN</b></Typography>
                    </Stack>

                    <Box component='div' display={{xs: 'block', md: 'none'}} >
                        <YellowHoverableButton entity={service} entityType='service' size='small'> Schedule now </YellowHoverableButton>
                    </Box>

                    <Box component='div' display={{xs: 'none', md: 'block'}} >
                        <YellowHoverableButton entity={service} entityType='service' size='large'> Schedule now </YellowHoverableButton>
                    </Box>
                </StyledBottomDetailsStack>
            </ImageListItem>
        </>
    )
}
export default ServiceCard


