import { IScheduleConfirmationResponse } from "../types/scheduleTypes"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

interface Props {
	confirmationResponse: IScheduleConfirmationResponse
}

function ServiceAppointmentConfirmationCard({ confirmationResponse }: Props) {
	return (
		<>
			<Box p={2}>
				<Typography variant="h4" width='100%' textAlign='center' ><b>{confirmationResponse.service.title}</b></Typography>
				<Typography variant="body1" textAlign='center'>{confirmationResponse.service.description}</Typography>

				<Box>
					<Typography variant="h6"><u>Appointment Details:</u></Typography>
					<Stack direction='row' justifyContent='space-between'>
						<Box>
							<Typography variant="body1">Date: <b>{confirmationResponse.appointmentDetails?.dayISO} {confirmationResponse.appointmentDetails?.monthName}, {confirmationResponse.appointmentDetails?.yearISO} ({confirmationResponse.appointmentDetails?.dateISO})</b></Typography>
							<Typography variant="body1">Time: <b>{confirmationResponse.appointmentDetails?.scheduledHour}</b></Typography>
						</Box>
						<Box>
							<Typography variant="body1">Duration: <b>{confirmationResponse.service.duration} minutes</b></Typography>
							<Typography variant="body1">Price: <b>{confirmationResponse.service.price} BGN</b></Typography>
						</Box>
					</Stack>
				</Box>

				<hr />

				<Stack direction='row' justifyContent='space-between'>
					<Box>
						<Typography variant="h6"><u>Client Details:</u></Typography>
						<Typography variant="body1">Name: <b>{confirmationResponse.client.firstName} {confirmationResponse.client.lastName}</b></Typography>
						<Typography variant="body1">Phone Number: <b>{confirmationResponse.client.phone} </b></Typography>
						{/* <Typography variant="body1">Email: <b>{service.client.email}</b></Typography> */}

					</Box>

					<Box>
						<Typography variant="h6"><u>Hairdresser Details:</u></Typography>
						<Typography variant="body1">Name: <b>{confirmationResponse.hairdresser.firstName} {confirmationResponse.hairdresser.lastName}</b></Typography>
						<Typography variant="body1">Phone Number: <b>{confirmationResponse.hairdresser.phone}</b></Typography>
					</Box>

				</Stack>

			</Box>
		</>
	)
}

export default ServiceAppointmentConfirmationCard