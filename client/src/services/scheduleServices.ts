import request from "../utils/request";

import { ScheduleCreateDTO } from "../models/Schedule";
import { AuthTokenType, IdType } from "../types/common/common-types";
import { baseUrl } from "./api";

let scheduleUrl = `${baseUrl}/schedule`

export const getHairdresserSchedule = (hairdresserId: IdType) => request(`${scheduleUrl}/hairdresser/${hairdresserId}`, 'GET')

export const create = (scheduleItemWithoutId: ScheduleCreateDTO, authToken: AuthTokenType) => request(`${scheduleUrl}/create`, 'POST', scheduleItemWithoutId, authToken);

export const getAll = (authToken: AuthTokenType) => request(`${scheduleUrl}`, 'GET', undefined, authToken);

export const getClientSchedule = (clientId: IdType, authToken: AuthTokenType) => request(`${scheduleUrl}/${clientId}`, 'GET', undefined, authToken);
