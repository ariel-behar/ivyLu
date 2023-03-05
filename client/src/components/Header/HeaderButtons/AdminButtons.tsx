import { NavLink as RouterNavLink } from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

interface Props {
    handleClose: () => void
}

function AdminButtons({ handleClose }: Props) {
    return (
        <>
            <MenuItem onClick={handleClose}>
                <Button className='menu-item-link' to='/management/clients' color='inherit' component={RouterNavLink} >
                    Clients
                </Button>
            </MenuItem>

            <MenuItem onClick={handleClose}>
                <Button className='menu-item-link' to='/management/staff' color='inherit' component={RouterNavLink} >
                    Staff
                </Button>
            </MenuItem>
        </>
    )
}

export default AdminButtons