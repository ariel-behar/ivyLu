import { Link } from 'react-router-dom'

import Button from '@mui/material/Button';

function IsNotloggedInButtons() {
    return (
        <>

            <Button to='/login' color='inherit' component={Link}>Login</Button>
            <Button to='/register' color='inherit' component={Link}>Register</Button>

        </>
    )
}

export default IsNotloggedInButtons