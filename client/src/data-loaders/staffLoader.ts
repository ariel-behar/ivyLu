import { User } from '../models/User';
import { ApiUser, ApiUserImpl } from '../services/userServices';
import { AuthTokenType, IdType } from '../types/common/commonTypes';

const userServices: ApiUser<IdType, User,AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>('staff');

export async function getAllStaffLoader() {
    const users = await userServices.getAll()

    return users;
}

export async function getAllHairdressers() {
    const hairdressers = await userServices.getManyFilteredBy({role: 2})

    return hairdressers;
}
