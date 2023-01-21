import { Outlet} from "react-router-dom"
import { isAdminRouteGuard } from "../../../hoc/isAdminRouteGuard"

function UsersManagementView() {

	return (
		<>
			<div>UsersManagementView</div>

			<Outlet />
		</>
	)
}

export default isAdminRouteGuard(UsersManagementView)