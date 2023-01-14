import { Link as RouterLink } from 'react-router-dom'
import { motion } from "framer-motion"

import { Product } from '../models/Product';
import { getMeasurementUnit } from '../utils/getMeasurementUnit';
import { useAuthContext } from '../contexts/AuthContext';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useState } from 'react';

interface Props {
	product: Product,
}

export default function ProductCard({
	product,
}: Props) {
	const { isLoggedIn } = useAuthContext() as { isLoggedIn: boolean };
	const [hovered, setHovered ] = useState<boolean>(false);

	return (
		<Stack
			m={3}
			sx={{
				maxWidth: '345',
				minHeight: '400px',
				display: 'flex',
				flexDirection: 'column',
				borderBottom: '1px dashed lightgrey',
				borderLeft: '1px dashed lightgrey',
				paddingLeft: '10px',
				paddingBottom: '10px'
			}}
		>
			<Box sx={{ position: 'relative' }}>
				<Typography
					component={"h4"}
					color="secondary"
					sx={{
						fontSize: '4.75rem',
						position: 'absolute',
						bottom: -100,
						left: -30,
						zIndex: 1,
						transformOrigin: "top left",
						transform: "rotate(-85deg)"
					}}
				>
					{product.productCategory.substring(0, 1).toUpperCase()}{product.productCategory.substring(1,)}
				</Typography>

				<motion.img
				
					style={{
						height: '400px',
						zIndex: 2,
						position: 'relative',
						left: '10px'
					}}
					src={product.imgUrl}
					alt={product.title}
				/>
			</Box>

			<Box >
				<hr />
				<Stack direction='column' justifyContent='center' alignItems='center' sx={{ height: '65px' }}>
					<Typography textAlign='center' variant="h5" component="div" sx={{ color: 'common.white' }}>
						{product.title}
					</Typography>
				</Stack>
				<hr />

				<Stack direction='row' justifyContent='space-between' width='100%' px={1} my={3}>
					<Stack direction='column'>
						<Typography variant="body1" sx={{ color: 'common.white' }}>Volume: <b> {product.volume} {getMeasurementUnit(product.volumeMeasurementUnit).abbreviated} </b></Typography>
						<Typography variant="body1" sx={{ color: 'common.white' }}>Price: <b>{product.price} BGN</b></Typography>
					</Stack>
					
					<Button
						variant="contained"
						size='large'
						color='inherit'
						to={isLoggedIn ? `/products/${product._id}/order` : `/login`}
						sx={{
							backgroundColor: 'main.yellow.primary', 
							color: 'black', 
							'&:hover': {
								transform: hovered ? 'scale(1.1)' : 'scale(1.0)',
								backgroundColor: 'main.yellow.dark', 
							}
						}}

						onMouseOver={() => setHovered(true)}
						onMouseOut={() => setHovered(false)}

						component={RouterLink}
					>
						Order
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
}
