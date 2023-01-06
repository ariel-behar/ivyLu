import { useLoaderData } from "react-router-dom";

import { useAuthContext } from "../../../contexts/AuthContext";

import DataTable from "../../../components/DataTable/DataTable";
import Stack from "@mui/material/Stack";
import CreateButton from "../../../components/CreateButton";
import { Service } from "../../../models/Service";

function ServicesOperatorAdminView() {
    const services = useLoaderData() as Service[];
    const { isOperator, isAdmin } = useAuthContext() as any;


    return (
        <>
            <div>ServicesOperatorAdminView</div>

            {(isOperator || isAdmin)
                && <Stack direction='row' justifyContent='end'>
                    <CreateButton text='Create new Service' whereTo='services' />
                </Stack>
            }
            
            <DataTable entityType={"service"} entities={services} />

        </>
    )
}

export default ServicesOperatorAdminView