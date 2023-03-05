import { NavLink as RouterNavLink, Link as RouterLink } from 'react-router-dom'

import { useAuthContext } from '../../../contexts/AuthContext';

import getUserRole from '../../../utils/getUserRole';
import { User } from '../../../models/User';

import ManagementMenuButton from './ManagementMenuButton';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';

interface Props {
    whichHeaderBar: 'top' | 'bottom'
}

function IsLoggedInButtons({ whichHeaderBar }: Props) {
    const { user, isHairdresser, isOperator, isAdmin, isClient } = useAuthContext() as { user: User, isHairdresser: boolean, isOperator: boolean, isAdmin: boolean, isClient: boolean };
    const userRole = getUserRole(user.role)

    return (
        <>

            { (whichHeaderBar === 'top' && isClient) &&
                <Button to='/shopping-cart' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>
                    <Badge badgeContent={0} showZero>
                        <ShoppingCartIcon />
                    </Badge>
                </Button>
            }

            { whichHeaderBar === 'top' && <IconButton to='/logout' color='inherit' component={RouterLink} sx={{ padding: 0, marginLeft: '10px' }}> <LogoutIcon />  </IconButton> }

            {
                whichHeaderBar === 'bottom' &&
                <>
                    <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center' p={0}>

                        <Typography variant='body1'>
                            Hello, {user.firstName}
                            <i>{isAdmin || isOperator || isHairdresser ? ` (${userRole.capitalized})` : ''}</i>
                        </Typography>

                        <Box>
                            {isClient && <Button to='/dashboard' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Dashboard</Button>}
                            
                            {/* {(isAdmin || isOperator || isHairdresser) && <Button to='/management' color='inherit' component={RouterNavLink} sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}>Management</Button> } */}

                            {(isAdmin || isOperator || isHairdresser) && <ManagementMenuButton />}
                           
                        </Box>
                    </Stack>
                </>
            }

        </>
    )
}

export default IsLoggedInButtons;