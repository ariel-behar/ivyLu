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

const StyledMenu = styled(Menu)`
    .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper {
        width: 100%;
        background-color: ${({ theme }) => theme.palette.main.black};
        color: ${({ theme }) => theme.palette.main.beigeLight};

        li {
            border-top: 1px dashed ${({ theme }) => theme.palette.main.beigeLight};
            margin: 0 15px;

            &:first-child {
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
                <Container sx={{ padding: { xs: '0 5px', sm: '0 24px' } }} >
                    <Toolbar disableGutters>

                        {/* Small screens */}
                        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
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
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button to='/' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                        Home
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button to='/products' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                        Products
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button to='/services' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                        Services
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button to='/gallery' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                        Gallery
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button to='/our-team' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                        Our Team
                                    </Button>

                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button to='/about' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} >
                                        About
                                    </Button>
                                </MenuItem>


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
                                <Button to='/' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                    Home
                                </Button>
                                <Button to='/products' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                    Products
                                </Button>
                                <Button to='/services' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                    Services
                                </Button>
                                <Button to='/gallery' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                    Gallery
                                </Button>
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
                                <Button to='/our-team' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                    Our Team
                                </Button>

                                <Button to='/about' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }} >
                                    About
                                </Button>

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