import Button from '@mui/material/Button';
import { Link as RouterLink, } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';

type CreateButtonProps = {
	item: 'Service' | 'Product' | 'User'
}

function CreateButton({
	item
}: CreateButtonProps) {

	const getEntity = () => {
		return item.toLowerCase().slice(0, item.length).concat('s')
	}

	return (
		<Button
			to={`/management/${getEntity()}/create`}
			variant='text'
			size='small'
			sx={{ marginTop: '20px', marginBottom: '20px' }}
			component={RouterLink}
			endIcon={<AddIcon />}
		>
			Create {item}
		</Button>
	)
}

export default CreateButton