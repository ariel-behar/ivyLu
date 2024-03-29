import * as yup from 'yup'
import { availableSchedulingHours } from '../utils/constants';


const addScheduleFormSchemaShape = {
    hairdresser: yup
        .string()
        .required('Hairdresser is required'),
    appointmentDate: yup
        .date()
        .required('Appointment date is required'),
    appointmentHour: yup
        .string()
        .oneOf(availableSchedulingHours, 'Appointment hour should be chosen from the hairdresser\'s available time slots')
        .nullable()
}

const addScheduleFormSchema = yup.object().shape(addScheduleFormSchemaShape)

export default addScheduleFormSchema;