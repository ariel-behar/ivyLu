import { NavLink as RouterNavLink } from 'react-router-dom'

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

function Header() {
    const { isLoggedIn } = useAuthContext() as { isLoggedIn: boolean, isClient: boolean };

    return (
        <>
            <AppBar position='sticky' sx={{ backgroundColor: 'main.black' }}>
                <Container>
                    <Stack direction='row' justifyContent='space-between'>
                        <Toolbar>
                            <Button to='/' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Home</Button>
                            <Button to='/products' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Products</Button>
                            <Button to='/services' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Services</Button>
                            <Button
                                to='/gallery'
                                color='inherit'
                                component={RouterNavLink}
                                sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                            >
                                Gallery
                            </Button>
                        </Toolbar>
                        <Toolbar sx={{
                            backgroundColor: 'main.black',
                            borderRadius: '100%',
                            position: "absolute",
                            zIndex: '100',
                            left: "50%",
                            top: "50px",
                            transform: "translate(-50%, -50%)"
                        }}>
                            <RouterNavLink to='/' >
                                <img src={logo} alt="IvyLu Logo" style={{ maxWidth: "50px" }} />
                            </RouterNavLink>
                        </Toolbar>
                        <Toolbar>

                            <Button
                                to='/our-team'
                                color='inherit'
                                component={RouterNavLink}
                                sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                            >
                                Our Team
                            </Button>

                            <Button
                                to='/about'
                                color='inherit'
                                component={RouterNavLink}
                                sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
                            >
                                About
                            </Button>

                            {
                                isLoggedIn
                                    ? <IsLoggedInButtons whichHeaderBar='top' />
                                    : <IsNotloggedInButtons />
                            }

                        </Toolbar>
                    </Stack>
                </Container>
            </AppBar>

            {isLoggedIn && <BottomHeaderBar isLoggedIn={isLoggedIn} />}

        </>
    )
}

export default Header