import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Notification from '../components/Common/Notification'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Stack from '@mui/material/Stack'

function RootView() {
    return (
        <>
            <Notification />

            <Header />

            <Box height='38px'></Box>

            <Stack flexGrow={1}>
                <Outlet />
            </Stack>

            <Box height='80px'></Box>

            <Footer />
        </>
    )
}

export default RootView