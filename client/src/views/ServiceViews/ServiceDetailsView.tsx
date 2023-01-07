import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoaderData } from 'react-router-dom'

import { Service } from "../../models/Service"
import { User } from '../../models/User'
import { Schedule, ScheduleCreateDTO } from '../../models/Schedule';
import { ApiSchedule, ApiScheduleImpl } from '../../services/scheduleServices';
import { AuthTokenType, IdType } from '../../types/common/commonTypes';
import addScheduleFormSchema from '../../validations/addScheduleFormSchema';
import { availableSchedulingHours, AvailableSchedulingHoursType } from '../../utils/availableSchedulingHours';

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
import { ScheduleConfirmationResponseInterface } from '../../types/common/scheduleTypes';
import BackToButton from '../../components/BackToButton';


type FormData = {
	hairdresser: string,
	appointmentDate: Date,
	appointmentHour: AvailableSchedulingHoursType,
}

const scheduleServices: ApiSchedule<IdType, Schedule, AuthTokenType> = new ApiScheduleImpl<IdType, Schedule, AuthTokenType>('schedule');

function ServiceDetailsView() {
	const { service, hairdressers } = useLoaderData() as { service: Service, hairdressers: User[] };
	const { user, isClient } = useAuthContext() as any;
	const { displayNotification } = useNotificationContext() as any;
	const [selectedHairdresser, setSelectedHairdresser] = useState<User | ''>('')
	const [hairdresserSchedule, setHairdresserSchedule] = useState<object | null>(null);
	const [selectedAppointmentDate, setSelectedAppointmentDate] = useState<Date>(new Date());
	const [filteredAvailableShedulingHours, setFilteredAvailableShedulingHours] = useState<AvailableSchedulingHoursType[] | []>(availableSchedulingHours)
	const [selectedAppointmentHour, setSelectedAppointmentHour] = useState<AvailableSchedulingHoursType>(filteredAvailableShedulingHours[0])
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [showConfirmationView, setShowConfirmationView] = useState<boolean>(false)
	const [createdScheduledItem, setCreatedScheduledItem] = useState<object | ScheduleConfirmationResponseInterface>({})

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
		mode: 'onChange',
		resolver: yupResolver(addScheduleFormSchema),
		defaultValues: {
			hairdresser: '',
			appointmentDate: new Date(),
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
		setSelectedAppointmentHour(e.target.value as AvailableSchedulingHoursType)
	}

	const updateAvailableAppointmentHours = () => {
		const currentFormatedSelectedDate = format(selectedAppointmentDate, "dd/MM/yyyy")
		let filteredAvailableHaidresserHours: AvailableSchedulingHoursType[] = availableSchedulingHours;

		if (isToday(selectedAppointmentDate)) {
			let currentHour = Number(format(new Date(), 'H'))
			let currentMinutes = Number(format(new Date(), 'm'))

			filteredAvailableHaidresserHours = filteredAvailableHaidresserHours.filter((hour: AvailableSchedulingHoursType) => {
				let availableScheduleHour = Number(hour.substring(0, 2))
				let availableScheduleMinutes = Number(hour.substring(3, 5))

				if (availableScheduleHour === currentHour) {
					return availableScheduleMinutes > currentMinutes
				} else {
					return availableScheduleHour > currentHour
				}
			})
		}

		if (hairdresserSchedule !== null && hairdresserSchedule.hasOwnProperty(currentFormatedSelectedDate)) {
			filteredAvailableHaidresserHours = filteredAvailableHaidresserHours.filter((hour: AvailableSchedulingHoursType) => {
				return !(hairdresserSchedule[currentFormatedSelectedDate as keyof typeof hairdresserSchedule] as AvailableSchedulingHoursType[]).includes(hour)
			})
		}

		setSelectedAppointmentHour(filteredAvailableHaidresserHours[0])
		setFilteredAvailableShedulingHours(filteredAvailableHaidresserHours)
	}

	const onFormSubmit = async (data: FormData, e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		e?.preventDefault()

		const appointment: ScheduleCreateDTO = {
			clientId: user.userId,
			hairdresserId: data.hairdresser,
			serviceId: service._id,
			scheduledDate: selectedAppointmentDate,
			scheduledHour: data.appointmentHour
		}

		try {
			let createScheduleItemResponse = await scheduleServices.create(appointment as Schedule, user.authToken)

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
		<>
			<div>ServiceDetailsView</div>

			{
				showConfirmationView
					? <ConfirmationView entity={createdScheduledItem as ScheduleConfirmationResponseInterface} entityType='service' />
					:
					<>
						<Stack direction='row' justifyContent='right' mb={3}>
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
															sx={{ display: 'block' }}
															variant='contained'
															style={{ marginTop: '10px' }}
															type="submit"
															disabled={!(isValid)}
														>
															Create Appointment
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
		</>
	)
}

export default ServiceDetailsView