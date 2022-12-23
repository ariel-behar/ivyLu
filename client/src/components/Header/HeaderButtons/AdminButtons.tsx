import { Link } from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem';

type AdminButtonsProps ={
    handleClose: () => void
}

function AdminButtons({handleClose}: AdminButtonsProps) {
    return (
        <MenuItem
            onClick={handleClose}
            component={Link}
            to='/users-management'
        >
            Users
        </MenuItem>
    )
}

export default AdminButtons