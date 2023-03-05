import { motion } from "framer-motion"

import { Product } from '../models/Product';
import YellowHoverableButton from "./Buttons/YellowHoverableButton";
import { getMeasurementUnit } from '../utils/getMeasurementUnit';

import styled from "@mui/material/styles/styled";

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


const StyledProductCardStack = styled(Stack)`
	max-width: 345px;
	min-height: 400px;
	border-bottom: 1px dashed lightgrey;
	border-left: 1px dashed lightgrey;
	padding: 10px;
	background-color: rgba(44, 44, 44,0.3);
	border-bottom-left-radius: 20px;
	border-top-right-radius: 20px;
	margin: 24px;

	color: white;

	.product-card-title {
		font-size: 4.75rem;
		position: absolute;
		bottom: -100px;
		left: -30px;
		z-index: 1;
		transform-origin: top left;
		transform: rotate(-85deg);
		color: ${(({theme}) => theme.palette.secondary.main)}
	}

	.product-card-image {
		height: 400px;
		z-index: 2;
		position: relative;
		left: 10px;
	}

	@media (max-width: 899px){

		.product-card-title {
			font-size: 3rem;
			bottom: -70px;
			left: -10px;
		}

		.product-card-image {
			height:250px;
			left: 50%;
			transform: translateX(-50%);
		}
	}
`
interface Props {
	product: Product,
}

export default function ProductCard({
	product,
}: Props) {


	return (
		<Box component={motion.div} whileHover={{ scale: 1.03}}>

			<StyledProductCardStack direction='column'>
				<Box sx={{ position: 'relative' }}>
					<Typography component={"h4"} className="product-card-title" >
						{product.productCategory.substring(0, 1).toUpperCase()}{product.productCategory.substring(1,)}
					</Typography>

					<img className="product-card-image" src={product.imgUrl} alt={product.title} />
				</Box>

				<Box >
					<hr />

					<Stack direction='column' justifyContent='center' alignItems='center' sx={{ height: '65px' }}>
						<Typography textAlign='center' variant="h5" component="div" >{product.title}</Typography>
					</Stack>

					<hr />

					<Stack direction='row' justifyContent='space-between' width='100%' px={1} my={3}>
						<Stack direction='column'>
							<Typography variant="body1" >Volume: <b> {product.volume} {getMeasurementUnit(product.volumeMeasurementUnit).abbreviated} </b></Typography>
							<Typography variant="body1" >Price: <b>{product.price} BGN</b></Typography>
						</Stack>

						<YellowHoverableButton entity={product} entityType='product'>Order now</YellowHoverableButton>
					</Stack>
				</Box>
			</StyledProductCardStack>
		</Box>
	);
}
