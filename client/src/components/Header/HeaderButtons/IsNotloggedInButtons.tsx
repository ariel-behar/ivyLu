import { Link as RouterLink } from 'react-router-dom'

import Button from '@mui/material/Button';

function IsNotloggedInButtons() {
    return (
        <>
            <Button to='/login' color='inherit' component={RouterLink}>Login</Button>
            <Button to='/register' color='inherit' component={RouterLink}>Register</Button>
        </>
    )
}

export default IsNotloggedInButtons