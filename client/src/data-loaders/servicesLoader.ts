import { LoaderFunctionArgs } from 'react-router-dom';
import { Service } from '../models/Service';
import { ApiEntity, ApiEntityImpl } from '../services/entityServices';
import { AuthTokenType, IdType } from '../types/common/common-types';
import { getAllHairdressers } from './staffLoader';

const entityServices: ApiEntity<IdType, Service, AuthTokenType> = new ApiEntityImpl<IdType, Service, AuthTokenType>('services');

export async function getAllServicesLoader() {
    const services = await entityServices.getAll()

    return services;
}

export async function getOneServicesLoader({params}: LoaderFunctionArgs) {
    if(typeof params.serviceId === 'string') {
        const service = await entityServices.getOne(params.serviceId)

        return service;
    }
}

export async function getOneServicesAndHairdressersLoader({params}: LoaderFunctionArgs) {
    if(typeof params.serviceId === 'string') {
        const service = await entityServices.getOne(params.serviceId)
        const hairdressers = await getAllHairdressers();

        return {service, hairdressers};
    }

}