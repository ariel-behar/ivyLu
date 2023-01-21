import { useLoaderData } from 'react-router-dom'

import { useAuthContext } from '../../../contexts/AuthContext';
import { Product } from '../../../models/Product';

import CreateButton from '../../../components/Buttons/CreateButton';
import DataTable from '../../../components/DataTable/DataTable'

import Stack from '@mui/material/Stack';

function ProductsOperatorAdminView() {
    const products = useLoaderData() as Product[];
    const { isOperator, isAdmin } = useAuthContext() as {isOperator: boolean, isAdmin: boolean};

    return (
        <>
            <div>ProductsOperatorAdminView</div>

            {(isOperator || isAdmin)
                && <Stack direction='row' justifyContent='end'>
                    <CreateButton text={'Create new Product'} entity='products' />
                </Stack>
            }

            <DataTable entityType={'product'} entities={products} />
        </>
    )
}

export default ProductsOperatorAdminView