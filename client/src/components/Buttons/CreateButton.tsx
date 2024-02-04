import Button from '@mui/material/Button';
import { Link as RouterLink, } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';

interface Props {
	text: string,
	entity: 'services' | 'products' | 'staff'
}

function CreateButton({
	text,
	entity
}: Props) {

	return (
		<Button
			to={`/management/${entity}/${entity === 'staff' ? 'register' : 'create'}`}
			variant='text'
			size='small'
			sx={{ marginTop: '20px', marginBottom: '20px' }}
			component={RouterLink}
			endIcon={<AddIcon />}
		>
			{text}
		</Button>
	)
}

export default CreateButton