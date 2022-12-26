import * as React from 'react';
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
	const { user } = useAuthContext() as any;
	console.log('user', user.userId);
	console.log('creatpr', creatorId)

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
					<Button size="small" variant='contained'>Schedule</Button>

					{
						user.userId === creatorId
							? <Button size="small" >Edit</Button>
							: ''
					}
				</Stack>
			</CardActions>
		</Card>
	);
}
