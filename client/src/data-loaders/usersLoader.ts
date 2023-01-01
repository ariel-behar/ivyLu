import { User } from '../models/User';
import { ApiUser, ApiUserImpl } from '../services/userServices';
import { IdType } from '../types/common/commonTypes';

const userServices: ApiUser<IdType, User> = new ApiUserImpl<IdType, User>('users');


export async function getAllUsersLoader() {
    const users = await userServices.getAll()

    return users;
}

export async function getAllHairdressers() {
    const hairdressers = await userServices.getManyFilteredBy({role: 2})

    return hairdressers;
}

