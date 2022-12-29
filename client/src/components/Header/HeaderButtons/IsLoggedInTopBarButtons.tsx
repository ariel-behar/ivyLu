import { Link as RouterLink} from 'react-router-dom'

import Button from '@mui/material/Button';

function IsLoggedInTopBarButtons() {
    
    return (
        <>
            <Button to='/dashboard' color='inherit' component={RouterLink}>Dashboard</Button>

            <Button to='/logout' color='inherit' component={RouterLink}>Logout</Button>

        </>
    )
}

export default IsLoggedInTopBarButtons;