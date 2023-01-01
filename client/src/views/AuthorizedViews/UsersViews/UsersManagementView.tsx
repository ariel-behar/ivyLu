import { Stack } from "@mui/material"
import { Outlet} from "react-router-dom"
import CreateButton from "../../../components/CreateButton"


function UsersManagementView() {
	return (
		<>
			<div>UsersManagementView</div>
			<Stack direction='row' justifyContent='end'>
				<CreateButton item={'User'} />
			</Stack>

			<Outlet />
		</>
	)
}

export default UsersManagementView