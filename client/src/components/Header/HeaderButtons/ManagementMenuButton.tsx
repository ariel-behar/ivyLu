import { useState } from 'react';
import uniqid from 'uniqid';
import { NavLink as RouterNavLink } from 'react-router-dom'

import { useAuthContext } from '../../../contexts/AuthContext';
import AdminButtons from './AdminButtons';

import styled from '@mui/material/styles/styled';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled(Menu)`
    .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper {
        background-color: ${({ theme }) => theme.palette.main.beige};
        color: ${({ theme }) => theme.palette.main.black};

        li {
            border-top: 1px dashed ${({ theme }) => theme.palette.main.black};
            margin: 0 15px;

            &:first-of-type {
                border-top: none;
            }

            .menu-item-link {
                &.active {
                    font-weight: bold;
                }
            }
        }
    }
`

const pages = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        order: 1
    },
    {
        title: 'Orders',
        path: '/management/orders',
        order: 2
    },
    {
        title: 'Schedule',
        path: '/management/schedule',
        order: 3
    },
    {
        title: 'Services',
        path: '/management/services',
        order: 4
    },
    {
        title: 'Products',
        path: '/management/products',
        order: 5
    }
]

function ManagementMenuButton() {
    const { isAdmin } = useAuthContext() as { isAdmin: boolean };

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

            <StyledMenu
                id='management-menu'
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{
                    'aria-labelledby': 'management-button'
                }}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}

            >
                {
                    pages.map(page => {
                        return (
                            <MenuItem key={uniqid()} onClick={handleClose}>
                                <Button className='menu-item-link' to={page.path} color='inherit' component={RouterNavLink} >
                                    {page.title}
                                </Button>
                            </MenuItem>
                        )
                    })
                }

                {isAdmin
                    ? <AdminButtons handleClose={handleClose} />
                    : ''
                }
            </StyledMenu>
        </>
    )
}

export default ManagementMenuButton;