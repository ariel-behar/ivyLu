import { ProductInterface } from "../types/productTypes";

export default class Product implements ProductInterface{
    constructor(
        public title: string,
        public description: string,
        public additionalComments: string | null,
        public imgUrl: string,
        public price: number,
        public volume: number,
        public volumeMeasurementUnit: string,
        public productCode: number,
        public status: 'active' | 'inactive'
    ){}
}