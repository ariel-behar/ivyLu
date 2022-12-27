import { Link as RouterLink} from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext';

import Button from '@mui/material/Button';

import OperatorAdminButtons from './OperatorAdminButtons';


function IsLoggedInButtons() {
    const { user } = useAuthContext() as any;

    return (
        <>
            <Button to='/dashboard' color='inherit' component={RouterLink}>Dashboard</Button>

            {
                (user.role === 2 || user.role === 3)
                    ? <OperatorAdminButtons />
                    : ''
            }

            <Button to='/logout' color='inherit' component={RouterLink}>Logout</Button>

        </>
    )
}

export default IsLoggedInButtons;