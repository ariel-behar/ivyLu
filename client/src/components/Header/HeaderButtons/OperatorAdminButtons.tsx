import { useState } from 'react';
import { Link } from 'react-router-dom'

import { useAuthContext } from '../../../context/AuthContext';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AdminButtons from './AdminButtons';

function OperatorAdminButtons() {
    const { user } = useAuthContext() as any;

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
                aria-controls={open ? 'resources-menu' : undefined}
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
                    horizontal: 'right'
                }}
            >
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to='/orders-management'
                >
                    Orders
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to='/services-management'
                >
                    Services
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to='/products-management'
                >
                    Products
                </MenuItem>

                {user.role === 3
                    ? <AdminButtons handleClose={handleClose} />
                    : ''
                }
            </Menu>
        </>
    )
}

export default OperatorAdminButtons