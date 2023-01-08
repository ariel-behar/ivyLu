import Schedule from '../models/Schedule.js'

export const create = ({client, hairdresser, service, scheduledDate, scheduledHour}) => Schedule.create({client, hairdresser, service, scheduledDate, scheduledHour})

export const getHairdresserSchedule = (hairdresserId) => Schedule.find({hairdresserId}, {dateISO: 1, hour: 1, hairdresser: 1}).populate('hairdresserId',['firstName', 'lastName'])

export const getOne = (scheduledItemId) => Schedule.find({_id: scheduledItemId})

export const getOneAndPopulate = (scheduledItemId) => Schedule.findById(scheduledItemId).populate('hairdresser').populate('client').populate('service')

export const getAll = () => Schedule.find({}).populate('hairdresser').populate('client').populate('service').lean()

export const findOneByHairdresserDateAndHour = (hairdresser, dateISO, hour) => Schedule.findOne({hairdresser: hairdresser, dateISO: dateISO, hour: hour})


