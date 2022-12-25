import { Link as RouterLink} from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem';

type AdminButtonsProps ={
    handleClose: () => void
}

function AdminButtons({handleClose}: AdminButtonsProps) {
    return (
        <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to='/management/users'
        >
            Users
        </MenuItem>
    )
}

export default AdminButtons