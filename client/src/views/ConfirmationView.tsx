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

interface Props {
    entity: IScheduleConfirmationResponse | Order | null
    entityType: 'service' | 'product'
}

function ConfirmationView({ entity, entityType }: Props) {
    return (
        <Container>
            <div>ConfirmationView</div>

            <Container>
                <Stack direction='row' justifyContent='space-between' mb={5}>
                    <BackToButton whereTo={`${entityType}s`} />

                    <GoToDashboardButton />
                </Stack>
                <Stack >
                    {entityType === 'service'
                        && <Typography variant="h4" textAlign='center'>You have successfully made your appointment!</Typography>}

                    {entityType === 'product'
                        && <Typography variant="h4" textAlign='center'>You have successfully ordererd your product!</Typography>}


                    <Stack direction='row' justifyContent='space-between' mt={5} mb={1}>
                        <Typography variant="h6">Here are the confirmation details:</Typography>
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
    )
}

export default ConfirmationView