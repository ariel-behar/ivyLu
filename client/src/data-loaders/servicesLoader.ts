import { LoaderFunctionArgs } from 'react-router-dom';
import { Service } from '../models/Service';
import { ApiClient, ApiClientImpl } from '../services/clientServices';
import { AuthTokenType, IdType } from '../types/common/commonTypes';

const clientServices: ApiClient<IdType, Service, AuthTokenType> = new ApiClientImpl<IdType, Service, AuthTokenType>('services');

export async function getAllServicesLoader() {
    const services = await clientServices.getAll()

    return services;
}

export async function getOneServicesLoader({params}: LoaderFunctionArgs) {
    if(typeof params.serviceId === 'string') {
        const service = await clientServices.getOne(params.serviceId)

        return service;
    }

}