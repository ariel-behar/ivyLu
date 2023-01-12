import { NavLink as RouterNavLink } from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem';

interface Props {
    handleClose: () => void
}

function AdminButtons({ handleClose }: Props) {
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