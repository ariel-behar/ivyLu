import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Product } from "../models/Product"

interface ProductOrderConfirmationCardProps {
	product: Product
}

function ProductOrderConfirmationCard({ product }: ProductOrderConfirmationCardProps) {
	return (
		<>
			<Box p={2}>
				<Typography variant="h4" width='100%' textAlign='center' ><b>{product.title}</b></Typography>
				<Typography variant="body1" textAlign='center'>{product.description}</Typography>

				{/* <Box>
					<Typography variant="h6"><u>Appointment Details:</u></Typography>
					<Stack direction='row' justifyContent='space-between'>
						<Box>
							<Typography variant="body1">Date: <b>{product.appointmentDetails.dayISO} {product.appointmentDetails.monthName}, {product.appointmentDetails.yearISO} ({product.appointmentDetails.dateISO})</b></Typography>
							<Typography variant="body1">Time: <b>{product.appointmentDetails.scheduledHour}</b></Typography>
						</Box>
						<Box>
							<Typography variant="body1">Duration: <b>{product.duration} minutes</b></Typography>
							<Typography variant="body1">Price: <b>{product.price} BGN</b></Typography>
						</Box>
					</Stack>
				</Box>

				<hr />

				<Stack direction='row' justifyContent='space-between'>
					<Box>
						<Typography variant="h6"><u>Client Details:</u></Typography>
						<Typography variant="body1">Name: <b>{product.client.firstName} {product.client.lastName}</b></Typography>
						<Typography variant="body1">Phone Number: <b>{product.client.phone} </b></Typography>
						<Typography variant="body1">Email: <b>{product.client.email}</b></Typography>

					</Box>

					<Box>
						<Typography variant="h6"><u>Hairdresser Details:</u></Typography>
						<Typography variant="body1">Name: <b>{product.hairdresser.firstName} {product.hairdresser.lastName}</b></Typography>
						<Typography variant="body1">Phone Number: <b>{product.hairdresser.phone}</b></Typography>
					</Box>

				</Stack> */}

			</Box>
		</>
	)
}

export default ProductOrderConfirmationCard