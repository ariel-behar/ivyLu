var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import * as scheduleServices from '../services/scheduleServices.js';
import { isAuth, isClient, isHairdresserOperatorAdmin } from '../middlewares/authMiddleware.js';
import format from 'date-fns/format/index.js';
const router = Router();
router.get('/', isAuth, isHairdresserOperatorAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let scheduleResponse = yield scheduleServices.getAll();
        if (scheduleResponse) {
            let structuredScheduleResponse = scheduleResponse.map((scheduleItem) => {
                let client;
                let hairdresser;
                let service;
                if (typeof scheduleItem.client != 'string') {
                    client = {
                        firstName: scheduleItem.client.firstName,
                        lastName: scheduleItem.client.lastName,
                        phone: scheduleItem.client.phone,
                        gender: scheduleItem.client.gender,
                        email: scheduleItem.client.email,
                    };
                }
                if (typeof scheduleItem.hairdresser != 'string') {
                    hairdresser = {
                        firstName: scheduleItem.hairdresser.firstName,
                        lastName: scheduleItem.hairdresser.lastName,
                        phone: scheduleItem.hairdresser.phone,
                        gender: scheduleItem.hairdresser.gender,
                        imgUrl: scheduleItem.hairdresser.imgUrl
                    };
                }
                if (typeof scheduleItem.service != 'string') {
                    service = {
                        title: scheduleItem.service.title,
                        description: scheduleItem.service.description,
                        imgUrl: scheduleItem.service.imgUrl,
                        price: scheduleItem.service.price,
                        duration: scheduleItem.service.duration,
                    };
                }
                return {
                    _id: scheduleItem._id,
                    client,
                    hairdresser,
                    service,
                    appointmentDetails: {
                        scheduledDate: scheduleItem.scheduledDate,
                        dateISO: scheduleItem.dateISO,
                        dayISO: scheduleItem.dayISO,
                        dayOfWeek: scheduleItem.dayOfWeek,
                        monthISO: scheduleItem.monthISO,
                        monthName: scheduleItem.monthName,
                        yearISO: scheduleItem.yearISO,
                        scheduledHour: scheduleItem.scheduledHour,
                        hourISO: scheduleItem.hourISO,
                        minutesISO: scheduleItem.minutesISO
                    }
                };
            });
            res.json(structuredScheduleResponse);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get('/:hairdresserId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hairdresserId = req.params.hairdresserId;
    try {
        let hairdresserScheduleResponse = yield scheduleServices.getHairdresserSchedule(hairdresserId);
        if (hairdresserScheduleResponse) {
            let hairdresserSchedule = {
                _id: '',
                firstName: '',
                lastName: ''
            };
            let appointments = {};
            if (typeof hairdresserScheduleResponse[0].hairdresser != 'string') {
                hairdresserSchedule = {
                    _id: hairdresserScheduleResponse[0].hairdresser._id,
                    firstName: hairdresserScheduleResponse[0].hairdresser.firstName,
                    lastName: hairdresserScheduleResponse[0].hairdresser.lastName,
                };
            }
            for (const scheduledItem of hairdresserScheduleResponse) {
                if (hairdresserScheduleResponse.hasOwnProperty(scheduledItem.dateISO)) {
                    appointments[scheduledItem.dateISO].push(scheduledItem.scheduledHour);
                }
                else {
                    appointments[scheduledItem.dateISO] = [scheduledItem.scheduledHour];
                }
            }
            console.log(hairdresserSchedule, appointments);
            return res.json(Object.assign(Object.assign({}, hairdresserSchedule), { appointments }));
        }
    }
    catch (err) {
        if (err.message.includes('Cannot read properties of undefined')) {
            res.status(200).send({});
        }
        else {
            return res.status(500).json(err);
        }
    }
}));
router.post('/create', isAuth, isClient, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { clientId, hairdresserId, serviceId, scheduledDate, scheduledHour } = req.body;
    try {
        let formattedDateISO = format(new Date(scheduledDate), "dd/MM/yyyy");
        let appointmentExists = yield scheduleServices.findOneByHairdresserDateAndHour(hairdresserId, formattedDateISO, scheduledHour);
        if (appointmentExists) {
            throw { statusCode: 403, message: "An appointment on this Date and Hour already exists. Please pick another time" };
        }
        else {
            try {
                let createScheduleItemResponse = yield scheduleServices.create({ client: clientId, hairdresser: hairdresserId, service: serviceId, scheduledDate, scheduledHour });
                if (createScheduleItemResponse) {
                    let scheduledItemId = createScheduleItemResponse._id;
                    try {
                        let scheduledItemResponse = yield scheduleServices.getOneAndPopulate(scheduledItemId);
                        if (scheduledItemResponse != null) {
                            let client;
                            let hairdresser;
                            let service;
                            if (typeof scheduledItemResponse.client != 'string') {
                                client = {
                                    firstName: scheduledItemResponse.client.firstName,
                                    lastName: scheduledItemResponse.client.lastName,
                                    phone: scheduledItemResponse.client.phone,
                                    gender: scheduledItemResponse.client.gender,
                                    email: scheduledItemResponse.client.email,
                                };
                            }
                            if (typeof scheduledItemResponse.hairdresser != 'string') {
                                hairdresser = {
                                    firstName: scheduledItemResponse.hairdresser.firstName,
                                    lastName: scheduledItemResponse.hairdresser.lastName,
                                    phone: scheduledItemResponse.hairdresser.phone,
                                    gender: scheduledItemResponse.hairdresser.gender,
                                    imgUrl: scheduledItemResponse.hairdresser.imgUrl
                                };
                            }
                            if (typeof scheduledItemResponse.service != 'string') {
                                service = {
                                    title: scheduledItemResponse.service.title,
                                    description: scheduledItemResponse.service.description,
                                    imgUrl: scheduledItemResponse.service.imgUrl,
                                    price: scheduledItemResponse.service.price,
                                    duration: scheduledItemResponse.service.duration,
                                };
                            }
                            let scheduledItem = {
                                _id: scheduledItemResponse._id,
                                client,
                                hairdresser,
                                service,
                                appointmentDetails: {
                                    scheduledDate: scheduledItemResponse.scheduledDate,
                                    dateISO: scheduledItemResponse.dateISO,
                                    dayISO: scheduledItemResponse.dayISO,
                                    dayOfWeek: scheduledItemResponse.dayOfWeek,
                                    monthISO: scheduledItemResponse.monthISO,
                                    monthName: scheduledItemResponse.monthName,
                                    yearISO: scheduledItemResponse.yearISO,
                                    scheduledHour: scheduledItemResponse.scheduledHour,
                                    hourISO: scheduledItemResponse.hourISO,
                                    minutesISO: scheduledItemResponse.minutesISO
                                }
                            };
                            res.json(scheduledItem);
                        }
                    }
                    catch (err) {
                        res.status(err.statusCode ? err.statusCode : 500).json(err);
                    }
                }
            }
            catch (err) {
                res.status(err.statusCode ? err.statusCode : 500).json(err);
            }
        }
    }
    catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err);
    }
}));
export default router;
//# sourceMappingURL=scheduleController.js.map