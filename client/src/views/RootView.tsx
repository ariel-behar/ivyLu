import Container from '@mui/material/Container'
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

            <Box height='20px'></Box>

            <Container >
                <Stack flexGrow={1}>
                    <Outlet />
                </Stack>
            </Container>

            <Box height='80px'></Box>

            <Footer />
        </>
    )
}

export default RootView