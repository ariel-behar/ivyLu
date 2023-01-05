import Schedule from '../models/Schedule'

export const add = (clientId, hairdresserId, serviceId, date) => Schedule.create({clientId, hairdresserId, serviceId, date})

