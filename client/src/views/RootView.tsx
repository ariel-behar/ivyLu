import { Outlet } from 'react-router-dom'

import Header from '../components/Header'

function RootView() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default RootView