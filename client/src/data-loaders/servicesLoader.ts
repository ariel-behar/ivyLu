import { LoaderFunctionArgs } from 'react-router-dom';
import { Service } from '../models/Service';
import { ApiClient, ApiClientImpl } from '../services/clientServices';
import { AuthTokenType, IdType } from '../types/common/commonTypes';
import { getAllHairdressers } from './staffLoader';

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

export async function getOneServicesAndHairdressersLoader({params}: LoaderFunctionArgs) {
    if(typeof params.serviceId === 'string') {
        const service = await clientServices.getOne(params.serviceId)
        const hairdressers = await getAllHairdressers();

        return {service, hairdressers};
    }

}