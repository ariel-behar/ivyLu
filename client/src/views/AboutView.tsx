import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

function AboutView() {
	return (
		<Box py={3}>

			<Container>
				<div>AboutView</div>

				<Stack direction='row' alignItems='center' sx={{ overflow: 'hidden' }}>
					<Typography variant="h3" sx={{ color: 'common.white', marginRight: '30px', whiteSpace: 'nowrap' }}>About IvyLu</Typography>
					<hr style={{ width: '100%', height: '2px' }} />
				</Stack>

				<h1>Under Construction</h1>
			</Container>
		</Box>
	)
}

export default AboutView