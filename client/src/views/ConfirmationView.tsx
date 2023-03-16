import { Order } from "../models/Order"

import { IScheduleConfirmationResponse } from "../types/scheduleTypes"

import BackToButton from "../components/Buttons/BackToButton"
import GoToDashboardButton from "../components/Buttons/GoToDashboardButton"
import ProductOrderConfirmationCard from "../components/ProductOrderConfirmationCard"
import ServiceAppointmentConfirmationCard from "../components/ServiceAppointmentConfirmationCard"

import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

interface Props {
    entity: IScheduleConfirmationResponse | Order | null
    entityType: 'service' | 'product'
}

function ConfirmationView({ entity, entityType }: Props) {
    return (

        <Box py={3}>
            {/* <div>ConfirmationView</div> */}
            <Container>


                <Container>
                    <Stack direction='row' justifyContent='space-between' mb={5}>
                        <BackToButton whereTo={`${entityType}s`} />

                        <GoToDashboardButton />
                    </Stack>

                    <Stack mt={10}>
                        <Typography
                            variant="h4"
                            textAlign='center'
                            color='main.yellow.dark'
                        >
                            You have successfully {entityType === 'product' ? 'ordererd your product!' : ''}{entityType === 'service' ? 'scheduled your appointment!' : ''}
                        </Typography>


                        <Stack direction='row' justifyContent='space-between' mt={5} mb={1}>
                            <Typography
                                variant="h6"
                                color='common.white'
                            >
                                Here are the confirmation details. You will also be able to review them in the {entityType === 'product' ? '"My Orders"' : ''}{entityType === 'service' ? '"My Appointments"' : ''} section of your dashboard page:
                            </Typography>
                            
                        </Stack>

                        <Paper elevation={5} >
                            {entityType === 'service'
                                && <ServiceAppointmentConfirmationCard confirmationResponse={entity as IScheduleConfirmationResponse} />}

                            {entityType === 'product'
                                && <ProductOrderConfirmationCard confirmationResponse={(entity as Order)} />}
                        </Paper>
                    </Stack>
                </Container>
            </Container>
        </Box>
    )
}

export default ConfirmationView