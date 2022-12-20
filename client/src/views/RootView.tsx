import { Outlet } from 'react-router-dom'

import Header from './Header/Header'

function RootView() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default RootView