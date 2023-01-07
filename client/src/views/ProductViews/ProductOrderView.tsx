import { useState } from 'react';
import { useLoaderData } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext';
import { Product } from '../../models/Product';
import { getMeasurementUnit } from '../../utils/getMeasurementUnit';

import Grid from '@mui/material/Grid';
import ImageListItem from '@mui/material/ImageListItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BackToButton from '../../components/BackToButton';
import { Button } from '@mui/material';
import ConfirmationView from '../ConfirmationView';

function ProductOrderView() {
	const product = useLoaderData() as Product;
	const { user } = useAuthContext() as any;
	const [showConfirmationView, setShowConfirmationView] = useState<boolean>(false)

	const onOrderButtonClick = () => {
		setShowConfirmationView(true)
	}


	return (
		<>
			<div>ProductOrderView</div>
			{
				showConfirmationView
					? <ConfirmationView entity={{ user, product }} entityType='product' />
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

									<Button variant='contained' onClick={onOrderButtonClick}>Order Product</Button>
								</Grid>
							</Grid>
						</Paper>
					</>


			}


		</>
	)
}

export default ProductOrderView