import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoaderData } from 'react-router-dom'

import { Service } from "../../../models/Service"

import Grid from "@mui/material/Grid"
import ImageListItem from "@mui/material/ImageListItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { User } from '../../../models/User'
import MenuItem from '@mui/material/MenuItem'
import uniqid from 'uniqid'

let availabelHours = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'] as const

interface ServiceDetailsCardProps {
	service: Service
}

const locales = {
	"en-US": require('date-fns/locale/en-US')
}

function ServiceDetailsCard({ service }: ServiceDetailsCardProps) {
	const { hairdressers } = useLoaderData() as { hairdressers: User[] };
	const [selectedHairdresser, setSelectedHairdresser] = useState<User>(hairdressers[0])
	const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date>(new Date());
	const [selectedHour, setSelectedHour] = useState<typeof availabelHours>()
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);


	useEffect(() => {
		// Implement a request to get the schedule for the selected hairdresser
		console.log('useffect')
		return () => {
		}
	}, [selectedCalendarDate])

	const handleDateChange = (e: Date) => {
		setIsCalendarOpen(!isCalendarOpen);
		setSelectedCalendarDate(e);
	};

	const toggleCalendarIsOpen = () => setIsCalendarOpen(!isCalendarOpen);

	const handleHairdresserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let changedHairdresser = hairdressers.filter((hairdressers: User) => hairdressers._id === e.target.value)[0]
		setSelectedHairdresser(changedHairdresser)
	}

	const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		// setSelectedHour(e.target.value)
	}

	// function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
	// 	e.preventDefault()

	// 	console.log('here')
	// }

	return (
		<>
			<div>ServiceDetailsCard</div>
			<Paper>
				<Grid container>
					<Grid item lg={6}>
						<ImageListItem >
							<img
								src={`${service.imgUrl}`}
								alt={service.title}
								loading='lazy'
							/>

						</ImageListItem>
					</Grid>
					<Grid item lg={6} sx={{ backgroundColor: "main.beige" }}>
						<Stack direction='row' justifyContent='center' p={2} sx={{ backgroundColor: "main.black", color: "common.white" }}>
							<Typography variant="h4" component='h4'>{service.title}</Typography>
						</Stack>

						<Stack p={2}>
							<Typography variant="h6" component='h6'>{service.description}</Typography>
							<Typography variant="h6" component='h6'>Price: <b>{service.price} BGN</b></Typography>
							<Typography variant="h6" component='h6'>Duration: <b>{service.duration} hrs</b></Typography>
						</Stack>


						<form>
							<TextField
								required
								label='Select Hairdresser'
								select
								value={selectedHairdresser._id}
								// {...register('hairdresser')}
								onChange={handleHairdresserChange}
								variant="outlined"
								size="small"
								fullWidth
							// error={errors.volumeMeasurementUnit ? true : false}
							// helperText={errors.volumeMeasurementUnit ? errors.volumeMeasurementUnit.message : ''}
							>
								{
									Object.values(hairdressers).map(hairdresser => (
										<MenuItem key={uniqid()} value={hairdresser._id}>{`${hairdresser.firstName} ${hairdresser.lastName}`}</MenuItem>
									))
								}
							</TextField>

							<TextField
								required
								variant='outlined'
								onClick={toggleCalendarIsOpen}
								label="Select Appointment Date"
								value={format(selectedCalendarDate, "d MMMM, yyyy")}
								size="small"
								fullWidth
							/>

							{isCalendarOpen && <DatePicker
								selected={selectedCalendarDate}
								onChange={(date: Date) => {
									setSelectedCalendarDate(date)
									toggleCalendarIsOpen()
								}}
								inline
							/>
							}

							<TextField
								required
								label='Select Available Hour'
								select
								value={selectedHour}
								// {...register('hairdresser')}
								onChange={handleHourChange}
								variant="outlined"
								size="small"
								sx={{maxHeight: '100px'}}
								fullWidth
							// error={errors.volumeMeasurementUnit ? true : false}
							// helperText={errors.volumeMeasurementUnit ? errors.volumeMeasurementUnit.message : ''}
							>
								{
									availabelHours.map(hour => (
										<MenuItem key={uniqid()} value={hour}>{hour}</MenuItem>
									))
								}
							</TextField>

							<Button variant='contained' style={{ marginTop: '10px' }} type="submit">Add Event</Button>
						</form>
					</Grid>
				</Grid>
			</Paper>
		</>
	)
}

export default ServiceDetailsCard