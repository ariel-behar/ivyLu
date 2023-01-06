import Button from '@mui/material/Button';
import { Link as RouterLink, } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';

type CreateButtonProps = {
	text: string,
	whereTo: 'services' | 'products' | 'staff'
}

function CreateButton({
	text,
	whereTo
}: CreateButtonProps) {

	return (
		<Button
			to={`/management/${whereTo}/create`}
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