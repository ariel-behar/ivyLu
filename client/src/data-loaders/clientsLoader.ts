import { User } from '../models/User';
import { ApiUser, ApiUserImpl } from '../services/userServices';
import { AuthTokenType, IdType } from '../types/common/common-types';

const userServices: ApiUser<IdType, User, AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>('clients');

export async function getAllClientsLoader() {
    const users = await userServices.getAll()

    return users;
}

