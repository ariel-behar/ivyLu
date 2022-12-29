import { useAuthContext } from '../../../contexts/AuthContext';
import useUserRole from '../../../hooks/useUserRole';

import OperatorAdminButtons from './OperatorAdminButtons';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


function IsLoggedInBottomBarButtons() {
    const { user, isOperator, isAdmin } = useAuthContext() as any;
    const userRole = useUserRole(user.role)

    return (
        <>
            <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center' p={0}>

                <Typography variant='body1'>
                    Hello, {user.firstName}
                    <i>{(isAdmin || isOperator === 'operator') ? ` (${userRole})` : ''}</i>
                </Typography>

                {
                    (isOperator || isAdmin)
                        ? <OperatorAdminButtons />
                        : ''
                }
            </Stack>
        </>
    )
}

export default IsLoggedInBottomBarButtons;