import { Stack } from "@mui/material"
import { Outlet} from "react-router-dom"
import CreateButton from "../../../components/CreateButton"
import { isAdminRouteGuard } from "../../../hoc/isAdminRouteGuard"


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

export default isAdminRouteGuard(UsersManagementView)