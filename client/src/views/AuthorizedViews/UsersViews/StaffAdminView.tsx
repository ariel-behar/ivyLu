import { useLoaderData } from "react-router-dom"
import DataTable from "../../../components/DataTable/DataTable"
import { User } from "../../../models/User"

function StaffAdminView() {
    const staffMembers = useLoaderData() as Omit<User, 'password'>[]
    
    return (
        <>
            <div>StaffAdminView</div>

            <DataTable entityType={'staff'} entities={staffMembers} />
        </>
    )
}

export default StaffAdminView