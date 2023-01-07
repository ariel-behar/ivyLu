import Schedule from '../models/Schedule.js'

export const create = ({clientId, hairdresserId, serviceId, date, hour}) => Schedule.create({clientId, hairdresserId, serviceId, date, hour})

export const getHairdresserSchedule = (hairdresserId) => Schedule.find({hairdresserId}, {dateISO: 1, hour: 1, hairdresserId: 1}).populate('hairdresserId',['firstName', 'lastName'])

export const getOne = (scheduledItemId) => Schedule.find({_id: scheduledItemId})

export const getOneAndPopulate = (scheduledItemId) => Schedule.findById(scheduledItemId).populate('hairdresserId').populate('clientId').populate('serviceId')

export const getAll = () => Schedule.find({}).populate('hairdresserId').populate('clientId').populate('serviceId').lean()

export const findOneByHairdresserDateAndHour = (hairdresserId, dateISO, hour) => Schedule.findOne({hairdresserId: hairdresserId, dateISO: dateISO, hour: hour})


