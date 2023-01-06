import { Schedule } from "../../models/Schedule";
import { Service } from "../../models/Service";
import { User } from "../../models/User";
import { IdType } from "./commonTypes";

export interface ScheduledItemConfirmationResponseInterface {
    _id: IdType,
    client: User,
    hairdresser: User,
    service: Service,
    appointmentDetails: Schedule
}