import { NavLink as RouterNavLink, Link as RouterLink } from 'react-router-dom'

import { useAuthContext } from '../../../contexts/AuthContext';

import getUserRole from '../../../utils/getUserRole';
import { User } from '../../../models/User';

import ManagementMenuButton from './ManagementMenuButton';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function IsLoggedInButtons() {
    const { user, isHairdresser, isOperator, isAdmin } = useAuthContext() as {user: User, isHairdresser: boolean, isOperator: boolean, isAdmin: boolean};
    const userRole = getUserRole(user.role)

    return (
        <>
            <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center' p={0}>

                <Typography variant='body1'>
                    Hello, {user.firstName}
                    <i>{isAdmin || isOperator || isHairdresser ? ` (${userRole.capitalized})` : ''}</i>
                </Typography>

                <Box>
                    <Button to='/dashboard' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Dashboard</Button>

                    { (isAdmin || isOperator || isHairdresser) && <ManagementMenuButton /> }

                    <Button to='/logout' color='inherit' component={RouterLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Logout</Button>
                </Box>
            </Stack>
        </>
    )
}

export default IsLoggedInButtons;