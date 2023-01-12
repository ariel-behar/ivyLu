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

function ScheduleManagementView() {
	const schedule = useLoaderData() as IScheduleConfirmationResponse[]
	const [allScheduledItems, setAllScheduledItems] = useState<IScheduledItem[]>([]);

	useEffect(() => {
		let filteredScheduleData = schedule.map((scheduleItem: IScheduleConfirmationResponse) => {
			let title = `${scheduleItem.hairdresser.firstName} ${scheduleItem.hairdresser.lastName} - ${scheduleItem.service.title} - ${scheduleItem.client.firstName} ${scheduleItem.client.lastName} (${scheduleItem.client.phone})`

			let year = Number(scheduleItem.appointmentDetails.yearISO)
			let month = Number(scheduleItem.appointmentDetails.monthISO) - 1
			let day = Number(scheduleItem.appointmentDetails.dayISO)
			let hour = Number(scheduleItem.appointmentDetails.hourISO)
			let minutes = Number(scheduleItem.appointmentDetails.minutesISO)

			let appointmentDuration = Number(scheduleItem.service.duration)

			let start = new Date(year, month, day, hour, minutes)
			let end = new Date(year, month, day, hour, minutes + appointmentDuration)

			return { title , start, end }
		})

		setAllScheduledItems(filteredScheduleData)
		return () => {
		}
	}, [schedule])


	return (
		<>
			<div>ScheduleManagementView</div>

			<div className="App">
				<Calendar
					defaultView={Views.AGENDA}
					localizer={localizer}
					events={allScheduledItems}
					startAccessor='start'
					endAccessor='end'
					style={{ minHeight: '600px', marginTop: '50px' }}
				/>
			</div>
		</>
	)

}

export default ScheduleManagementView