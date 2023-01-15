import { Schedule } from "../models/Schedule";
import { Service } from "../models/Service";
import { User } from "../models/User";
import { IdType } from "./common/common-types";

export interface IScheduleConfirmationResponse {
    _id: IdType,
    client: User,
    hairdresser: User,
    service: Service,
    appointmentDetails?: Schedule,
    dayISO?: string,
    monthISO?: string,
    yearISO?: string,
    hourISO?: string,
    minutesISO?: string
}