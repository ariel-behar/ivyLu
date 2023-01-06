import mongoose from 'mongoose'
import format from 'date-fns/format/index.js'

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
    date: {
        type: Date, 
        required: true
    },
    dateISO: {
        type: String,
    },
    day: {
        type: String,
    },
    dayOfWeek: {
        type: String,
    },
    month: {
        type: String,
    },
    monthName: {
        type: String,
    },
    year: {
        type: String,
    },
    hour: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

scheduleSchema.pre('save', function (next) {
    this.dateISO = format(this.date, "dd/MM/yyyy")
    this.day = format(this.date, 'dd')
    this.dayOfWeek = format(this.date, 'EEEE')
    this.month = format(this.date, 'MM')
    this.monthName = format(this.date, 'MMMM')
    this.year = format(this.date, 'yyyy')

    next()
});

const Schedule = mongoose.model('Schedule', scheduleSchema, 'schedule');

export default Schedule;