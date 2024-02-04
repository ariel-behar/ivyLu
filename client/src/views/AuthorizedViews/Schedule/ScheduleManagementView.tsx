import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';

import { IScheduleConfirmationResponse } from '../../../types/scheduleTypes';

import ScheduleCalendar from '../../../components/ScheduleCalendar';
import Box from '@mui/material/Box';

interface IScheduledItem {
	title: string
	start: Date
	end: Date
}

function ScheduleManagementView() {
	const schedule = useLoaderData() as IScheduleConfirmationResponse[]
	const [scheduledItems, setScheduledItems] = useState<IScheduledItem[]>([]);

	useEffect(() => {
		let filteredScheduleData = schedule.map((item: IScheduleConfirmationResponse) => {
			let title = `${item.hairdresser.firstName} ${item.hairdresser.lastName} - ${item.service.title} - ${item.client.firstName} ${item.client.lastName} (${item.client.phone})`

			let year = Number(item.appointmentDetails?.yearISO)
			let month = Number(item.appointmentDetails?.monthISO) - 1
			let day = Number(item.appointmentDetails?.dayISO)
			let hour = Number(item.appointmentDetails?.hourISO)
			let minutes = Number(item.appointmentDetails?.minutesISO)

			let appointmentDuration = Number(item.service.duration)

			let start = new Date(year, month, day, hour, minutes)
			let end = new Date(year, month, day, hour, minutes + appointmentDuration)

			return { title , start, end }
		})

		setScheduledItems(filteredScheduleData)
		return () => {
		}
	}, [schedule])


	return (
		<>
			{/* <div>ScheduleManagementView</div> */}

			<Box height='70.75px' ></Box>

			<ScheduleCalendar scheduledItems={scheduledItems}/>
		</>
	)

}

export default ScheduleManagementView