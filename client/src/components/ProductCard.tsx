import { motion } from "framer-motion"

import { Product } from '../models/Product';
import { getMeasurementUnit } from '../utils/getMeasurementUnit';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import YellowHoverableButton from "./Buttons/YellowHoverableButton";

interface Props {
	product: Product,
}

export default function ProductCard({
	product,
}: Props) {


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
				padding: '10px',
				backgroundColor: 'rgba(44, 44, 44,0.3)',
				borderBottomLeftRadius: '20px',
				borderTopRightRadius: '20px'
			}}
			component={motion.div}
			whileHover={{
				scale: 1.03,
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

				<img
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

					<YellowHoverableButton entity={product} entityType='product'>
						Order now
					</YellowHoverableButton>

				</Stack>
			</Box>
		</Stack>
	);
}
