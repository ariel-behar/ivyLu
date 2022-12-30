
import { useLocation, Link as RouterLink } from 'react-router-dom'

import { Service } from '../models/Service';
import { Product } from '../models/Product';
import { useAuthContext } from '../contexts/AuthContext';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';



type MediaCardServiceProps = {
	item: Service | Product,
	onDeleteButtonClickHandler: (_id: string, title: string) => void
}

export default function MediaCard({
	item,
	onDeleteButtonClickHandler
}: MediaCardServiceProps) {
	const { user, isLoggedIn } = useAuthContext() as any;
	const location = useLocation()

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={item.imgUrl}
				title={item.title}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{item.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{item.description}
				</Typography>

				<Stack mt={2} direction='row' justifyContent='space-between'>

					{/* <Typography variant="body2" color="text.secondary">
						Duration: {item.duration} hrs
					</Typography> */}

					<Typography variant="body2" color="text.secondary">
						Price: {item.price} BGN
					</Typography>
				</Stack>
			</CardContent>
			<CardActions>
				<Stack direction='row' justifyContent='space-between'>
					{isLoggedIn && location.pathname === '/services'
						? <Button size="small" variant='contained'>Schedule</Button>
						: ''
					}
					{
						(user.role === 2 || user.role === 3) && (location.pathname === '/management/services' || location.pathname === '/management/products')
							?
							<>
								<Button size="small" component={RouterLink} to={`${location.pathname}/${item._id}/edit`}>Edit</Button>
								<Button size="small" onClick={() => onDeleteButtonClickHandler(item._id, item.title)}>Delete</Button>
							</>
							: ''
					}

				</Stack>
			</CardActions>
		</Card>
	);
}
