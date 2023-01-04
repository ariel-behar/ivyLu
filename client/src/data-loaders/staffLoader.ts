import { User } from '../models/User';
import { ApiUser, ApiUserImpl } from '../services/userServices';
import { AuthTokenType, IdType } from '../types/common/commonTypes';

const userServices: ApiUser<IdType, User,AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>('staff');

export async function getAllStaffLoader() {
    let user = await localStorage.getItem('user')
    let parsedUser: object | null;
    let authToken: string;
    let staff;

    if(user) {
        parsedUser = JSON.parse(user)
        if(parsedUser) {
            try {
                authToken = parsedUser['authToken' as keyof typeof parsedUser]
                staff = await userServices.getAll(authToken)
    
                return staff;
            } catch (err) {
                let error;
                if(err instanceof Error) {
                    error = err
                } else {
                    error = await err as object
                }

                throw { message: `Unauthorized: ${error['message' as keyof typeof error]}` }
            }
        }
    }
}

export async function getAllHairdressers() {
    const hairdressers = await userServices.getManyFilteredBy({role: 2})

    return hairdressers;
}
