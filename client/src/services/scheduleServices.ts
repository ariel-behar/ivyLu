import { ScheduleCreateDTO } from "../models/Schedule";
import { AuthTokenType, IdType } from "../types/common/common-types";
import request from "../utils/request";
import { baseUrl } from "./api";

let scheduleUrl = `${baseUrl}/schedule`


export const getHairdresserSchedule = (hairdresserId: IdType) => request(`${scheduleUrl}/${hairdresserId}`, 'GET')

export const create = (scheduleItemWithoutId: ScheduleCreateDTO, authToken: AuthTokenType) => request(`${scheduleUrl}/create`, 'POST', scheduleItemWithoutId, authToken);

export const getAll = (authToken: AuthTokenType) => request(`${scheduleUrl}`, 'GET', undefined, authToken);







// export interface ApiSchedule<I, E extends Identifiable<I>, A extends AuthTokenType> {

//     getHairdresserSchedule(hairdresserId: I): Promise<E | E[]>

//     // getOne(entityId: I): Promise<E>;
//     getAll(authToken: A): Promise<E[]>;
//     create(appointmentWithoutId: Omit<E, '_id' |'client' | 'hairdresser' | 'service' | 'dateISO' | 'dayISO' | 'dayOfWeek' | 'monthISO' | 'monthName' | 'yearISO' | 'hourISO' | 'minutesISO'>, authToken: A): Promise<E>;
//     // update(entityId: I, entity: E, authToken: A): Promise<E>;
//     // deleteOne(entityId: I, entity: undefined, authToken: A): Promise<string>;
// }

// export class ApiScheduleImpl<I, E extends Identifiable<I>, A extends AuthTokenType> implements ApiSchedule<I,E,A> {
//     constructor(public apiCollectionSuffix: string) {}


//     getHairdresserSchedule(hairdresserId: I): Promise<E | E[]> {
//         return request(`${baseUrl}/${this.apiCollectionSuffix}/${hairdresserId}`, 'GET')
//     }

//     create(appointmentWithoutId: Omit<E, "_id" |'client' | 'hairdresser' | 'service' | 'dateISO' | 'dayISO' | 'dayOfWeek' | 'monthISO' | 'monthName' | 'yearISO' | 'hourISO' | 'minutesISO'>, authToken: A): Promise<E> {
//         return request(`${baseUrl}/${this.apiCollectionSuffix}/create`, 'POST', appointmentWithoutId, authToken);
//     }

//     // getOne(entityId: I): Promise<E> {
//     //     return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}`, 'GET');
//     // }
//     getAll(authToken: A): Promise<E[]> {
//         return request(`${baseUrl}/${this.apiCollectionSuffix}`, 'GET', undefined, authToken);
//     }
//     // create(entityWithoutId: Omit<E, "id">, userId: I, authToken: A): Promise<E> {
//     //     return request(`${baseUrl}/${this.apiCollectionSuffix}/create`, 'POST', {...entityWithoutId, userId}, authToken);
//     // }
//     // update(entityId: I, entity: E, authToken: A): Promise<E> {
//     //     return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}/edit`, 'POST', entity, authToken);
//     // }
//     // deleteOne(entityId: I, entity: undefined, authToken: A): Promise<string> {
//     //     return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}/delete`, 'GET', entity, authToken);
//     // }
 

// }

