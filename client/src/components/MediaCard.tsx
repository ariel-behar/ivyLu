import React from 'react';

import { useLocation, Link as RouterLink } from 'react-router-dom'

import { useAuthContext } from '../contexts/AuthContext';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

type MediaCardServiceProps = {
	service: {
		_id: string,
		title: string
		description: string,
		additionalComments: string,
		imgUrl: string,
		price: number,
		duration: string,
		creatorId: string,
	},
	onDeleteButtonClickHandler: (_id: string, title: string) => void
}

export default function MediaCard({
	service,
	onDeleteButtonClickHandler
}: MediaCardServiceProps) {
	const { user, isLoggedIn } = useAuthContext() as any;
	const location = useLocation()

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={service.imgUrl}
				title={service.title}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{service.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{service.description}
				</Typography>

				<Stack mt={2} direction='row' justifyContent='space-between'>
					<Typography variant="body2" color="text.secondary">
						Duration: {service.duration} hrs
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Price: {service.price} BGN
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
								<Button size="small" component={RouterLink} to={`/management/services/${service._id}/edit`}>Edit</Button>
								<Button size="small" onClick={() => onDeleteButtonClickHandler(service._id, service.title)}>Delete</Button>
							</>
							: ''
					}

				</Stack>
			</CardActions>
		</Card>
	);
}
