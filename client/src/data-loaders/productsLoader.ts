import { LoaderFunctionArgs } from 'react-router-dom';
import { Product } from '../models/Product';
import { ApiClient, ApiClientImpl } from '../services/clientServices';
import { AuthTokenType, IdType } from '../types/common/commonTypes';

const clientServices: ApiClient<IdType, Product, AuthTokenType> = new ApiClientImpl<IdType, Product, AuthTokenType>('products');

export async function getAllProductsLoader() {
    const products = await clientServices.getAll()

    return products;
}

export async function getOneProductLoader({params}: LoaderFunctionArgs) {
    if(typeof params.productId === 'string') {
        const product = await clientServices.getOne(params.productId)

        return product;
    }
}