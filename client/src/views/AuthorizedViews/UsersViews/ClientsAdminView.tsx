import { useLoaderData } from "react-router-dom"
import DataTable from "../../../components/DataTable/DataTable"
import { User } from "../../../models/User"

function ClientsAdminView() {
    const users = useLoaderData() as Omit<User, 'password'>[]
    
    return (
        <>
            <div>ClientsAdminView</div>

            <DataTable entityType={'client'} entities={users} />
        </>
    )
}

export default ClientsAdminView