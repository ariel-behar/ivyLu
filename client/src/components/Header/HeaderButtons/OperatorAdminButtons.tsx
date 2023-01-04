import { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom'

import { useAuthContext } from '../../../contexts/AuthContext';

import AdminButtons from './AdminButtons';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function OperatorAdminButtons() {
    const { isAdmin } = useAuthContext() as any;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <>
            <Button
                color='inherit'
                id='management-button'
                onClick={handleClick}
                aria-controls={open ? 'management-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Management
            </Button>

            <Menu
                id='management-menu'
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{
                    'aria-labelledby': 'management-button'
                }}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                
            >
                <MenuItem
                    onClick={handleClose}
                    component={RouterNavLink}
                    to='/management/orders'
                    sx={{ '&.active': { fontWeight: 'fontWeightBold' }}}
                >
                    Orders
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    component={RouterNavLink}
                    to='/management/schedule'
                    sx={{ '&.active': { fontWeight: 'fontWeightBold' }}}
                >
                    Schedule
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    component={RouterNavLink}
                    to='/management/services'
                    sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                >
                    Services
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    component={RouterNavLink}
                    to='/management/products'
                    sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                >
                    Products
                </MenuItem>

                { isAdmin
                    ? <AdminButtons handleClose={handleClose}/>
                    : ''
                }
            </Menu>
        </>
    )
}

export default OperatorAdminButtons;