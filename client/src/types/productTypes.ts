import { Identifiable, IdType } from "./common/commonTypes"

export interface ProductInterface {
    title: string,
    description: string,
    additionalComments: string | null,
    imgUrl: string,
    price: number,
    volume: number,
    volumeMeasurementUnit: string
    productCode: number,
    status: 'active' | 'inactive'
}

export interface ProductFromDBInterface extends ProductInterface, Identifiable<IdType> {
    _id: IdType,
    title: string,
    description: string,
    additionalComments: string | null,
    imgUrl: string,
    price: number,
    volume: number,
    volumeMeasurementUnit: string
    productCode: number,
    status: 'active' | 'inactive'
    creatorId: IdType
}