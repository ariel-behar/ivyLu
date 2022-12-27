import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'
import Notification from '../components/Common/Notification'

import Header from '../components/Header/Header'

function RootView() {
    return (
        <>
            <Notification />
            <Header />
            <Container >
                <Outlet />
            </Container>
        </>
    )
}

export default RootView