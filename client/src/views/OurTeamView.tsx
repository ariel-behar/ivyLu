import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom"
import { User } from "../models/User";

function OurTeamView() {
	const hairdressers = useLoaderData() as User[];

	return (
		<>
			<div>OurTeamView</div>

			<Container>
				{
					hairdressers.map((hairdresser: User) => {
						return (
							<>
								<Grid container>
									<Grid item md={9}>
										<Typography variant="h3">{hairdresser.firstName} {hairdresser.lastName} </Typography>
									</Grid>
									<Grid item md={3}>
										<img src={hairdresser.imgUrl} alt='Hairdresser' height='300px' />
									</Grid>
								</Grid>
							</>
						)
					})
				}
			</Container>
		</>
	)
}

export default OurTeamView