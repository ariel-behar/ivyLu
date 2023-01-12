import * as scheduleServices from "../services/scheduleServices";

export async function getScheduleForAllLoader() {
    let user = await localStorage.getItem('user')
    let parsedUser: object | null;
    let authToken: string;
    let scheduleItems;

    if(user) {
        parsedUser = JSON.parse(user)
        if(parsedUser) {
            try {
                authToken = parsedUser['authToken' as keyof typeof parsedUser]
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
    }
}