import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'

function ProductsRootView() {
    return (
        <Container>
            <div>ProductsRootView</div>

            <Outlet />

        </Container>
    )
}

export default ProductsRootView