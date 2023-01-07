import { Outlet } from 'react-router-dom'

function ProductsRootView() {
    return (
        <>
            <div>ProductsRootView</div>

            <Outlet />

        </>
    )
}

export default ProductsRootView