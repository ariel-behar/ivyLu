import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header/Header'

function RootView() {
    return (
        <>
            <Header />
            <Container >
                <Outlet />
            </Container>
        </>
    )
}

export default RootView