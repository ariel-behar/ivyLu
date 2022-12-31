import { useLoaderData } from 'react-router-dom'
import DataTable from '../../../components/DataTable/DataTable'
import { Product } from '../../../models/Product';

function ProductsOperatorAdminView() {
    const products = useLoaderData() as Product[];

    return (
        <>
            <div>ProductsOperatorAdminView</div>

            <DataTable entityType={'product'} entities={products} />
        </>
    )
}

export default ProductsOperatorAdminView