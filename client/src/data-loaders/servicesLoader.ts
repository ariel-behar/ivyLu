import { LoaderFunctionArgs } from 'react-router-dom';
import * as serviceServices from '../services/serviceServices'

export async function getAllservicesLoader() {
    const services = await serviceServices.getAll()

    return services;
}

export async function getOneServicesLoader({params}: LoaderFunctionArgs) {
    if(typeof params.serviceId === 'string') {
        const service = await serviceServices.getOne(params.serviceId)

        return service;
    }

}