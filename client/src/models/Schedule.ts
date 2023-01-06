import { IdType, Identifiable } from "../types/common/commonTypes";

export class Schedule implements Identifiable<IdType>{
    constructor(
        public _id: IdType,
        public clientId: IdType,
        public hairdresserId: IdType,
        public serviceId: IdType,
        public date: Date,
        public dateISO: string,
        public day: string,
        public dayOfWeek: string,
        public month: string,
        public monthName: string,
        public year: string,
        public hour: string
    ){}
}

export class ScheduleCreateDTO implements Omit<Schedule, '_id' | 'dateISO' | 'day' | 'dayOfWeek' | 'month' | 'monthName' | 'year' >{
    constructor(
        public clientId: IdType,
        public hairdresserId: IdType,
        public serviceId: IdType,
        public date: Date,
        public hour: string
    ){}
}
