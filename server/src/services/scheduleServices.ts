import Schedule, { IScheduleCreate, IScheduleDocument } from '../models/Schedule.js'
import { IStaffDocument } from '../models/Staff.js'

export const create = ({client, hairdresser, service, scheduledDate, scheduledHour}: IScheduleCreate) => Schedule.create({client, hairdresser, service, scheduledDate, scheduledHour})

export const getHairdresserSchedule = (hairdresserId: IStaffDocument['_id']) => Schedule.find({hairdresser: hairdresserId}, {dateISO: 1, scheduledHour: 1, hairdresser: 1}).populate('hairdresser', ['firstName', 'lastName'])

export const getOne = (scheduledItemId: IScheduleDocument['_id']) => Schedule.find({_id: scheduledItemId})

export const getOneAndPopulate = (scheduledItemId: IScheduleDocument['_id']) => Schedule.findById(scheduledItemId).populate('hairdresser').populate('client').populate('service')

export const getAll = () => Schedule.find({}).populate('hairdresser').populate('client').populate('service').lean()

export const findOneByHairdresserDateAndHour = (hairdresserId: IStaffDocument['_id'], dateISO: IScheduleDocument['dateISO'], scheduledHour: IScheduleDocument['scheduledHour']) => Schedule.findOne({hairdresser: hairdresserId, dateISO: dateISO, scheduledHour: scheduledHour})


