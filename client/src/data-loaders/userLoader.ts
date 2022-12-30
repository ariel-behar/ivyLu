import { User } from '../models/User';
import { ApiClient, ApiClientImpl } from '../services/clientServices';
import { IdType, AuthTokenType } from '../types/common/commonTypes';

const clientServices: ApiClient<IdType, User, AuthTokenType> = new ApiClientImpl<IdType, User, AuthTokenType>('users');

export async function getAllUsersLoader() {
    const users = await clientServices.getAll()

    return users;
}
