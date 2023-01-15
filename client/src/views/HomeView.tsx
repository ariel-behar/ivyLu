import womanDarkHair from '../assets/img/woman-brown-hair.jpg'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'


function HomeView() {
	return (

		<Box sx={{
			backgroundImage: `url('${womanDarkHair}')`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			minHeight: '100vh'
		}}
		>
			<Container>
				<div style={{ color: 'white' }}>HomeView</div>
				<h1 style={{ color: 'white' }}>Under Construction</h1>
			</Container>

		</Box >
	)
}

export default HomeView