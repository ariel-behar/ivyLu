import mongoose from 'mongoose'
import format from 'date-fns/format/index.js'
import { IdType } from '../types/common-types';
import { IClientDocument } from './Client';
import { IStaffDocument } from './Staff';
import { IServiceDocument } from './Service';

export interface IScheduleCreate {
    client: IdType,
    hairdresser: IdType,
    service: IdType,
    scheduledDate: Date,
    scheduledHour: string,
}

export interface IScheduleDocument {
    _id: IdType,
    client: IdType | IClientDocument,
    hairdresser: IdType | IStaffDocument,
    service: IdType | IServiceDocument,
    scheduledDate: Date,
    dateISO: string,
    dayISO: string,
    dayOfWeek: string,
    monthISO: string,
    monthName: string,
    yearISO: string,
    scheduledHour: string,
    hourISO: string,
    minutesISO: string
}

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
},{
    timestamps: true
});

scheduleSchema.pre('save', function (next: (err?: Error) => void) {
    this.dateISO = format(this.scheduledDate, "dd/MM/yyyy")
    this.dayISO = format(this.scheduledDate, 'd')
    this.dayOfWeek = format(this.scheduledDate, 'EEEE')
    this.monthISO = format(this.scheduledDate, 'M')
    this.monthName = format(this.scheduledDate, 'MMMM')
    this.yearISO = format(this.scheduledDate, 'yyyy')
    
    this.hourISO = this.scheduledHour.substring(0,2)
    this.minutesISO = this.scheduledHour.substring(3,5)
    next()
});

const Schedule = mongoose.model<IScheduleDocument>('Schedule', scheduleSchema, 'schedule');

export default Schedule;