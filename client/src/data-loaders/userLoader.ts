import { User } from '../models/User';
import { ApiClient, ApiClientImpl } from '../services/clientServices';
import { IdType } from '../types/common/commonTypes';

const clientServices: ApiClient<IdType, User> = new ApiClientImpl<IdType, User>('users');

export async function getAllUsersLoader() {
    const users = await clientServices.getAll()

    return users;
}
