import { useLocation, Link as RouterLink } from 'react-router-dom'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useAuthContext } from '../context/AuthContext';

type MediaCardServiceProps = {
	service: {
		_id: string,
		title: string
		description: string,
		additionalComments: string,
		imgUrl: string,
		price: 40,
		duration: string,
		creatorId: string,
	}
}

export default function MediaCard({ service: {
	_id,
	title,
	description,
	additionalComments,
	imgUrl,
	price,
	duration,
	creatorId
} }: MediaCardServiceProps) {
	const { user, isLoggedIn } = useAuthContext() as any;
	const location = useLocation()
	console.log('location:', location.pathname)

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={imgUrl}
				title={title}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>

				<Stack mt={2} direction='row' justifyContent='space-between'>
					<Typography variant="body2" color="text.secondary">
						Duration: {duration} hrs
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Price: {price} BGN
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
						(user.role === 2 || user.role === 3) && location.pathname === '/management/services'
							?
								<>
									<Button size="small" component={RouterLink} to={`/management/services/${_id}/edit`}>Edit</Button>
									<Button size="small" >Delete</Button>
								</>
							: ''
					}
				</Stack>
			</CardActions>
		</Card>
	);
}
