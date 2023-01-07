import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import BackToButton from "../components/BackToButton"
import GoToDashboardButton from "../components/GoToDashboardButton"
import ServiceAppointmentConfirmationCard from "../components/ServiceAppointmentConfirmationCard"
import { ScheduledItemConfirmationResponseInterface } from "../types/common/scheduleTypes"

interface ConfirmationViewProps {
    entity?: ScheduledItemConfirmationResponseInterface
    entityType?: 'service' | 'product'
}

function ConfirmationView({ entity, entityType }: ConfirmationViewProps) {
    return (
        <>
            <div>ConfirmationView</div>
            <Container>
                <Stack direction='row' justifyContent='space-between' mb={5}>
                    <BackToButton whereTo="services" />

                    <GoToDashboardButton />
                </Stack>
                <Stack >
                    {entityType === 'service' 
                    && <Typography variant="h4" textAlign='center'>You have successfully made your appointment!</Typography> }

                    {entityType === 'product' 
                    && <Typography variant="body1">You have successfully ordererd your product!</Typography>}
                        

                    <Stack direction='row' justifyContent='space-between' mt={5} mb={1}>
                        <Typography variant="h6">Here are the confirmation details:</Typography>
                    </Stack>

                    <Paper elevation={5} >
                        { entityType === 'service' 
                        && <ServiceAppointmentConfirmationCard service={entity as ScheduledItemConfirmationResponseInterface} /> }
                    </Paper>
                </Stack>
            </Container>
        </>
    )
}

export default ConfirmationView