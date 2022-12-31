import { useLoaderData } from "react-router-dom"
import DataTable from "../../../components/DataTable/DataTable"
import { User } from "../../../models/User"

function UsersManagementView() {
	const users = useLoaderData() as Omit<User, 'password'>[]
	return (
		<>
			<div>UsersManagementView</div>

			<DataTable entityType={'user'} entities={users}/>

		</>
	)
}

export default UsersManagementView