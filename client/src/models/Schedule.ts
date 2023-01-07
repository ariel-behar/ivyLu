import { IdType, Identifiable } from "../types/common/commonTypes";

export class Schedule implements Identifiable<IdType>{
    constructor(
        public _id: IdType,
        public clientId: IdType,
        public hairdresserId: IdType,
        public serviceId: IdType,
        public scheduledDate: Date,
        public dateISO: string,
        public dayISO: string,
        public dayOfWeek: string,
        public monthISO: string,
        public monthName: string,
        public yearISO: string,
        public scheduledHour: string,
        public hourISO: string,
        public minutesISO: string
    ){}
}

export class ScheduleCreateDTO implements Omit<Schedule, '_id' | 'dateISO' | 'dayISO' | 'dayOfWeek' | 'monthISO' | 'monthName' | 'yearISO' | 'hourISO' | 'minutesISO' >{
    constructor(
        public clientId: IdType,
        public hairdresserId: IdType,
        public serviceId: IdType,
        public scheduledDate: Date,
        public scheduledHour: string
    ){}
}
