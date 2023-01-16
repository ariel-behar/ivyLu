import { useAuthContext } from "../../../contexts/AuthContext"
import { User } from "../../../models/User";

import maleAvatar from '../../../assets/img/male-avatar.png'
import femaleAvatar from '../../../assets/img/female-avatar.png'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import getUserRole from "../../../utils/getUserRole";
import Paper from "@mui/material/Paper";

function ProfileView() {
	const { user, isClient } = useAuthContext() as { user: User, isClient: boolean };

	return (
		<>
			{/* <div>ProfileView</div> */}

			<Paper>
				<Grid container direction='row' p={2} pl={5}>
					<Grid item md={10}>
						<Typography sx={{ borderBottom: '1px solid #4bb5ab' }} display='inline-block' variant="h4" textAlign='left' mt={2}><b>{user.firstName} {user.lastName}</b></Typography>
						<Box mt={3}>
							<Typography variant="body1" textAlign='left' mt={2}>E-mail: <b>{user.email}</b></Typography>
							<Typography variant="body1" textAlign='left' mt={2}>Phone Number: <b>{user.phone}</b></Typography>
						</Box>
					</Grid>
					<Grid item md={2} sx={{ borderLeft: '1px solid #4bb5ab' }} textAlign="center">
						<img style={{ width: '100px' }} src={user.gender === 'male' ? maleAvatar : femaleAvatar} alt={user.gender === 'male' ? 'Male Avatar' : 'Female Avatar'} />

						{!isClient && <Typography variant="h6" textAlign='center'><b>{getUserRole(user.role).capitalized}</b></Typography>}
					</Grid>
				</Grid>
			</Paper>
		</>
	)
}

export default ProfileView