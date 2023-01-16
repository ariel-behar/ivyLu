import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoaderData } from 'react-router-dom'

import { Service } from "../../models/Service"
import { User } from '../../models/User'
import { ScheduleCreateDTO } from '../../models/Schedule';
import * as scheduleServices from '../../services/scheduleServices';
import { IdType } from '../../types/common/common-types';
import addScheduleFormSchema from '../../validations/addScheduleFormSchema';

import Grid from "@mui/material/Grid"
import ImageListItem from "@mui/material/ImageListItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'

import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext } from '../../contexts/NotificationContext';
import ConfirmationView from '../ConfirmationView';
import { IScheduleConfirmationResponse } from '../../types/scheduleTypes';
import BackToButton from '../../components/Buttons/BackToButton';
import { availableSchedulingHours, TAvailableSchedulingHours } from '../../utils/constants';
import Box from '@mui/material/Box';

interface IHairdresserSchedule {
	_id: IdType,
	firstName: string,
	lastName: string,
	appointments: {
		[key: string]: string[]
	}
}

type FormData = {
	hairdresser: string,
	appointmentDate: string | Date,
	appointmentHour: TAvailableSchedulingHours,
}

function ServiceDetailsView() {
	const { service, hairdressers } = useLoaderData() as { service: Service, hairdressers: User[] };
	const { user, isClient } = useAuthContext() as { user: User, isClient: boolean };
	const { displayNotification } = useNotificationContext() as any;
	const [selectedHairdresser, setSelectedHairdresser] = useState<User | ''>('')
	const [hairdresserSchedule, setHairdresserSchedule] = useState<IHairdresserSchedule | null>(null);
	const [selectedAppointmentDate, setSelectedAppointmentDate] = useState<Date>(new Date());
	const [filteredAvailableShedulingHours, setFilteredAvailableShedulingHours] = useState<TAvailableSchedulingHours[] | []>(availableSchedulingHours)
	const [selectedAppointmentHour, setSelectedAppointmentHour] = useState<TAvailableSchedulingHours>(filteredAvailableShedulingHours[0])
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [showConfirmationView, setShowConfirmationView] = useState<boolean>(false)
	const [createdScheduledItem, setCreatedScheduledItem] = useState<object | IScheduleConfirmationResponse>({})
	const [hovered, setHovered] = useState<boolean>(false);

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
		mode: 'onChange',
		resolver: yupResolver(addScheduleFormSchema),
		defaultValues: {
			hairdresser: '',
			appointmentDate: format(new Date(), "d MMMM, yyyy"),
			appointmentHour: filteredAvailableShedulingHours[0]
		}
	})

	useEffect(() => {
		if (selectedHairdresser !== '') {
			scheduleServices.getHairdresserSchedule(selectedHairdresser._id)
				.then((data) => {
					setHairdresserSchedule(data);
				})
				.catch(err => {
					displayNotification(err, 'error')
				})
		}
	}, [selectedHairdresser])

	useEffect(() => {
		updateAvailableAppointmentHours()
	}, [hairdresserSchedule, selectedAppointmentDate])

	const onDateChange = (date: Date) => {
		toggleCalendarState();
		setSelectedAppointmentDate(date);
	};

	const toggleCalendarState = () => setIsCalendarOpen(!isCalendarOpen);

	const onHairdresserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let changedHairdresser = hairdressers.filter((hairdressers: User) => hairdressers._id === e.target.value)[0]
		setSelectedHairdresser(changedHairdresser)
	}

	const onHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedAppointmentHour(e.target.value as TAvailableSchedulingHours)
	}

	const updateAvailableAppointmentHours = () => {
		const currentFormatedSelectedDate = format(selectedAppointmentDate, "dd/MM/yyyy")
		let filteredAvailableHaidresserHours: TAvailableSchedulingHours[] = availableSchedulingHours;

		if (isToday(selectedAppointmentDate)) {
			let currentHour = Number(format(new Date(), 'H'))
			let currentMinutes = Number(format(new Date(), 'm'))

			filteredAvailableHaidresserHours = filteredAvailableHaidresserHours.filter((hour: TAvailableSchedulingHours) => {
				let availableScheduleHour = Number(hour.substring(0, 2))
				let availableScheduleMinutes = Number(hour.substring(3, 5))

				if (availableScheduleHour === currentHour) {
					return availableScheduleMinutes > currentMinutes
				} else {
					return availableScheduleHour > currentHour
				}
			})
		}

		if (hairdresserSchedule !== null && hairdresserSchedule.appointments.hasOwnProperty(currentFormatedSelectedDate)) {

			filteredAvailableHaidresserHours = filteredAvailableHaidresserHours.filter((hour: TAvailableSchedulingHours) => {
				return !(hairdresserSchedule.appointments[currentFormatedSelectedDate as keyof typeof hairdresserSchedule] as TAvailableSchedulingHours[]).includes(hour)
			})
		}

		setSelectedAppointmentHour(filteredAvailableHaidresserHours[0])
		setFilteredAvailableShedulingHours(filteredAvailableHaidresserHours)
	}

	const onFormSubmit = async (data: FormData, e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		e?.preventDefault()

		const appointment: ScheduleCreateDTO = {
			clientId: user._id,
			hairdresserId: data.hairdresser,
			serviceId: service._id,
			scheduledDate: selectedAppointmentDate,
			scheduledHour: data.appointmentHour
		}

		try {
			let createScheduleItemResponse = await scheduleServices.create(appointment, user.authToken)

			if (createScheduleItemResponse) {
				displayNotification({ message: 'Appointment has successfully been created' }, 'success')
				setCreatedScheduledItem(createScheduleItemResponse)
				setShowConfirmationView(true)
			}

		} catch (err) {
			displayNotification(err, 'error')
		}
	}

	return (
		<Box py={3}>
			<div>ServiceDetailsView</div>

			{
				showConfirmationView
					? <ConfirmationView entity={createdScheduledItem as IScheduleConfirmationResponse} entityType='service' />
					:
					<>
						<Stack direction='row' justifyContent='left' mb={3}>
							<BackToButton whereTo="services" />
						</Stack>
						<Paper>
							<Grid container>
								<Grid item md={6}>
									<ImageListItem >
										<img
											src={`${service.imgUrl}`}
											alt={service.title}
											loading='lazy'
										/>

									</ImageListItem>
								</Grid>
								<Grid item md={6} sx={{ backgroundColor: "main.beige" }}>
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
											<Stack spacing={2} p={2}>
												<TextField
													required
													label='Select Hairdresser'
													select
													value={selectedHairdresser !== '' ? selectedHairdresser._id : ''}
													{...register('hairdresser')}
													onChange={onHairdresserChange}
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
															onClick={toggleCalendarState}
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
																	onDateChange(date)
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
															onChange={onHourChange}
															variant="outlined"
															size="small"
															fullWidth
															sx={{ maxHeight: '100px' }}
															error={errors.appointmentHour ? true : false}
															helperText={errors.appointmentHour ? errors.appointmentHour.message : ''}
														>
															{
																filteredAvailableShedulingHours.map(hour => (
																	<MenuItem key={uniqid()} value={hour}>{hour}</MenuItem>
																))
															}
														</TextField>

														<Button
															onMouseOver={() => setHovered(true)}
															onMouseOut={() => setHovered(false)}

															sx={{
																display: 'block',
																marginTop: '10px',
																backgroundColor: 'main.yellow.primary',
																color: 'black',
																'&:hover': {
																	transform: hovered ? 'scale(1.1)' : 'scale(1.0)',
																	backgroundColor: 'main.yellow.dark',
																}
															}}
															variant='contained'
															type="submit"
															disabled={!(isValid)}
														>
															Schedule Appointment
														</Button>
													</>
												}
											</Stack>
										</form>
									}
								</Grid>
							</Grid>
						</Paper>
					</>
			}
		</Box>
	)
}

export default ServiceDetailsView