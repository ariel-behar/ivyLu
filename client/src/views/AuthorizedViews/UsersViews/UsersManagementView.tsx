import { Stack } from "@mui/material"
import { Outlet, useLocation} from "react-router-dom"
import CreateButton from "../../../components/CreateButton"
import { isAdminRouteGuard } from "../../../hoc/isAdminRouteGuard"


function UsersManagementView() {
	const location = useLocation();

	return (
		<>
			<div>UsersManagementView</div>

			{
				location.pathname.includes('staff')
				? (
					<Stack direction='row' justifyContent='end'>
					<CreateButton item={'Staff Member'} />
				</Stack>
				)
				: ''
			}

			<Outlet />
		</>
	)
}

export default isAdminRouteGuard(UsersManagementView)