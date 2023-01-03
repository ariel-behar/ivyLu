import { NavLink as RouterNavLink } from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem';

interface AdminButtonsProps {
    handleClose: () => void
}

function AdminButtons({ handleClose }: AdminButtonsProps) {
    return (
        <>
            <MenuItem
                onClick={handleClose}
                component={RouterNavLink}
                to='/management/clients'
                sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
            >
                Clients
            </MenuItem>
            <MenuItem
                onClick={handleClose}
                component={RouterNavLink}
                to='/management/staff'
                sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
            >
                Staff
            </MenuItem>
        </>
    )
}

export default AdminButtons