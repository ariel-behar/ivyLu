import { NavLink as RouterNavLink, Link as RouterLink} from 'react-router-dom'

import Button from '@mui/material/Button';


function IsLoggedInTopBarButtons() {
    
    return (
        <>
            <Button to='/dashboard' color='inherit' component={RouterNavLink} sx={{ '&.active': {fontWeight: 'fontWeightBold'} }}>Dashboard</Button>

            <Button to='/logout' color='inherit' component={RouterLink} sx={{ '&.active': {fontWeight: 'fontWeightBold'} }}>Logout</Button>

        </>
    )
}

export default IsLoggedInTopBarButtons;