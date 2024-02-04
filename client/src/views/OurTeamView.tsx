import { useLoaderData } from "react-router-dom"
import uniqid from "uniqid";

import { User } from "../models/User";

import styled from "@mui/material/styles/styled";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ImageList from "@mui/material/ImageList";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageListItem from "@mui/material/ImageListItem";
import getUserRole from "../utils/getUserRole";
import Box from "@mui/material/Box";

const StyledHR = styled('hr')`
	width: 100%;
	height: 2px;
`

function OurTeamView() {
	const hairdressers = useLoaderData() as User[];

	return (
		<Box py={3}>
			<Container sx={{ minHeight: '80vh' }}>
				{/* <div>OurTeamView</div> */}

				<Stack direction='row' alignItems='center' sx={{overflow: 'hidden'}}>
					<Typography variant="h3" sx={{ color: 'common.white', marginRight: '30px', whiteSpace: 'nowrap' }}>Meet Our Team!</Typography>
					<StyledHR />
				</Stack>

				<Stack direction='row' height='100%'>

					<ImageList
						sx={{ 
							width: '100%', 
							gridTemplateColumns: {xs: 'repeat(1, 1fr)!important', sm: 'repeat(2, 1fr)!important', md: 'repeat(3, 1fr)!important'}
						}}
						gap={10}
					>
						{
							hairdressers.map((hairdresser: User) => {
								return (
									<ImageListItem key={uniqid()}>
										<img src={hairdresser.imgUrl} alt={hairdresser.firstName} loading='lazy' />

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