import { User } from "../models/User";
import * as scheduleServices from "../services/scheduleServices";
import { IdType } from "../types/common/common-types";

export async function getScheduleForAllLoader() {
    let user = await localStorage.getItem('user')
    let parsedUser: User | null;
    let authToken: string;
    let scheduleItems;

    if(user) {
        parsedUser = JSON.parse(user)
        if(parsedUser?._id) {
            try {
                authToken = parsedUser.authToken
                scheduleItems = await scheduleServices.getAll(authToken)
    
                return scheduleItems;
            } catch (err) {
                let error;
                if(err instanceof Error) {
                    error = err
                } else {
                    error = await err as object
                }

                throw { message: `${error['message' as keyof typeof error]}` }
            }
        }
        else {
            return null;
        }
    } else {
        return null;
    }
}

export async function getClientScheduleLoader() {
    let user = await localStorage.getItem('user')
    let parsedUser: User | null;
    let authToken: string;
    let userId: IdType;
    let scheduleItems;

    if(user) {
        parsedUser = JSON.parse(user)
        if(parsedUser?._id) {
            try {
                authToken = parsedUser.authToken
                userId = parsedUser._id 
                scheduleItems = await scheduleServices.getClientSchedule(userId, authToken)
    
                return scheduleItems;
            } catch (err) {
                let error;
                if(err instanceof Error) {
                    error = err
                } else {
                    error = await err as object
                }

                throw { message: `${error['message' as keyof typeof error]}` }
            }
        }
        else {
            return null;
        }
    } else {
        return null;
    }
}

