import { useAuthContext } from '../../../contexts/AuthContext';

import OperatorAdminButtons from './OperatorAdminButtons';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import getUserRole from '../../../utils/getUserRole';


function IsLoggedInBottomBarButtons() {
    const { user, isOperator, isAdmin } = useAuthContext() as any;
    const userRole = getUserRole(user.role)

    return (
        <>
            <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center' p={0}>

                <Typography variant='body1'>
                    Hello, {user.firstName}
                    <i>{isAdmin || isOperator ? ` (${userRole.capitalized})` : ''}</i>
                </Typography>

                {
                    (isAdmin || isOperator)
                        ? <OperatorAdminButtons />
                        : ''
                }
            </Stack>
        </>
    )
}

export default IsLoggedInBottomBarButtons;