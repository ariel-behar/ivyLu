import { IdType, Identifiable } from "../types/common/common-types";
export class Schedule implements Identifiable<IdType>{
    constructor(
        public _id: IdType,
        public client: IdType,
        public hairdresser: IdType,
        public service: IdType,
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
        public client: IdType,
        public hairdresser: IdType,
        public service: IdType,
        public scheduledDate: Date,
        public scheduledHour: string
    ){}
}
