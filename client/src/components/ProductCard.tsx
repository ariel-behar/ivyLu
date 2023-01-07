import { Link as RouterLink } from 'react-router-dom'

import { Product } from '../models/Product';
import { useAuthContext } from '../contexts/AuthContext';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { getMeasurementUnit } from '../utils/getMeasurementUnit';

interface ProductCardProps {
	product: Product,
}

export default function ProductCard({
	product,
}: ProductCardProps) {
	const { isLoggedIn } = useAuthContext() as any;

	return (
		<Card elevation={3} sx={{ maxWidth: '345', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
			<CardMedia
				sx={{ height: 200, borderBottom: '1px solid lightgrey' }}
				image={product.imgUrl}
				title={product.title}
			/>

			<CardContent sx={{flexGrow: 1 }}>
				<Typography gutterBottom variant="h5" component="div">
					{product.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.productCategory.substring(0,1).toUpperCase()}{product.productCategory.substring(1,)}
				</Typography>
			</CardContent>


			<CardActions sx={{backgroundColor: 'main.black'}}>
				<Stack direction='row' justifyContent='space-between' width='100%' px={1}>
					<Button
						variant="contained"
						to={isLoggedIn ? `/products/${product._id}/order` : `/login`}
						component={RouterLink}
					>
						Order
					</Button>

					<Stack direction='column'>
						<Typography variant="body1" sx={{color: 'common.white'}}>Volume: <b> {product.volume} {getMeasurementUnit(product.volumeMeasurementUnit).abbreviated} </b></Typography>
						<Typography variant="body1" sx={{color: 'common.white'}}>Price: <b>{product.price} BGN</b></Typography>
					</Stack>
				</Stack>
			</CardActions>
		</Card>
	);
}
