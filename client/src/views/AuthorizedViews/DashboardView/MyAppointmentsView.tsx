import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';

import { IScheduleConfirmationResponse } from '../../../types/scheduleTypes';

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { Views } from 'react-big-calendar';

import Box from '@mui/material/Box';


const locales = {
	"en-US": require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
})

interface IScheduledItem {
	title: string
	start: Date
	end: Date
}

function MyAppointmentsView() {
	const schedule = useLoaderData() as IScheduleConfirmationResponse[]
	const [allScheduledItems, setAllScheduledItems] = useState<IScheduledItem[]>([]);

	useEffect(() => {
		let filteredScheduleData = schedule.map((scheduleItem: IScheduleConfirmationResponse) => {
			let title = `${scheduleItem.service.title} with ${scheduleItem.hairdresser.firstName} ${scheduleItem.hairdresser.lastName}(${scheduleItem.hairdresser.phone})`

			let year = Number(scheduleItem.yearISO)
			let month = Number(scheduleItem.monthISO) - 1
			let day = Number(scheduleItem.dayISO)
			let hour = Number(scheduleItem.hourISO)
			let minutes = Number(scheduleItem.minutesISO)

			let appointmentDuration = Number(scheduleItem.service.duration)

			let start = new Date(year, month, day, hour, minutes)
			let end = new Date(year, month, day, hour, minutes + appointmentDuration)

			return { title, start, end }
		})

		setAllScheduledItems(filteredScheduleData)
		return () => {
		}
	}, [schedule])

	return (
		<>
			<div>MyAppointmentsView</div>

			<Box sx={{ backgroundColor: 'common.white' }}>
				<Calendar
					defaultView={Views.AGENDA}
					localizer={localizer}
					events={allScheduledItems}
					startAccessor='start'
					endAccessor='end'
					style={{ minHeight: '600px', marginTop: '50px', padding: '10px 5px' }}
				/>
			</Box>
		</>
	)
}

export default MyAppointmentsView