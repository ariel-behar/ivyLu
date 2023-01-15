
import { User } from '../models/User';
import * as orderServices from '../services/orderServices'

export async function getAllOrdersLoader() {
    let user = localStorage.getItem('user')
    let parsedUser: User | null;
    let authToken: string;
    let orders;

    if(user) {
        parsedUser = JSON.parse(user)
        if(parsedUser) {
            try {
                authToken = parsedUser.authToken
                orders = await orderServices.getAll(authToken)
    
                return orders;
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