import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import getOrderStatus from '../utils/getOrderStatus'
import { Order } from '../models/Order'

interface ProductOrderConfirmationCardProps {
	confirmationResponse: Order
}

function ProductOrderConfirmationCard({ confirmationResponse }: ProductOrderConfirmationCardProps) {

	console.log(confirmationResponse );

	return (
		<>
			<Box p={2}>
				<Typography variant="h4" width='100%' textAlign='center' ><b>{confirmationResponse.product.title}</b></Typography>
				<Typography variant="body1" textAlign='center'>{confirmationResponse.product.description}</Typography>

				<Box>
					<Typography variant="h6"><u>Order Details:</u></Typography>
					<Stack direction='row' justifyContent='space-between'>
						<Box>
							<Typography variant="body1">Ordered on: <b>{format(parseISO(confirmationResponse.createdAt), 'dd MMMM, yyyy (dd/MM/yyyy)')}</b> at <b>{format(parseISO(confirmationResponse.createdAt), 'HH:mm')}</b></Typography>

			
						</Box>
						<Box>
							<Typography variant="body1">Status: <b> {getOrderStatus(confirmationResponse.status)}</b></Typography>
						
						</Box>
					</Stack>
				</Box>

				<hr />

				<Stack direction='row' justifyContent='space-between'>
					<Box>
						<Typography variant="h6"><u>Client Details:</u></Typography>
						<Typography variant="body1">Name: <b>{confirmationResponse.client.firstName} {confirmationResponse.client.lastName}</b></Typography>
						<Typography variant="body1">Phone Number: <b>{confirmationResponse.client.phone} </b></Typography>
						<Typography variant="body1">Email: <b>{confirmationResponse.client.email}</b></Typography>
					</Box>

					<Box>
						<Typography variant="h6"><u>Product Details:</u></Typography>
						<Typography variant="body1">Title: <b>{confirmationResponse.product.title}</b></Typography>
						<Typography variant="body1">Category: <b>{confirmationResponse.product.productCategory.substring(0, 1).toUpperCase()}{confirmationResponse.product.productCategory.substring(1,)}</b></Typography>
						<Typography variant="body1">Price: <b>{confirmationResponse.product.price} BGN</b></Typography>
					</Box>

				</Stack>

			</Box>
		</>
	)
}

export default ProductOrderConfirmationCard