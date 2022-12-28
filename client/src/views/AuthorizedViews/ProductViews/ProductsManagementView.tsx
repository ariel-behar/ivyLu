import { Outlet, } from 'react-router-dom';

import { Stack } from '@mui/system';
import CreateButton from '../../../components/CreateButton';

function ProductsManagementView() {
	return (
		<>
			<div>ProductsManagementView</div>
			<Stack direction='row' justifyContent='end'>
				<CreateButton item={'Product'} />
			</Stack>

			<Outlet />
		</>
	)
}

export default ProductsManagementView