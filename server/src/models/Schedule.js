import mongoose from 'mongoose'
import {format} from 'date-fns/format'

const scheduleSchema = mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    hairdresserId: {
        type: mongoose.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    serviceId: {
        type: mongoose.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    fullDate: {
        type: Date, 
        required: true
    },
    fullDateISO: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    dayOfWeek: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    monthName: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

scheduleSchema.pre('save', function (next) {
    this.fullDateISO = format(this.Date, "dd/MM/yyyy")
    this.day = format(this.Date, 'dd')
    this.dayOfWeek = format(this.Date, 'EEEE')
    this.month = format(this.Date, 'MM')
    this.monthName = format(this.Date, 'MMMM')
    this.year = format(this.Date, 'yyyy')
    this.hour = format(this.Date, 'hh:mm')

    next()
});

const Schedule = mongoose.model('Schedule', scheduleSchema, 'schedule');

export default Schedule;