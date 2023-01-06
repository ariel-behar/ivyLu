import Schedule from '../models/Schedule.js'

export const create = ({clientId, hairdresserId, serviceId, date, hour}) => Schedule.create({clientId, hairdresserId, serviceId, date, hour})

export const getHairdresserSchedule = (hairdresserId) => Schedule.find({hairdresserId}).lean();

export const getOne = (scheduledItemId) => Schedule.find({_id: scheduledItemId})

export const getOneAndPopulate = (scheduledItemId) => Schedule.findById(scheduledItemId).populate('hairdresserId').populate('clientId').populate('serviceId')

export const findOneByDateAndHour = (dateISO, hour) => Schedule.findOne({dateISO: dateISO, hour: hour})

