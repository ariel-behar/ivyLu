import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React, { useState } from 'react'
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

const events = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(2023, 0, 5),
    end: new Date(2023, 0, 8)
  },
  {
    title: 'Vaction',
    start: new Date(2023, 0, 12),
    end: new Date(2023, 0, 12)
  },
  {
    title: 'Conference',
    start: new Date(2023, 0, 23),
    end: new Date(2023, 0, 23)
  }
]

function ScheduleManagementView() {
  const [newEvent, setNewEvent] = useState<{title: string, start: string, end: string}>({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState<object[]>(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent])
  }

  return (
    <>
      <div>ScheduleManagementView</div>

      <div className="App">
        <h1>Calendar</h1>
        <h2>Add new Event</h2>
        <div>
          <input
            type="text"
            placeholder='Add Title'
            style={{ width: '20%', marginRight: "10px" }}
            value={newEvent.title as string}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <DatePicker
            placeholderText='Start Date'
            // style={{ marginRight: '10px' }}
            showTimeSelect
            dateFormat="Pp"
            selected={newEvent.start}
            onChange={(start: string) => setNewEvent({ ...newEvent, start })}
          />
          <DatePicker
            placeholderText='End Date'
            selected={newEvent.end}
            onChange={(end: string) => setNewEvent({ ...newEvent, end })}
          />

          <button style={{ marginTop: '10px' }} onClick={handleAddEvent}>Add Event</button>
        </div>

        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500, margin: '50px' }}
        />
      </div>
    </>
  )

}

export default ScheduleManagementView