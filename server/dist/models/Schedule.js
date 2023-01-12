import mongoose from 'mongoose';
import format from 'date-fns/format/index.js';
const scheduleSchema = new mongoose.Schema({
    client: {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    hairdresser: {
        type: mongoose.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    service: {
        type: mongoose.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    scheduledDate: {
        type: Date,
        required: true
    },
    dateISO: {
        type: String,
    },
    dayISO: {
        type: String,
    },
    dayOfWeek: {
        type: String,
    },
    monthISO: {
        type: String,
    },
    monthName: {
        type: String,
    },
    yearISO: {
        type: String,
    },
    scheduledHour: {
        type: String,
        required: true
    },
    hourISO: {
        type: String,
    },
    minutesISO: {
        type: String
    }
}, {
    timestamps: true
});
scheduleSchema.pre('save', function (next) {
    this.dateISO = format(this.scheduledDate, "dd/MM/yyyy");
    this.dayISO = format(this.scheduledDate, 'd');
    this.dayOfWeek = format(this.scheduledDate, 'EEEE');
    this.monthISO = format(this.scheduledDate, 'M');
    this.monthName = format(this.scheduledDate, 'MMMM');
    this.yearISO = format(this.scheduledDate, 'yyyy');
    this.hourISO = this.scheduledHour.substring(0, 2);
    this.minutesISO = this.scheduledHour.substring(3, 5);
    next();
});
const Schedule = mongoose.model('Schedule', scheduleSchema, 'schedule');
export default Schedule;
//# sourceMappingURL=Schedule.js.map