import { Outlet, } from 'react-router-dom';

import { Stack } from '@mui/system';
import CreateButton from '../../../components/CreateButton';
import { useAuthContext } from '../../../contexts/AuthContext';

function ProductsManagementView() {
	const { isOperator, isAdmin } = useAuthContext() as any;
	return (
		<>
			<div>ProductsManagementView</div>
			{
				(isOperator || isAdmin)
					? (
						<Stack direction='row' justifyContent='end'>
							<CreateButton item={'Product'} />
						</Stack>
					)
					: ""
			}

			<Outlet />
		</>
	)
}

export default ProductsManagementView