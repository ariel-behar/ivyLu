import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import BackToButton from "../components/BackToButton"
import GoToDashboardButton from "../components/GoToDashboardButton"
import ProductOrderConfirmationCard from "../components/ProductOrderConfirmationCard"
import ServiceAppointmentConfirmationCard from "../components/ServiceAppointmentConfirmationCard"
import { Product } from "../models/Product"
import { User } from "../models/User"
import { ScheduleConfirmationResponseInterface } from "../types/common/scheduleTypes"

interface ConfirmationViewProps {
    entity: ScheduleConfirmationResponseInterface | { user: User, product: Product }
    entityType: 'service' | 'product'
}

function ConfirmationView({ entity, entityType }: ConfirmationViewProps) {
    return (
        <>
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
                            && <ServiceAppointmentConfirmationCard service={entity as ScheduleConfirmationResponseInterface} />}

                        {entityType === 'product'
                            && <ProductOrderConfirmationCard product={(entity as { user: User, product: Product }).product} />}
                    </Paper>
                </Stack>
            </Container>
        </>
    )
}

export default ConfirmationView