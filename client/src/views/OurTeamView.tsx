import { useLoaderData } from "react-router-dom"
import uniqid from "uniqid";

import { User } from "../models/User";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ImageList from "@mui/material/ImageList";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageListItem from "@mui/material/ImageListItem";
import getUserRole from "../utils/getUserRole";
import Box from "@mui/material/Box";

function OurTeamView() {
	const hairdressers = useLoaderData() as User[];

	return (
		<Box py={3}>
			<Container sx={{ height: '80vh' }}>
				{/* <div>OurTeamView</div> */}

				<Stack direction='row' alignItems='center' sx={{overflow: 'hidden'}}>
					<Typography variant="h3" sx={{ color: 'common.white', marginRight: '30px', whiteSpace: 'nowrap' }}>Meet Our Team!</Typography>
					<hr style={{ minWidth: '100%', height: '2px' }} />
				</Stack>
				<Stack direction='row' height='100%'>

					<ImageList
						sx={{ width: '100%' }}
						cols={3}
						rowHeight={400}
					>
						{
							hairdressers.map((hairdresser: User) => {
								return (
									<ImageListItem key={uniqid()}>
										<img
											src={hairdresser.imgUrl}
											alt={hairdresser.firstName}
											loading='lazy'
										/>
										<ImageListItemBar position='top' title={`${hairdresser.firstName} ${hairdresser.lastName}`} />
										<ImageListItemBar subtitle={getUserRole(hairdresser.role).capitalized} />

									</ImageListItem>
								)
							})
						}

					</ImageList >


				</Stack >
			</Container >
		</Box>
	)
}

export default OurTeamView