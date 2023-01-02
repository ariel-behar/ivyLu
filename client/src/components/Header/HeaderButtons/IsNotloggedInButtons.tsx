import { NavLink as RouterNavLink } from 'react-router-dom'

import Button from '@mui/material/Button';


function IsNotloggedInButtons() {
    return (
        <>
            <Button
                to='/login'
                color='inherit'
                component={RouterNavLink}
                sx={{ '&.active': {fontWeight: 'fontWeightBold'} }}
            >
                Login
            </Button>
            <Button
                to='/register'
                color='inherit'
                component={RouterNavLink}
                sx={{ '&.active': {fontWeight: 'fontWeightBold'} }}
            >
                Register
            </Button>
        </>
    )
}

export default IsNotloggedInButtons