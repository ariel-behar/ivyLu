import * as serviceServices from '../services/serviceServices'

export async function getAllservicesLoader() {
    const services = await serviceServices.getAll()

    return services;
}