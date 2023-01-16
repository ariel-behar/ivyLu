import { Outlet } from "react-router-dom";

import Container from '@mui/material/Container'

function ProductsRootView() {
    return (
        <>

            <Container>
                {/* <div>ProductsRootView</div> */}

                <Outlet />
            </Container>
        </>
    )
}

export default ProductsRootView