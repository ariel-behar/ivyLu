import { Outlet, } from 'react-router-dom';

import { Stack } from '@mui/system';
import CreateButton from '../../../components/CreateButton';
import { useAuthContext } from '../../../contexts/AuthContext';

function ProductsManagementView() {
	
	return (
		<>
			<div>ProductsManagementView</div>

			<Outlet />
		</>
	)
}

export default ProductsManagementView