import { LoaderFunctionArgs } from 'react-router-dom';
import { User } from '../models/User';
import { ApiUser, ApiUserImpl } from '../services/userServices';
import { AuthTokenType, IdType } from '../types/common/common-types';

const userServices: ApiUser<IdType, User,AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>('staff');

export async function getAllStaffLoader() {
    let user = await localStorage.getItem('user')
    let parsedUser: object | null;
    let authToken: string;
    let staffMembers;

    if(user) {
        parsedUser = JSON.parse(user)
        if(parsedUser) {
            try {
                authToken = parsedUser['authToken' as keyof typeof parsedUser]
                staffMembers = await userServices.getAll(authToken)
    
                return staffMembers;
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

export async function getOneStaffMemberLoader({params}: LoaderFunctionArgs) {
    let user = await localStorage.getItem('user')
    let parsedUser: object | null;
    let authToken: string;
    
    if(typeof params.userId === 'string') {
        if(user) {
            parsedUser = JSON.parse(user)
            if(parsedUser) {
                authToken = parsedUser['authToken' as keyof typeof parsedUser]
                try {
                    const staffMember = await userServices.getOne(params.userId, authToken)

                    return staffMember;
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
}