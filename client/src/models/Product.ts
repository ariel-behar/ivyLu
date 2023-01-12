import { IdType, Identifiable } from "../types/common/common-types";
import { TProductCategories } from "../utils/constants";

export class Product implements Identifiable<IdType>{
    constructor(
        public _id: IdType,
        public title: string,
        public description: string,
        public productCategory: TProductCategories,
        public additionalComments: string | null,
        public imgUrl: string,
        public price: number,
        public volume: string,
        public volumeMeasurementUnit: 'milliliters' | 'grams',
        public productCode: string,
        public status: 'active' | 'inactive',
        public creatorId: IdType
    ){}
}

export class ProductCreateDTO implements Omit<Product, '_id' | 'creatorId'>{
    constructor(
        public title: string,
        public description: string,
        public productCategory: TProductCategories,
        public additionalComments: string | null,
        public imgUrl: string,
        public price: number,
        public volume: string,
        public volumeMeasurementUnit: 'milliliters' | 'grams',
        public productCode: string,
        public status: 'active' | 'inactive',
    ){}
}
