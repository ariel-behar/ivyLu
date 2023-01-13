import { useLoaderData } from "react-router-dom"
import uniqid from "uniqid";

import { User } from "../models/User";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function OurTeamView() {
	const hairdressers = useLoaderData() as User[];

	return (
		<Container>
			<div>OurTeamView</div>

				{
					hairdressers.map((hairdresser: User) => {
						return (
							<Grid container key={uniqid()}>
								<Grid item md={9}>
									<Typography variant="h3">{hairdresser.firstName} {hairdresser.lastName} </Typography>
									<Typography variant="body1">{hairdresser.about} </Typography>
								</Grid>
								<Grid item md={3}>
									<img src={hairdresser.imgUrl} alt='Hairdresser' height='300px' />
								</Grid>
							</Grid>
						)
					})
				}
		</Container>
	)
}

export default OurTeamView