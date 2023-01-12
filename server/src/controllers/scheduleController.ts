import { Router, Request, Response } from 'express'
import * as scheduleServices from '../services/scheduleServices.js'
import { isAuth, isClient, isHairdresserOperatorAdmin } from '../middlewares/authMiddleware.js'
import format from 'date-fns/format/index.js'
import { IStaffDocument } from '../models/Staff.js';
import { Document, LeanDocument } from 'mongoose';
import { IScheduleDocument } from '../models/Schedule.js';
import { IClientDocument } from '../models/Client.js';
import { IServiceDocument } from '../models/Service.js';
import { IdType } from '../types/common-types.js';

const router = Router();

router.get('/', isAuth, isHairdresserOperatorAdmin, async (req: Request, res: Response) => {
    try {
        let scheduleResponse: LeanDocument<IScheduleDocument>[] | null = await scheduleServices.getAll()

        if (scheduleResponse) {
            let structuredScheduleResponse = scheduleResponse.map((scheduleItem: IScheduleDocument) => {
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
                    }
                }

                if (typeof scheduleItem.hairdresser != 'string') {
                    hairdresser = {
                        firstName: scheduleItem.hairdresser.firstName,
                        lastName: scheduleItem.hairdresser.lastName,
                        phone: scheduleItem.hairdresser.phone,
                        gender: scheduleItem.hairdresser.gender,
                        imgUrl: scheduleItem.hairdresser.imgUrl
                    }
                }

                if (typeof scheduleItem.service != 'string') {
                    service = {
                        title: scheduleItem.service.title,
                        description: scheduleItem.service.description,
                        imgUrl: scheduleItem.service.imgUrl,
                        price: scheduleItem.service.price,
                        duration: scheduleItem.service.duration,
                    }
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
                }
            })

            res.json(structuredScheduleResponse)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/:hairdresserId', async (req: Request, res: Response) => {
    const hairdresserId = req.params.hairdresserId;

    try {
        let hairdresserScheduleResponse: IScheduleDocument[] | null = await scheduleServices.getHairdresserSchedule(hairdresserId)

        if (hairdresserScheduleResponse) {
            let hairdresserSchedule: {
                _id: IStaffDocument['_id'],
                firstName: IStaffDocument['firstName'],
                lastName: IStaffDocument['lastName'],
            } = {
                _id: '',
                firstName: '',
                lastName: ''
            };

            let appointments: {
                [key: string]: string[],
            } = {};

            if (typeof hairdresserScheduleResponse[0].hairdresser != 'string') {
                hairdresserSchedule = {
                    _id: hairdresserScheduleResponse[0].hairdresser._id,
                    firstName: hairdresserScheduleResponse[0].hairdresser.firstName,
                    lastName: hairdresserScheduleResponse[0].hairdresser.lastName,
                }
            }

            for (const scheduledItem of hairdresserScheduleResponse) {
                if (appointments.hasOwnProperty(scheduledItem.dateISO)) {
                    appointments[scheduledItem.dateISO].push(scheduledItem.scheduledHour)
                } else {
                    appointments[scheduledItem.dateISO] = [scheduledItem.scheduledHour]
                }
            }

            return res.json({...hairdresserSchedule, appointments})
        }

    } catch (err: any) {
        if (err.message.includes("Cannot read properties of undefined")) {
            // In case no scheduled items have been found in the collection
            res.status(200)
        } else {
            return res.status(500).json(err)
        }
    }
})

router.post('/create', isAuth, isClient, async (req: Request, res: Response) => {
    const { clientId, hairdresserId, serviceId, scheduledDate, scheduledHour } = req.body;

    try {
        let formattedDateISO = format(new Date(scheduledDate), "dd/MM/yyyy")

        let appointmentExists = await scheduleServices.findOneByHairdresserDateAndHour(hairdresserId, formattedDateISO, scheduledHour)

        if (appointmentExists) {
            throw { statusCode: 403, message: "An appointment on this Date and Hour already exists. Please pick another time" }
        } else {
            try {
                let createScheduleItemResponse: IScheduleDocument | null= await scheduleServices.create({ client: clientId, hairdresser: hairdresserId, service: serviceId, scheduledDate, scheduledHour })

                if (createScheduleItemResponse) {
                    let scheduledItemId = createScheduleItemResponse._id;

                    try {
                        let scheduledItemResponse: IScheduleDocument | null = await scheduleServices.getOneAndPopulate(scheduledItemId)

                        if(scheduledItemResponse != null ) {
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
                                }
                            }
            
                            if (typeof scheduledItemResponse.hairdresser != 'string') {
                                hairdresser = {
                                    firstName: scheduledItemResponse.hairdresser.firstName,
                                    lastName: scheduledItemResponse.hairdresser.lastName,
                                    phone: scheduledItemResponse.hairdresser.phone,
                                    gender: scheduledItemResponse.hairdresser.gender,
                                    imgUrl: scheduledItemResponse.hairdresser.imgUrl
                                }
                            }
            
                            if (typeof scheduledItemResponse.service != 'string') {
                                service = {
                                    title: scheduledItemResponse.service.title,
                                    description: scheduledItemResponse.service.description,
                                    imgUrl: scheduledItemResponse.service.imgUrl,
                                    price: scheduledItemResponse.service.price,
                                    duration: scheduledItemResponse.service.duration,
                                }
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
                            }

                            res.json(scheduledItem)
                        }
                      
                    } catch (err: any) {
                        res.status(err.statusCode ? err.statusCode : 500).json(err)
                    }
                }
            } catch (err: any) {
                res.status(err.statusCode ? err.statusCode : 500).json(err)
            }
        }
    } catch (err: any) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }
})


export default router;