import { LoaderFunctionArgs } from 'react-router-dom';
import * as productServices from '../services/productServices'

export async function getAllproductsLoader() {
    const products = await productServices.getAll()

    return products;
}

export async function getOneProductsLoader({params}: LoaderFunctionArgs) {
    if(typeof params.productId === 'string') {
        const product = await productServices.getOne(params.productId)

        return product;
    }

}