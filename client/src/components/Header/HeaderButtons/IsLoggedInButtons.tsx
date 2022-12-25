import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../context/AuthContext';

import Button from '@mui/material/Button';

import OperatorAdminButtons from './OperatorAdminButtons';


function IsLoggedInButtons() {
    const { user } = useAuthContext() as any;

    return (
        <>
            <Button to='/dashboard' color='inherit' component={Link}>Dashboard</Button>

            {
                (user.role === 2 || user.role === 3)
                    ? <OperatorAdminButtons />
                    : ''
            }

            <Button to='/logout' color='inherit' component={Link}>Logout</Button>

        </>
    )
}

export default IsLoggedInButtons;