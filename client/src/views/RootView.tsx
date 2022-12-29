import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Notification from '../components/Common/Notification'

import Header from '../components/Header/Header'

function RootView() {
    return (
        <>
            <Notification />

            <Header />
            <Box height='20px'></Box>
            <Container >
                <Outlet />
            </Container>
        </>
    )
}

export default RootView