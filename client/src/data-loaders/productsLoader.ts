import { LoaderFunctionArgs } from 'react-router-dom';
import { Product } from '../models/Product';
import { ApiEntity, ApiEntityImpl } from '../services/entityServices';
import { AuthTokenType, IdType } from '../types/common/common-types';

const entityServices: ApiEntity<IdType, Product, AuthTokenType> = new ApiEntityImpl<IdType, Product, AuthTokenType>('products');

export async function getAllProductsLoader() {
    const products = await entityServices.getAll()

    return products;
}

export async function getOneProductLoader({params}: LoaderFunctionArgs) {
    if(typeof params.productId === 'string') {
        const product = await entityServices.getOne(params.productId)

        return product;
    }
}