import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Notification from '../components/Common/Notification'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Stack from '@mui/material/Stack'
import { useAuthContext } from '../contexts/AuthContext'

function RootView() {
    const { isLoggedIn } = useAuthContext() as {isLoggedIn: boolean}

    return (
        <Stack direction='column' sx={{backgroundColor: 'main.black', minHeight:'100vh'}}>
            <Notification />

            <Header />

            <Stack 
            flexGrow={1} 
            height='100%' 
            sx={{ marginTop: isLoggedIn ? '38px' : '' }}
                >
                <Outlet />
            </Stack>

            <Footer />
        </Stack>
    )
}

export default RootView