import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
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

                <Stack spacing={4} mb={3}>
                    {
                        entityType === 'service'
                        && <Typography variant="h4" textAlign='center'>You have successfully made your appointment!</Typography>
                    }

                    {
                        entityType === 'product'
                        && <Typography variant="body1">You have successfully ordererd your product!</Typography>
                    }

                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant="h6">Here are the confirmation details:</Typography>
                        <GoToDashboardButton />
                    </Stack>

                    <Paper elevation={5} sx={{marginTop: '0!important'}}>
                        {
                            entityType === 'service'
                            && <ServiceAppointmentConfirmationCard service={entity as ScheduledItemConfirmationResponseInterface} />
                        }
                    </Paper>
                </Stack>


            </Container>
        </>
    )
}

export default ConfirmationView