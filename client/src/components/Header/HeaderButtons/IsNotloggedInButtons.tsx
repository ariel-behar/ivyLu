import { NavLink as RouterNavLink } from 'react-router-dom'

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


function IsNotloggedInButtons() {
    return (
        <>
            <Stack direction="row" justifyContent='right'>
                <Button
                    to='/login'
                    color='inherit'
                    component={RouterNavLink}
                    sx={{ '&.active': { fontWeight: 'fontWeightBold' }, padding: { xs: '6px 2px', sm: '6px 8px'} }}
                >
                    Login
                </Button>
                <Button
                    to='/register'
                    color='inherit'
                    component={RouterNavLink}
                    sx={{ '&.active': { fontWeight: 'fontWeightBold' }, padding: { xs: '6px 2px', sm: '6px 8px'} }}
                >
                    Register
                </Button>
            </Stack>
        </>
    )
}

export default IsNotloggedInButtons