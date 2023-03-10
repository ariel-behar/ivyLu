import { Outlet } from 'react-router-dom'
import Notification from '../components/Common/Notification'

import { useAuthContext } from '../contexts/AuthContext'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Stack from '@mui/material/Stack'

function RootView() {
    const { isLoggedIn } = useAuthContext() as {isLoggedIn: boolean}

    return (
        <Stack 
            direction='column' 
            sx={{ background: "url('https://ivy-lu.s3.eu-central-1.amazonaws.com/patterns/dark-background-pattern.jpg')", minHeight:'100vh', overflow: 'hidden' }}>
            <Notification />

            <Header />

            <Stack 
            flexGrow={1} 
            height='100%' 
            sx={{ marginTop: isLoggedIn ? '90px' : '59px' }}
                >
                <Outlet />
            </Stack>

            <Footer />
        </Stack>
    )
}

export default RootView