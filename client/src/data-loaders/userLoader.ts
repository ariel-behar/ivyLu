import * as userServices from '../services/userServices'

export async function getAllUsersLoader() {
    const users = await userServices.getAll()

    return users;
}
