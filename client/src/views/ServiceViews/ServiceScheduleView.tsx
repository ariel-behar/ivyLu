import { useState } from 'react'
import { useLoaderData } from "react-router-dom"
import BackToButton from "../../components/BackToButton";
import { Service } from "../../models/Service";

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

// const events = [
// 	{
// 		title: 'Big Meeting',
// 		allDay: true,
// 		start: new Date(2023, 0, 5),
// 		end: new Date(2023, 0, 8)
// 	},
// 	{
// 		title: 'Vaction',
// 		start: new Date(2023, 0, 12),
// 		end: new Date(2023, 0, 12)
// 	},
// 	{
// 		title: 'Conference',
// 		start: new Date(2023, 0, 23),
// 		end: new Date(2023, 0, 23)
// 	}
// ]

function ServiceScheduleView() {
	const service = useLoaderData() as Service;
	const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
	// const [allEvents, setAllEvents] = useState(events);

	function handleAddEvent() {
		// setAllEvents([...allEvents, newEvent])
	}
	

	return (
		<>
			<div>ServiceScheduleView</div>
			<BackToButton whereTo="services" />

			<div>
				<input
					type="text"
					placeholder='Add Title'
					style={{ width: '20%', marginRight: "10px" }}
					value={newEvent.title}
					onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
				/>
				<DatePicker
					placeholderText='Start Date'
					style={{ marginRight: '10px' }}
					showTimeSelect
					dateFormat="Pp"
					// selected={newEvent.start}
					onChange={(start: any) => setNewEvent({ ...newEvent, start })}
				/>
				<DatePicker
					placeholderText='End Date'
					// selected={newEvent.end ? newEvent.end : ''}
					onChange={(end: any) => setNewEvent({ ...newEvent, end })}
				/>

				<button style={{ marginTop: '10px' }} onClick={handleAddEvent}>Add Event</button>
			</div>
			
			<h4>{service._id}</h4>
		</>
	)
}

export default ServiceScheduleView