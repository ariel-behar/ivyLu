import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { ScheduledItemConfirmationResponseInterface } from "../types/common/scheduleTypes"

interface ServiceAppointmentConfirmationCardProps {
	service: ScheduledItemConfirmationResponseInterface
}

function ServiceAppointmentConfirmationCard({ service }: ServiceAppointmentConfirmationCardProps) {
	return (
		<>
			<Box p={2}>
				<Typography variant="h4" width='100%' textAlign='center' ><b>{service.service.title}</b></Typography>
				<Typography variant="body1" textAlign='center'>{service.service.description}</Typography>

				<Box>
					<Typography variant="h6"><u>Appointment Details:</u></Typography>
					<Stack direction='row' justifyContent='space-between'>
						<Box>
							<Typography variant="body1">Date: <b>{service.appointmentDetails.day} {service.appointmentDetails.monthName}, {service.appointmentDetails.year} ({service.appointmentDetails.dateISO})</b></Typography>
							<Typography variant="body1">Time: <b>{service.appointmentDetails.hour}</b></Typography>

						</Box>
						<Box>

							<Typography variant="body1">Duration: <b>{service.service.duration} hrs</b></Typography>
							<Typography variant="body1">Price: <b>{service.service.price} BGN</b></Typography>
						</Box>
					</Stack>
				</Box>

				<hr />

				<Stack direction='row' justifyContent='space-between'>
					<Box>
						<Typography variant="h6"><u>Client Details:</u></Typography>
						<Typography variant="body1">Name: <b>{service.client.firstName} {service.client.lastName}</b></Typography>
						<Typography variant="body1">Phone Number: <b>{service.client.phone} </b></Typography>
						{/* <Typography variant="body1">Email: <b>{service.client.email}</b></Typography> */}

					</Box>

					<Box>
						<Typography variant="h6"><u>Hairdresser Details:</u></Typography>
						<Typography variant="body1">Name: <b>{service.hairdresser.firstName} {service.hairdresser.lastName}</b></Typography>
						<Typography variant="body1">Phone Number: <b>{service.hairdresser.phone}</b></Typography>
					</Box>

				</Stack>

			</Box>
		</>
	)
}

export default ServiceAppointmentConfirmationCard