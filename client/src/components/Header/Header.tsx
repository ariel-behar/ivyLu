import { Link as RouterLink } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext'
import logoImg from '../../assets/img/logo.png'

import IsLoggedInButtons from './HeaderButtons/IsLoggedInButtons'
import IsNotloggedInButtons from './HeaderButtons/IsNotloggedInButtons';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Header() {
    const { isLoggedIn } = useAuthContext() as any;

    return (
        <>
            <AppBar position='static' style={{ background: 'transparent', boxShadow: 'none' }}>
                <Stack direction='row' spacing={2} >
                    <Toolbar>
                        <Button to='/products' color='inherit' component={RouterLink}>Products</Button>
                        <Button to='/services' color='inherit' component={RouterLink}>Services</Button>
                    </Toolbar>
                    <Toolbar>
                        <RouterLink to='/' >
                            <img src={logoImg} alt="IvyLu Logo" style={{ maxWidth: "50px" }} />
                        </RouterLink>
                    </Toolbar>
                    <Toolbar>
                        {isLoggedIn
                            ? <IsLoggedInButtons />
                            : <IsNotloggedInButtons />
                        }
                    </Toolbar>
                </Stack>
            </AppBar>
        </>
    )
}

export default Header