import { Schedule } from "../../models/Schedule";
import { Service } from "../../models/Service";
import { User } from "../../models/User";
import { IdType } from "./commonTypes";

export interface ScheduleConfirmationResponseInterface {
    _id: IdType,
    client: User,
    hairdresser: User,
    service: Service,
    appointmentDetails: Schedule
}