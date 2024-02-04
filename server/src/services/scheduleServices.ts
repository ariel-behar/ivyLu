import { IClientDocument } from '../models/Client.js'
import Schedule, { IScheduleCreate, IScheduleDocument } from '../models/Schedule.js'
import { IStaffDocument } from '../models/Staff.js'

export const create = ({client, hairdresser, service, scheduledDate, scheduledHour}: IScheduleCreate) => Schedule.create({client, hairdresser, service, scheduledDate, scheduledHour})

export const getHairdresserSchedule = (hairdresserId: IStaffDocument['_id']) => Schedule.find({hairdresser: hairdresserId}, {dateISO: 1, scheduledHour: 1, hairdresser: 1}).populate('hairdresser', ['firstName', 'lastName'])

export const getClientSchedule = (clientId: IClientDocument['_id'] ) => Schedule.find({client: clientId}, {yearISO: 1, monthISO: 1, dayISO: 1, hourISO: 1, minutesISO: 1, hairdresser: 1, service: 1}).populate('hairdresser', ['firstName', 'lastName', 'phone']).populate('service', ['title', 'duration', 'status'] )

export const getOne = (scheduledItemId: IScheduleDocument['_id']) => Schedule.find({_id: scheduledItemId})

export const getOneAndPopulate = (scheduledItemId: IScheduleDocument['_id']) => Schedule.findById(scheduledItemId).populate('hairdresser').populate('client').populate('service')

export const getAll = () => Schedule.find({}).populate('hairdresser').populate('client').populate('service').lean()

export const findOneByHairdresserDateAndHour = (hairdresserId: IStaffDocument['_id'], dateISO: IScheduleDocument['dateISO'], scheduledHour: IScheduleDocument['scheduledHour']) => Schedule.findOne({hairdresser: hairdresserId, dateISO: dateISO, scheduledHour: scheduledHour})


