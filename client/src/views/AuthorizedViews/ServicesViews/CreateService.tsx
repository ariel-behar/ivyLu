import React, { useState } from "react"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import createServiceFormSchema from "../../../validations/createServiceFormSchema";
import * as servicesService from '../../../services/serviceServices'

import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import MenuItem from "@mui/material/MenuItem"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Service from "../../../models/Service";


type FormData = {
	title: string,
	description: string,
	additionalComments: string | null,
	imgUrl: string,
	price: number[] | number,
	duration: string,
}

const IMAGE_URL_REGEX = /^(?:(?<scheme>[^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*\/)?(?<file>[^?#]*\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]|[Ss][Vv][Gg]))(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/gm

function CreateService() {
	const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormData>({
		mode: 'onBlur',
		resolver: yupResolver(createServiceFormSchema),
		defaultValues: {
			title: '',
			description: '',
			additionalComments: '',
			imgUrl: '',
			price: undefined,
			duration: undefined,
		}
	})
	const [duration, setDuartion] = useState<string>('')
	const [previewImgUrl, setPreviewImageUrl] = useState<string>('')

	const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDuartion(e.target.value as string);
	}

	const handlePreviewImage = (e: React.FocusEvent<HTMLInputElement>) => {
		if ((IMAGE_URL_REGEX).test(e.target.value)) {
			setPreviewImageUrl(e.target.value as string);
		} else {
			setPreviewImageUrl('')
		}
	}

	const onFormSubmit = async (data: FormData, e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		e?.preventDefault();

		const { title, description, additionalComments, imgUrl, price, duration } = data;

		const service = new Service(title, description, additionalComments, imgUrl, price, duration)

		try {
			let createServiceResponse = await servicesService.create(service)
			console.log('createServiceResponse:', createServiceResponse)

			// login(registerUserResponse)
			// navigate('/')

		} catch (err: any) {
			let error = await err;
			console.log(await error.message)
		}
	}

	return (
		<Grid container spacing={2} columnSpacing={1}>
			<Grid item xs={12} sm={12} lg={8}>

				<form onSubmit={handleSubmit(onFormSubmit)}>
					<Stack spacing={2}>
						<TextField
							required
							label="Service Title"
							variant="outlined"
							size="small"
							{...register('title')}
							error={errors.title ? true : false}
							helperText={errors.title ? errors.title.message : ''}
						/>

						<TextField
							required
							label="Service Description"
							variant="outlined"
							size="small"
							{...register('description')}
							error={errors.description ? true : false}
							helperText={errors.description ? errors.description.message : ''}
						/>

						<TextField
							label="Additional Comments"
							variant="outlined"
							size="small"
							{...register('additionalComments')}
							error={errors.additionalComments ? true : false}
							helperText={errors.additionalComments ? errors.additionalComments.message : ''}
						/>

						<Box width='100%' component='div' onBlur={handlePreviewImage}>
							<TextField
								fullWidth
								label="Service Image"
								variant="outlined"
								size="small"
								{...register('imgUrl')}
								error={errors.imgUrl ? true : false}
								helperText={errors.imgUrl ? errors.imgUrl.message : ''}
							/>
						</Box>

						<Stack direction='row' spacing={2}>
							<TextField
								required
								label="Price"
								variant="outlined"
								size="small"
								type='number'

								{...register('price')}
								error={errors.price ? true : false}
								helperText={errors.price ? errors.price.message : ''}
							/>

							<TextField
								required
								label='Select Duration'
								select
								value={duration}
								{...register('duration')}
								onChange={handleDurationChange}
								variant="outlined"
								size="small"
								fullWidth
								error={errors.duration ? true : false}
								helperText={errors.duration ? errors.duration.message : ''}

							>
								<MenuItem value='0:10'>0:10</MenuItem>
								<MenuItem value='0:15'>0:15</MenuItem>
								<MenuItem value='0:20'>0:20</MenuItem>
								<MenuItem value='0:25'>0:25</MenuItem>
								<MenuItem value='0:30'>0:30</MenuItem>
								<MenuItem value='0:35'>0:35</MenuItem>
								<MenuItem value='0:40'>0:40</MenuItem>
								<MenuItem value='0:40'>0:40</MenuItem>
								<MenuItem value='0:45'>0:45</MenuItem>
								<MenuItem value='0:50'>0:50</MenuItem>
								<MenuItem value='0:55'>0:55</MenuItem>
								<MenuItem value='1:00'>1:00</MenuItem>
								<MenuItem value='1:10'>1:10</MenuItem>
								<MenuItem value='1:20'>1:20</MenuItem>
								<MenuItem value='1:25'>1:25</MenuItem>
								<MenuItem value='1:30'>1:30</MenuItem>
								<MenuItem value='1:40'>1:40</MenuItem>
								<MenuItem value='1:45'>1:45</MenuItem>
								<MenuItem value='1:50'>1:50</MenuItem>
								<MenuItem value='2:00'>2:00</MenuItem>
							</TextField>
						</Stack>

						<Button variant="contained" type='submit' disabled={!(isDirty && isValid)}>Create Service </Button>
					</Stack>
				</form>
			</Grid>
			<Grid item lg={4}>
				<Stack maxHeight='320px' border='1px solid black' height='100%' width='100%' direction='column' justifyContent='center' alignItems='center'>
					{
						previewImgUrl
							? <CardMedia height='100%' width='auto' component='img' image={previewImgUrl} alt='Preview Image' />
							: <Typography variant='h4' textAlign='center'>Image preview will appear here</Typography>
					}
				</Stack>
			</Grid>
		</Grid>
	)
}

export default CreateService