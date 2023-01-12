import { useState } from 'react';
import { useLoaderData } from 'react-router-dom'

import * as orderServices from '../../services/orderServices'
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext } from '../../contexts/NotificationContext';

import { Product } from '../../models/Product';
import { User } from '../../models/User';
import { Order, OrderCreateDTO } from '../../models/Order';

import { getMeasurementUnit } from '../../utils/getMeasurementUnit';

import ConfirmationView from '../ConfirmationView';
import ConfirmDialog from '../../components/ConfirmDialog';
import BackToButton from '../../components/BackToButton';

import Grid from '@mui/material/Grid';
import ImageListItem from '@mui/material/ImageListItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



function ProductOrderView() {
	const product = useLoaderData() as Product;
	const { user, isClient } = useAuthContext() as {user: User, isClient: boolean};
	const { displayNotification } = useNotificationContext() as any;
	const [showConfirmationView, setShowConfirmationView] = useState<boolean>(false)
	const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false)
	const [ orderedProduct, setOrderedProduct] = useState<Order | null>(null)

	const onOrderButtonClick = () => {
		setShowConfirmationDialog(true)
	}

	const closeConfirmDialog = (): void => {
		setShowConfirmationDialog(false)
	}

	const onConfirmDialogConfirmClick = async () => {
		const order = new OrderCreateDTO(user._id , product._id)

		try {
			let orderResponse = await orderServices.create(order, user.authToken)

			if(orderResponse) {
				displayNotification({message: 'Your order has successfully been submitted'}, 'success')
				setOrderedProduct(orderResponse)
			}

		} catch (err) {
			displayNotification(err, 'error')
		}

		setShowConfirmationDialog(false)
		setShowConfirmationView(true)
	}

	return (
		<>
			<div>ProductOrderView</div>
			{
				showConfirmationView
					? <ConfirmationView entity={orderedProduct} entityType='product' />
					: <>
						<Stack direction='row' justifyContent='right' mb={3}>
							<BackToButton whereTo="products" />
						</Stack>
						<Paper>
							<Grid container>
								<Grid item md={6}>
									<ImageListItem >
										<img
											src={`${product.imgUrl}`}
											alt={product.title}
											loading='lazy'
										/>

									</ImageListItem>
								</Grid>
								<Grid item md={6} sx={{ backgroundColor: "main.beige" }}>

									<Stack direction='row' justifyContent='center' p={2} sx={{ backgroundColor: "main.black", color: "common.white" }}>
										<Typography variant="h4" component='h4'>{product.title}</Typography>
									</Stack>

									<Stack p={2}>
										<Typography variant="h6" component='h6'>
											Category: <b>{product.productCategory.substring(0, 1).toUpperCase()}{product.productCategory.substring(1,)}</b>
										</Typography>

										<Typography variant="h6" component='h6'>Description:  <b>{product.description}</b></Typography>

										<Typography variant="h6" component='h6'>Price: <b>{product.price} BGN</b></Typography>

										<Typography variant="h6" component='h6'>
											Volume: <b> {product.volume} {getMeasurementUnit(product.volumeMeasurementUnit).abbreviated} </b>
										</Typography>
									</Stack>
								
								{ isClient && <Button variant='contained' onClick={onOrderButtonClick}>Order Product</Button>}
								</Grid>
							</Grid>
						</Paper>
					</>
			}

			{
				showConfirmationDialog
					? <ConfirmDialog
						entity={product}
						entityType='product'
						showConfirmationDialog={showConfirmationDialog}
						closeConfirmDialog={closeConfirmDialog}
						onConfirmDialogConfirmClick={onConfirmDialogConfirmClick}
					/>
					: ''
			}

		</>
	)
}

export default ProductOrderView