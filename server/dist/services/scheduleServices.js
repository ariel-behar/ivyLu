import Schedule from '../models/Schedule.js';
export const create = ({ client, hairdresser, service, scheduledDate, scheduledHour }) => Schedule.create({ client, hairdresser, service, scheduledDate, scheduledHour });
export const getHairdresserSchedule = (hairdresserId) => Schedule.find({ hairdresser: hairdresserId }, { dateISO: 1, scheduledHour: 1, hairdresser: 1 }).populate('hairdresser', ['firstName', 'lastName']);
export const getClientSchedule = (clientId) => Schedule.find({ client: clientId }, { yearISO: 1, monthISO: 1, dayISO: 1, hourISO: 1, minutesISO: 1, hairdresser: 1, service: 1 }).populate('hairdresser', ['firstName', 'lastName', 'phone']).populate('service', ['title', 'duration', 'status']);
export const getOne = (scheduledItemId) => Schedule.find({ _id: scheduledItemId });
export const getOneAndPopulate = (scheduledItemId) => Schedule.findById(scheduledItemId).populate('hairdresser').populate('client').populate('service');
export const getAll = () => Schedule.find({}).populate('hairdresser').populate('client').populate('service').lean();
export const findOneByHairdresserDateAndHour = (hairdresserId, dateISO, scheduledHour) => Schedule.findOne({ hairdresser: hairdresserId, dateISO: dateISO, scheduledHour: scheduledHour });
//# sourceMappingURL=scheduleServices.js.map