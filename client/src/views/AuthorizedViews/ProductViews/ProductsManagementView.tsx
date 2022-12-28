import Button from '@mui/material/Button';
import { Outlet, Link as RouterLink, } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/system';

function ProductsManagementView() {
	return (
		<>
			<div>ProductsManagementView</div>
			<Stack direction='row' justifyContent='end'>
				<Button
					to='/management/services/create'
					variant='text'
					size='small'
					sx={{ marginTop: '20px', marginBottom: '20px' }}
					component={RouterLink}
					endIcon={<AddIcon />}
				>
					Create Product
				</Button>
			</Stack>

			<Outlet />
		</>
	)
}

export default ProductsManagementView