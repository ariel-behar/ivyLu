import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Notification from '../components/Common/Notification'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Stack from '@mui/material/Stack'

function RootView() {
    return (
        <Box sx={{backgroundColor: '#424242', minHeight:'100vh'}}>
            <Notification />

            <Header />

            <Stack flexGrow={1} height='100%' sx={{paddingTop: '38px', paddingBottom: '50px'}}>
                <Outlet />
            </Stack>

            <Footer />
        </Box>
    )
}

export default RootView