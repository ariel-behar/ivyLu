import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from 'react-router-dom';
import { Views } from 'react-big-calendar';
import { title } from 'process';
import { IdType } from '../../../types/common/commonTypes';
import { User } from '../../../models/User';
import { Service } from '../../../models/Service';
import { Schedule } from '../../../models/Schedule';

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

interface ScheduleInterface {
	_id: IdType,
	title: string,
	start: Date,
	end: Date,
	client: User,
	hairdresser: User,
	service: Service,
	appointmentDetails: Schedule
}

interface ScheduledItemInterface {
	title: string
	start: Date
	end: Date
}

function ScheduleManagementView() {
	const schedule = useLoaderData() as ScheduleInterface[]
	const [allScheduledItems, setAllScheduledItems] = useState<ScheduledItemInterface[]>([]);

	useEffect(() => {
		let filteredScheduleData = schedule.map((scheduleItem: ScheduleInterface) => {
			let year = Number(scheduleItem.appointmentDetails.yearISO)
			let month = Number(scheduleItem.appointmentDetails.monthISO) - 1
			let day = Number(scheduleItem.appointmentDetails.dayISO)
			let hour = Number(scheduleItem.appointmentDetails.hourISO)
			let minutes = Number(scheduleItem.appointmentDetails.minutesISO)

			let appointmentDuration = Number(scheduleItem.service.duration)

			let startDate = new Date(year, month, day, hour, minutes)
			let endDate = new Date(year, month, day, hour, minutes + appointmentDuration)

			return { title: scheduleItem.title, start: startDate, end: endDate }
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
					defaultView={Views.DAY}
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