import { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom'
import styled from '@mui/material/styles/styled';

import { useAuthContext } from '../../contexts/AuthContext'
import logo from '../../assets/img/logo.png'

import BottomHeaderBar from './BottomHeaderBar';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import IsNotloggedInButtons from './HeaderButtons/IsNotloggedInButtons';
import IsLoggedInButtons from './HeaderButtons/IsLoggedInButtons';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import uniqid from 'uniqid';

const pages = [
    {
        title: 'Home',
        path: '/',
        order: 1
    },
    {
        title: 'Products',
        path: '/products',
        order: 2
    },
    {
        title: 'Services',
        path: '/services',
        order: 3
    },
    {
        title: 'Gallery',
        path: '/gallery',
        order: 4
    },
    {
        title: 'Our Team',
        path: '/our-team',
        order: 5
    }, {
        title: 'About',
        path: '/about',
        order: 6
    },
]

const StyledMenu = styled(Menu)`
    .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper {
        width: 100%;
        background-color: ${({ theme }) => theme.palette.main.black};
        color: ${({ theme }) => theme.palette.main.beigeLight};

        li {
            border-top: 1px dashed ${({ theme }) => theme.palette.main.beigeLight};
            margin: 0 15px;

            &:first-of-type {
                border-top: none;
            }
        }
    }
`

function Header() {
    const { isLoggedIn } = useAuthContext() as { isLoggedIn: boolean, isClient: boolean };
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: 'main.black' }}>
                <Container sx={{ padding: { xs: '0 10px', sm: '0 24px' } }} >
                    <Toolbar disableGutters>

                        {/* Small screens */}
                        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                sx={{ padding: '5px' }}
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                            <StyledMenu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {
                                    pages.map(page => {
                                        return (
                                            <MenuItem key={uniqid()} onClick={handleCloseNavMenu}>
                                                <Button  to={page.path} color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                                    {page.title}
                                                </Button>
                                            </MenuItem>
                                        )
                                    })
                                }

                            </StyledMenu>

                            <Box sx={{
                                backgroundColor: 'main.black',
                                borderRadius: '100%',
                                position: "absolute",
                                zIndex: '100',
                                left: "50%",
                                top: '5px',
                                transform: "translateX(-50%)"
                            }}
                            >
                                <RouterNavLink to='/' >
                                    <img src={logo} alt="IvyLu Logo" style={{ maxWidth: "40px" }} />
                                </RouterNavLink>
                            </Box>

                            <Box>
                                {
                                    isLoggedIn
                                        ? <IsLoggedInButtons whichHeaderBar='top' />
                                        : <IsNotloggedInButtons />
                                }
                            </Box>
                        </Stack>

                        {/* Large screens */}
                        <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', display: { xs: 'none', md: 'flex' } }}>
                            <Toolbar >
                                {
                                    pages.map(page => {
                                        return page.order < 5 &&
                                            <Button key={uniqid()} to={page.path} color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                                {page.title}
                                            </Button>
                                    })
                                }
                            </Toolbar>

                            <Toolbar
                                sx={{
                                    backgroundColor: 'main.black',
                                    borderRadius: '100%',
                                    position: "absolute",
                                    zIndex: '100',
                                    left: "50%",
                                    top: "50px",
                                    transform: "translate(-50%, -50%)"
                                }}
                            >
                                <RouterNavLink to='/' >
                                    <img src={logo} alt="IvyLu Logo" style={{ maxWidth: "50px" }} />
                                </RouterNavLink>
                            </Toolbar>

                            <Toolbar >
                                {
                                    pages.map(page => {
                                        return page.order > 4 &&
                                            <Button key={uniqid()} to={page.path} color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                                {page.title}
                                            </Button>
                                    })
                                }


                                {
                                    isLoggedIn
                                        ? <IsLoggedInButtons whichHeaderBar='top' />
                                        : <IsNotloggedInButtons />
                                }

                            </Toolbar>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            {isLoggedIn && <BottomHeaderBar isLoggedIn={isLoggedIn} />}
        </>
    )
}

export default Header