import { NavLink as RouterNavLink} from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem';

interface AdminButtonsProps {
    handleClose: () => void
}

function AdminButtons({handleClose}: AdminButtonsProps) {
    return (
        <MenuItem
            onClick={handleClose}
            component={RouterNavLink}
            to='/management/users'
            sx={{ '&.active': {fontWeight: 'fontWeightBold'} }}
        >
            Users
        </MenuItem>
    )
}

export default AdminButtons