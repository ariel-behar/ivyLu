import { Router } from 'express'
import * as scheduleServices from '../services/scheduleServices.js'
import { isAuth, isClient, isHairdresserOperatorAdmin } from '../middlewares/authMiddleware.js'
import format from 'date-fns/format/index.js'

const router = Router();

router.get('/', isAuth, isHairdresserOperatorAdmin, async (req, res) => {
    try {
        let scheduleResponse = await scheduleServices.getAll()

        if (scheduleResponse) {
            let structuredScheduleResponse = scheduleResponse.map(scheduleItem => {
                let structuredScheduleItem = {
                    _id: scheduleItem._id,
                    client: {
                        firstName: scheduleItem.clientId.firstName,
                        lastName: scheduleItem.clientId.lastName,
                        phone: scheduleItem.clientId.phone,
                        gender: scheduleItem.clientId.gender,
                        email: scheduleItem.clientId.email,
                    },
                    hairdresser: {
                        firstName: scheduleItem.hairdresserId.firstName,
                        lastName: scheduleItem.hairdresserId.lastName,
                        phone: scheduleItem.hairdresserId.phone,
                        gender: scheduleItem.hairdresserId.gender,
                        imgUrl: scheduleItem.hairdresserId.imgUrl
                    },
                    service: {
                        title: scheduleItem.serviceId.title,
                        description: scheduleItem.serviceId.description,
                        imgUrl: scheduleItem.serviceId.imgUrl,
                        price: scheduleItem.serviceId.price,
                        duration: scheduleItem.serviceId.duration,
                    },
                    appointmentDetails: {
                        createdAt: scheduleItem.createdAt,
                        hour: scheduleItem.hour,
                        date: scheduleItem.date,
                        dateISO: scheduleItem.dateISO,
                        day: scheduleItem.day,
                        dayOfWeek: scheduleItem.dayOfWeek,
                        month: scheduleItem.month,
                        monthName: scheduleItem.monthName,
                        year: scheduleItem.year
                    }
                }

                return structuredScheduleItem
            })

            res.json(structuredScheduleResponse)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/:hairdresserId', async (req, res) => {
    const hairdresserId = req.params.hairdresserId;

    try {
        let hairdresserScheduleResponse = await scheduleServices.getHairdresserSchedule(hairdresserId)

        if (hairdresserScheduleResponse) {
            let hairdresserSchedule = {
                _id: hairdresserScheduleResponse[0].hairdresserId._id,
                firstName: hairdresserScheduleResponse[0].hairdresserId.firstName,
                lastName: hairdresserScheduleResponse[0].hairdresserId.lastName,
            }

            for (const scheduledItem of hairdresserScheduleResponse) {
                if (hairdresserSchedule.hasOwnProperty(scheduledItem.dateISO)) {
                    hairdresserSchedule[scheduledItem.dateISO].push(scheduledItem.hour)
                } else {
                    hairdresserSchedule[scheduledItem.dateISO] = [scheduledItem.hour]
                }
            }

            return res.json(hairdresserSchedule)
        }

    } catch (err) {
        if (err.message.includes('Cannot read properties of undefined')) {
            res.status(200).send({})
        } else {
            return res.status(500).json(err)
        }
    }
})

router.post('/create', isAuth, isClient, async (req, res) => {
    const { clientId, hairdresserId, serviceId, date, hour } = req.body;

    try {
        let formattedDateISO = format(new Date(date), "dd/MM/yyyy")

        let appointmentExists = await scheduleServices.findOneByHairdresserDateAndHour(hairdresserId, formattedDateISO, hour)
        console.log('appointmentExists:', appointmentExists)

        if (appointmentExists) {
            throw { statusCode: 403, message: "An appointment on this Date and Hour already exists. Please pick another time" }
        } else {
            try {
                let createScheduleItemResponse = await scheduleServices.create({ clientId, hairdresserId, serviceId, date, hour })

                if (createScheduleItemResponse) {
                    let scheduledItemId = createScheduleItemResponse._id;

                    try {
                        let scheduledItemResponse = await scheduleServices.getOneAndPopulate(scheduledItemId)

                        let scheduledItem = {
                            _id: scheduledItemResponse._id,
                            client: {
                                firstName: scheduledItemResponse.clientId.firstName,
                                lastName: scheduledItemResponse.clientId.lastName,
                                phone: scheduledItemResponse.clientId.phone,
                                gender: scheduledItemResponse.clientId.gender,
                                email: scheduledItemResponse.clientId.email,
                            },
                            hairdresser: {
                                firstName: scheduledItemResponse.hairdresserId.firstName,
                                lastName: scheduledItemResponse.hairdresserId.lastName,
                                phone: scheduledItemResponse.hairdresserId.phone,
                                gender: scheduledItemResponse.hairdresserId.gender,
                                imgUrl: scheduledItemResponse.hairdresserId.imgUrl
                            },
                            service: {
                                title: scheduledItemResponse.serviceId.title,
                                description: scheduledItemResponse.serviceId.description,
                                imgUrl: scheduledItemResponse.serviceId.imgUrl,
                                price: scheduledItemResponse.serviceId.price,
                                duration: scheduledItemResponse.serviceId.duration,
                            },
                            appointmentDetails: {
                                hour: scheduledItemResponse.hour,
                                date: scheduledItemResponse.date,
                                dateISO: scheduledItemResponse.dateISO,
                                day: scheduledItemResponse.day,
                                dayOfWeek: scheduledItemResponse.dayOfWeek,
                                month: scheduledItemResponse.month,
                                monthName: scheduledItemResponse.monthName,
                                year: scheduledItemResponse.year
                            }
                        }
                        res.json(scheduledItem)
                    } catch (err) {
                        res.status(err.statusCode ? err.statusCode : 500).json(err)
                    }
                }
            } catch (err) {
                res.status(err.statusCode ? err.statusCode : 500).json(err)
            }
        }
    } catch (err) {
        res.status(err.statusCode ? err.statusCode : 500).json(err)
    }
})


export default router;