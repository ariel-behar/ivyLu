import { Outlet } from 'react-router-dom'
import Notification from '../components/Common/Notification'

import { useAuthContext } from '../contexts/AuthContext'
import pattern from '../assets/img/dark-background-pattern.jpg'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Stack from '@mui/material/Stack'


function RootView() {
    const { isLoggedIn } = useAuthContext() as {isLoggedIn: boolean}

    return (
        <Stack 
            direction='column' 
            sx={{ background: `url('${pattern}')`, minHeight:'100vh', overflow: 'hidden' }}>
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