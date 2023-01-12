import Schedule from '../models/Schedule.js';
export const create = ({ client, hairdresser, service, scheduledDate, scheduledHour }) => Schedule.create({ client, hairdresser, service, scheduledDate, scheduledHour });
export const getHairdresserSchedule = (hairdresserId) => Schedule.find({ hairdresser: hairdresserId }, { dateISO: 1, scheduledHour: 1, hairdresser: 1 }).populate('hairdresser', ['firstName', 'lastName']);
export const getOne = (scheduledItemId) => Schedule.find({ _id: scheduledItemId });
export const getOneAndPopulate = (scheduledItemId) => Schedule.findById(scheduledItemId).populate('hairdresser').populate('client').populate('service');
export const getAll = () => Schedule.find({}).populate('hairdresser').populate('client').populate('service').lean();
export const findOneByHairdresserDateAndHour = (hairdresserId, dateISO, scheduledHour) => Schedule.findOne({ hairdresser: hairdresserId, dateISO: dateISO, scheduledHour: scheduledHour });
//# sourceMappingURL=scheduleServices.js.map