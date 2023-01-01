import { Link as RouterLink } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext'
import logo from '../../assets/img/logo.png'

import IsLoggedInButtons from './HeaderButtons/IsLoggedInButtons'
import IsNotloggedInButtons from './HeaderButtons/IsNotloggedInButtons';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import BottomHeaderBar from './BottomHeaderBar';

function Header() {
    const { isLoggedIn } = useAuthContext() as any;

    return (
        <>
            <AppBar position='sticky' sx={{ backgroundColor: 'main.black' }}>
                <Container>
                    <Stack direction='row' justifyContent='space-between'>
                        <Toolbar>
                            <Button to='/' color='inherit' component={RouterLink}>Home</Button>
                            <Button to='/products' color='inherit' component={RouterLink}>Products</Button>
                            <Button to='/services' color='inherit' component={RouterLink}>Services</Button>
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
                            <RouterLink to='/' >
                                <img src={logo} alt="IvyLu Logo" style={{ maxWidth: "50px" }} />
                            </RouterLink>
                        </Toolbar>
                        <Toolbar>
                            <Button to='/our-team' color='inherit' component={RouterLink}>Our Team</Button>

                            <Button to='/about' color='inherit' component={RouterLink}>About</Button>

                            {isLoggedIn
                                ? <IsLoggedInButtons bar={'top'} />
                                : <IsNotloggedInButtons />
                            }
                        </Toolbar>
                    </Stack>
                </Container>
            </AppBar>

            {
                isLoggedIn
                    ? <BottomHeaderBar />
                    : ''
            }

        </>
    )
}

export default Header