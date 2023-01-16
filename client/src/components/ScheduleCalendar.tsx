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

interface Props {
    scheduledItems: IScheduledItem[]
}

function ScheduleCalendar({scheduledItems}: Props) {
    return (
        <Box sx={{ backgroundColor: 'common.white' }}>
            <Calendar
                defaultView={Views.AGENDA}
                localizer={localizer}
                events={scheduledItems}
                startAccessor='start'
                endAccessor='end'
                style={{ minHeight: '600px', padding: '10px 5px' }}
            />
        </Box>
    )
}

export default ScheduleCalendar