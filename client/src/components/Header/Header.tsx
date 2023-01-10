import { NavLink as RouterNavLink } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext'
import logo from '../../assets/img/logo.png'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import BottomHeaderBar from './BottomHeaderBar';
import Badge from '@mui/material/Badge';
import { Box } from '@mui/material';

function Header() {
    const { isLoggedIn } = useAuthContext() as any;

    return (
        <>
            <AppBar position='sticky' sx={{ backgroundColor: 'main.black' }}>
                <Container>
                    <Stack direction='row' justifyContent='space-between'>
                        <Toolbar>
                            <Button to='/' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Home</Button>
                            <Button to='/products' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Products</Button>
                            <Button to='/services' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Services</Button>
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
                            <Button to='/our-team' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Our Team</Button>


                            <Button to='/about' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>About</Button>

                            <Button to='/shopping-card' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                                <Badge badgeContent={0} showZero>
                                    <ShoppingCartIcon />
                                </Badge>
                            </Button>

                        </Toolbar>
                    </Stack>
                </Container>
            </AppBar>

            <BottomHeaderBar isLoggedIn={isLoggedIn}/>

            <Box height='40px'></Box>

        </>
    )
}

export default Header