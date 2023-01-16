import { useLoaderData } from "react-router-dom"

import { User } from "../../../models/User"

import CreateButton from "../../../components/Buttons/CreateButton"
import DataTable from "../../../components/DataTable/DataTable"

import Stack from "@mui/material/Stack"

function StaffAdminView() {
    const staffMembers = useLoaderData() as Omit<User, 'password'>[]

    return (
        <>
            {/* <div>StaffAdminView</div> */}

            <Stack direction='row' justifyContent='end'>
                <CreateButton text='Register new Staff Member' entity="staff" />
            </Stack>


            <DataTable entityType={'staff'} entities={staffMembers} />
        </>
    )
}

export default StaffAdminView