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
                        firstName: scheduleItem.client.firstName,
                        lastName: scheduleItem.client.lastName,
                        phone: scheduleItem.client.phone,
                        gender: scheduleItem.client.gender,
                        email: scheduleItem.client.email,
                    },
                    hairdresser: {
                        firstName: scheduleItem.hairdresser.firstName,
                        lastName: scheduleItem.hairdresser.lastName,
                        phone: scheduleItem.hairdresser.phone,
                        gender: scheduleItem.hairdresser.gender,
                        imgUrl: scheduleItem.hairdresser.imgUrl
                    },
                    service: {
                        title: scheduleItem.service.title,
                        description: scheduleItem.service.description,
                        imgUrl: scheduleItem.service.imgUrl,
                        price: scheduleItem.service.price,
                        duration: scheduleItem.service.duration,
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
    console.log(req.body);
    const { client, hairdresser, service, scheduledDate, scheduledHour } = req.body;

    try {
        let formattedDateISO = format(new Date(scheduledDate), "dd/MM/yyyy")

        let appointmentExists = await scheduleServices.findOneByHairdresserDateAndHour(hairdresser, formattedDateISO, scheduledHour)

        if (appointmentExists) {
            throw { statusCode: 403, message: "An appointment on this Date and Hour already exists. Please pick another time" }
        } else {
            try {
                let createScheduleItemResponse = await scheduleServices.create({ client, hairdresser, service, scheduledDate , scheduledHour })

                if (createScheduleItemResponse) {
                    let scheduledItemId = createScheduleItemResponse._id;

                    try {
                        let scheduledItemResponse = await scheduleServices.getOneAndPopulate(scheduledItemId)

                        let scheduledItem = {
                            _id: scheduledItemResponse._id,
                            client: {
                                firstName: scheduledItemResponse.client.firstName,
                                lastName: scheduledItemResponse.client.lastName,
                                phone: scheduledItemResponse.client.phone,
                                gender: scheduledItemResponse.client.gender,
                                email: scheduledItemResponse.client.email,
                            },
                            hairdresser: {
                                firstName: scheduledItemResponse.hairdresser.firstName,
                                lastName: scheduledItemResponse.hairdresser.lastName,
                                phone: scheduledItemResponse.hairdresser.phone,
                                gender: scheduledItemResponse.hairdresser.gender,
                                imgUrl: scheduledItemResponse.hairdresser.imgUrl
                            },
                            service: {
                                title: scheduledItemResponse.service.title,
                                description: scheduledItemResponse.service.description,
                                imgUrl: scheduledItemResponse.service.imgUrl,
                                price: scheduledItemResponse.service.price,
                                duration: scheduledItemResponse.service.duration,
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