import styled from '@mui/material/styles/styled'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const StyledHR = styled('hr')`
	width: 100%;
	height: 2px;
`

function GalleryView() {
	return (
		<Box py={3}>
			<Container>
				<div>GalleryView</div>

				<Stack direction='row' alignItems='center' sx={{ overflow: 'hidden' }}>
					<Typography variant="h3" sx={{ color: 'common.white', marginRight: '30px', whiteSpace: 'nowrap' }}>IvyLu Gallery</Typography>
					<StyledHR />
				</Stack>

				<h1>Under Construction</h1>
			</Container>
		</Box>
	)
}

export default GalleryView