import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoaderData } from 'react-router-dom'

import { Service } from "../../../models/Service"
import { User } from '../../../models/User'
import { Schedule, ScheduleCreateDTO } from '../../../models/Schedule';
import { ApiSchedule, ApiScheduleImpl } from '../../../services/scheduleServices';
import { AuthTokenType, IdType } from '../../../types/common/commonTypes';
import addScheduleFormSchema from '../../../validations/addScheduleFormSchema';
import { availableSchedulingHours, AvailableSchedulingHoursType } from '../../../utils/availableSchedulingHours';

import Grid from "@mui/material/Grid"
import ImageListItem from "@mui/material/ImageListItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNotificationContext } from '../../../contexts/NotificationContext';


type FormData = {
	hairdresser: string,
	appointmentDate: Date,
	appointmentHour: AvailableSchedulingHoursType,
}

const scheduleServices: ApiSchedule<IdType, Schedule, AuthTokenType> = new ApiScheduleImpl<IdType, Schedule, AuthTokenType>('schedule');

interface ServiceDetailsCardProps {
	service: Service
}

function ServiceDetailsCard({ service }: ServiceDetailsCardProps) {
	const { hairdressers } = useLoaderData() as { hairdressers: User[] };
	const { user, isClient } = useAuthContext() as any;
	const { displayNotification } = useNotificationContext() as any;
	const [selectedHairdresser, setSelectedHairdresser] = useState<User | ''>('')
	const [hairdresserSchedule, setHairdresserSchedule] = useState<Schedule | null>(null);
	const [selectedAppointmentDate, setSelectedAppointmentDate] = useState<Date>(new Date());
	const [selectedAppointmentHour, setSelectedAppointmentHour] = useState<AvailableSchedulingHoursType>(availableSchedulingHours[0])
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormData>({
		mode: 'onBlur',
		resolver: yupResolver(addScheduleFormSchema),
		defaultValues: {
			hairdresser: '',
			appointmentDate: new Date(),
			appointmentHour: availableSchedulingHours[0]
		}
	})

	useEffect(() => {
		if (selectedHairdresser !== '') {
			scheduleServices.getHairdresserSchedule(selectedHairdresser._id)
				.then((data) => {
					setHairdresserSchedule(data as Schedule);
				})
				.catch(err => console.log(err))
		}
		return () => {
		}
	}, [selectedHairdresser])

	const handleDateChange = (e: Date) => {
		// Need to implement that whenever the date is changed, the hours also need to be updated according to availablity. If chosen "today", it shouldn't display the hours that have already passed today
		setIsCalendarOpen(!isCalendarOpen);
		setSelectedAppointmentDate(e);
	};

	const toggleCalendarIsOpen = () => setIsCalendarOpen(!isCalendarOpen);

	const handleHairdresserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let changedHairdresser = hairdressers.filter((hairdressers: User) => hairdressers._id === e.target.value)[0]
		setSelectedHairdresser(changedHairdresser)
	}

	const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedAppointmentHour(e.target.value as AvailableSchedulingHoursType)
	}

	const onFormSubmit = async (data: FormData, e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		e?.preventDefault()

		const appointment: ScheduleCreateDTO = {
			clientId: user.userId,
			hairdresserId: data.hairdresser,
			serviceId: service._id,
			date: selectedAppointmentDate,
			hour: data.appointmentHour
		}

		try {
			let createScheduleItemResponse = await scheduleServices.create(appointment as Schedule, user.authToken)

			console.log('createScheduleItemResponse:', createScheduleItemResponse)

		} catch (err) {
			displayNotification(err, 'error')
		}


	}

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

						{isClient &&
							<form onSubmit={handleSubmit(onFormSubmit)}>
								<TextField
									required
									label='Select Hairdresser'
									select
									value={selectedHairdresser !== '' ? selectedHairdresser._id : ''}
									{...register('hairdresser')}
									onChange={handleHairdresserChange}
									variant="outlined"
									size="small"
									fullWidth
									error={errors.hairdresser ? true : false}
									helperText={errors.hairdresser ? errors.hairdresser.message : ''}
								>
									{
										Object.values(hairdressers).map(hairdresser => (
											<MenuItem
												key={uniqid()}
												value={hairdresser._id}
											>
												{`${hairdresser.firstName} ${hairdresser.lastName}`}
											</MenuItem>
										))
									}
								</TextField>


								{
									selectedHairdresser &&
									<>
										<TextField
											required
											variant='outlined'
											onClick={toggleCalendarIsOpen}
											label="Select Appointment Date"
											{...register('appointmentDate')}
											value={format(selectedAppointmentDate, "d MMMM, yyyy")}
											size="small"
											fullWidth
											error={errors.appointmentDate ? true : false}
											helperText={errors.appointmentDate ? errors.appointmentDate.message : ''}
										/>

										{
											isCalendarOpen &&
											 <DatePicker
												selected={selectedAppointmentDate}
												highlightDates={[new Date()]}
												minDate={new Date()}
												showDisabledMonthNavigation
												onChange={(date: Date) => {
													console.log('date:', date)
													setSelectedAppointmentDate(date as Date)
													toggleCalendarIsOpen()
												}}
												inline
											/>
										}

										<TextField
											required
											label='Select Available Hour'
											select
											value={selectedAppointmentHour}
											{...register('appointmentHour')}
											onChange={handleHourChange}
											variant="outlined"
											size="small"
											fullWidth
											sx={{ maxHeight: '100px' }}
											error={errors.appointmentHour ? true : false}
											helperText={errors.appointmentHour ? errors.appointmentHour.message : ''}
										>
											{
												availableSchedulingHours.map(hour => (
													<MenuItem key={uniqid()} value={hour}>{hour}</MenuItem>
												))
											}
										</TextField>

										<Button
											sx={{ display: 'block' }}
											variant='contained'
											style={{ marginTop: '10px' }}
											type="submit"
											disabled={isDirty && isValid}
										>
											Create Appointment
										</Button>
									</>
								}
							</form>
						}
					</Grid>
				</Grid>
			</Paper>
		</>
	)
}

export default ServiceDetailsCard