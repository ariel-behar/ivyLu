import * as productServices from '../services/productServices'

export async function getAllproductsLoader() {
    const products = await productServices.getAll()

    return products;
}