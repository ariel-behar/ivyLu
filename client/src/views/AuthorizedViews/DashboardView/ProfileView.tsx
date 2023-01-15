import Stack from "@mui/material/Stack";
import { useAuthContext } from "../../../contexts/AuthContext"
import { User } from "../../../models/User";

import maleAvatar from '../../../assets/img/male-avatar.png'
import femaleAvatar from '../../../assets/img/female-avatar.png'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import getUserRole from "../../../utils/getUserRole";

function ProfileView() {
	const { user, isClient } = useAuthContext() as { user: User, isClient: boolean };

	return (
		<>
			<div>ProfileView</div>

			<Grid container direction='row'>
				<Grid item md={2}>
					<img style={{width: '100%'}} src={user.gender === 'male' ? maleAvatar : femaleAvatar} alt={user.gender === 'male' ? 'Male Avatar' : 'Female Avatar'} />

					<Typography variant="h4" textAlign='center' mt={2}> {user.firstName} {user.lastName}</Typography>
					{ !isClient && <Typography variant="h6" textAlign='center'>{getUserRole(user.role).capitalized}</Typography>}
				</Grid>

				<Grid item md={10}>
					<Typography variant="h5" textAlign='left' mt={2}><b>Name:</b> {user.firstName} {user.lastName}</Typography>
					<Typography variant="h5" textAlign='left' mt={2}><b>E-mail:</b> {user.email}</Typography>
					<Typography variant="h5" textAlign='left' mt={2}><b>Phone Number:</b >{user.phone}</Typography>

					

				</Grid>
			</Grid>
		</>
	)
}

export default ProfileView