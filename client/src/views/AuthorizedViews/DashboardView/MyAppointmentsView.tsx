import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import ScheduleCalendar from '../../../components/ScheduleCalendar';

import { IScheduleConfirmationResponse } from '../../../types/scheduleTypes';

interface IScheduledItem {
	title: string
	start: Date
	end: Date
}

function MyAppointmentsView() {
	const schedule = useLoaderData() as IScheduleConfirmationResponse[]
	const [scheduledItems, setscheduledItems] = useState<IScheduledItem[]>([]);

	useEffect(() => {
		let filteredScheduleData = schedule.map((item: IScheduleConfirmationResponse) => {
			let title = `${item.service.title} with ${item.hairdresser.firstName} ${item.hairdresser.lastName}(${item.hairdresser.phone})`

			let year = Number(item.yearISO)
			let month = Number(item.monthISO) - 1
			let day = Number(item.dayISO)
			let hour = Number(item.hourISO)
			let minutes = Number(item.minutesISO)

			let appointmentDuration = Number(item.service.duration)

			let start = new Date(year, month, day, hour, minutes)
			let end = new Date(year, month, day, hour, minutes + appointmentDuration)

			return { title, start, end }
		})

		setscheduledItems(filteredScheduleData)
		return () => {
		}
	}, [schedule])

	return (
		<>
			{/* <div>MyAppointmentsView</div> */}

			<ScheduleCalendar scheduledItems={scheduledItems}/>
		</>
	)
}

export default MyAppointmentsView