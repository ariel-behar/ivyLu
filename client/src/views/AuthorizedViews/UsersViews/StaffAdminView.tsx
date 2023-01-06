import Stack from "@mui/material/Stack"
import { useLoaderData } from "react-router-dom"
import CreateButton from "../../../components/CreateButton"
import DataTable from "../../../components/DataTable/DataTable"
import { User } from "../../../models/User"

function StaffAdminView() {
    const staffMembers = useLoaderData() as Omit<User, 'password'>[]

    return (
        <>
            <div>StaffAdminView</div>

            <Stack direction='row' justifyContent='end'>
                <CreateButton text='Register new Staff Member' whereTo="staff" />
            </Stack>


            <DataTable entityType={'staff'} entities={staffMembers} />
        </>
    )
}

export default StaffAdminView