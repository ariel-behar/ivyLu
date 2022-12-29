import { useLoaderData } from "react-router-dom"
import { ServiceFromDBInterface } from "../../types/serviceTypes"

import Stack from "@mui/material/Stack";

function ServiceDetailsView() {
    const service = useLoaderData() as ServiceFromDBInterface;
    console.log('service:', service)

    return (
        <>
            <div>ServiceDetailsView</div>

            <Stack>
                {service._id}

            </Stack>
        </>
    )
}

export default ServiceDetailsView