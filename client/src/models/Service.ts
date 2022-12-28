import { ServiceInterface } from "../types/serviceTypes";

export default class Service implements ServiceInterface{
    constructor(
        public title: string,
        public description: string,
        public additionalComments: string | null,
        public imgUrl: string,
        public price: number[] | number,
        public duration: string,
        public status: 'active' | 'inactive'
    ){}
}