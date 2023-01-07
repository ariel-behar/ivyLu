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
                    title: `${scheduleItem.hairdresserId.firstName} ${scheduleItem.hairdresserId.lastName}: ${scheduleItem.serviceId.title}`,
                    start: scheduleItem.date,
                    end: scheduleItem.date,
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
                let createScheduleItemResponse = await scheduleServices.create({ clientId, hairdresserId, serviceId, scheduledDate: date , scheduledHour: hour })

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