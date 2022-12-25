import { Outlet, Link as RouterLink } from "react-router-dom"


import Stack from "@mui/material/Stack"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"



function ManagementView() {
    return (
        <>
            <div>ManagementView</div>

            <Stack direction='row' justifyContent='center'>
            <Breadcrumbs 
                aria-label="breadcrumb" 
            >
                <Link mx={2} underline="hover" to="/management/orders" component={RouterLink}>Orders</Link>
                <Link mx={2} underline="hover" to="/management/services" component={RouterLink}>Services</Link>
                <Link mx={2} underline="hover" to="/management/products" component={RouterLink}>Products</Link>
                <Link mx={2} underline="hover" to="/management/users" component={RouterLink}>Users</Link>

            </Breadcrumbs>

            </Stack>

            <Outlet />
        </>
    )
}

export default ManagementView