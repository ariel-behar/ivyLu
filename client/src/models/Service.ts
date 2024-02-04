import { Identifiable, IdType } from "../types/common/common-types";

export class Service implements Identifiable<IdType>{
    constructor(
        public _id: IdType,
        public title: string,
        public description: string,
        public additionalComments: string | null,
        public imgUrl: string,
        public price: number,
        public duration: string,
        public status: 'active' | 'inactive',
        public creatorId: IdType
    ){}
}

export class ServiceCreateDTO implements Omit<Service, '_id' | 'creatorId'>{
    constructor(
        public title: string,
        public description: string,
        public additionalComments: string | null,
        public imgUrl: string,
        public price: number,
        public duration: string,
        public status: 'active' | 'inactive'
    ){}
}
