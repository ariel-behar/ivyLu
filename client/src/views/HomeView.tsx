import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom'

import { useAuthContext } from '../contexts/AuthContext';

import entireLogo from '../assets/img/entire-logo.png'

import styled from '@mui/material/styles/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const StyledBackgroundBox = styled(Box)`
	position: 'relative';
	background-image: url('https://ivy-lu.s3.eu-central-1.amazonaws.com/backgrounds/woman-blond-hair.jpg');
	width: 100%;
	position: relative;
	background-repeat: no-repeat;
	background-size: cover;

	.mask {
		position: absolute;
		background-color: rgba(0,0,0, 0.6);
		width: 100%;
		height: 100%;
	}

	.container {
		padding-top: 20px;
		height: 10
	}
`

function HomeView() {
	const { isLoggedIn } = useAuthContext() as { isLoggedIn: boolean }
	const [hovered, setHovered] = useState<boolean>(false);

	return (
		<StyledBackgroundBox sx={{
			minHeight: {
				xs: isLoggedIn ? 'calc(100vh - 56px - 36.5px - 50px)' : 'calc(100vh - 60px - 50px)',
				md: isLoggedIn ? 'calc(100vh - 56px - 36.5px - 60px)' : 'calc(100vh - 60px - 60px)'
			},
			height: {
				xs: isLoggedIn ? 'calc(100% - 56px - 36.5px - 50px)' : 'calc(100% - 60px - 50px)',
				md: isLoggedIn ? 'calc(100% - 56px - 36.5px - 60px)' : 'calc(100% - 60px - 60px)'
			},
			backgroundPosition: { xs: 'top right -200px', md: 'inherit' }
		}}>
			<Box 
				className='mask' 
				display={{ xs: 'block', md: 'none' }}
			></Box>

			<Container className='container'>
				<Grid container >
					<Grid item xs={12} sm={6} md={6} lg={5} >
						<Box width='100%' height='auto' px={{ xs: 3, md: 0 }} pt={{xs: 4, lg: 3}}>
							<motion.img
								src={entireLogo}
								style={{ maxWidth: '100%', maxHeight: '100%' }}
								alt="Logo"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 2 }}
							/>
						</Box>

						<Box ml={2} textAlign='center'>
							<Typography
								mt={4}
								variant='h4'
								component={motion.h5}
								sx={{ color: 'common.white', textTransform: 'uppercase', fontSize: { xs: '1.5rem', md: '2.125rem' } }}
								color='white'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 2, delay: 0.5 }}
							>
								Immerse yourself in the Magical World of&nbsp;
								<Box component='span' sx={{ color: '#d4e157' }}>C</Box>
								<Box component='span' sx={{ color: '#8c675a' }}>O</Box>
								<Box component='span' sx={{ color: '#4caf50' }}>L</Box>
								<Box component='span' sx={{ color: '#8c675a' }}>O</Box>
								<Box component='span' sx={{ color: '#0277bd' }}>R</Box>
								<Box component='span' sx={{ color: '#e84845' }}>S</Box>
								,&nbsp;
								<i>Style</i> &&nbsp;
								<Box component='span' sx={{ fontFamily: "'Dancing Script', cursive" }}>Beauty</Box>

							</Typography>


							<Stack
								component={motion.div}

								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 2, delay: 0.8 }}

								mt={{ xs: 6, md: 8 }}
								mb={{ xs: 4, md: 0 }}
								spacing={3}
								direction='row'
								justifyContent='center'
								alignItems='center'
								alignContent='center'
							>
								<Button
									onMouseOver={() => setHovered(true)}
									onMouseOut={() => setHovered(false)}

									component={RouterLink}
									to="/services"
									sx={{
										backgroundColor: 'main.yellow.dark',
										color: 'black',
										'&:hover': {
											transform: hovered ? 'scale(1.1)' : 'scale(1.0)',
											backgroundColor: 'main.yellow.primary',
										}
									}}
									variant='contained'
								>
									Go to Services
								</Button>
								<Box sx={{ borderColor: 'white', borderSize: '1px', borderStyle: 'solid', width: '1px', height: '100%' }} ></Box>

								<Button
									onMouseOver={() => setHovered(true)}
									onMouseOut={() => setHovered(false)}

									component={RouterLink}
									to="/products"
									sx={{
										backgroundColor: 'main.yellow.dark',
										color: 'black',
										'&:hover': {
											transform: hovered ? 'scale(1.1)' : 'scale(1.0)',
											backgroundColor: 'main.yellow.primary',
										}
									}}
									variant='contained'
								>
									Go to Products
								</Button>

							</Stack>
						</Box>
					</Grid>
				</Grid>
			</Container >

		</StyledBackgroundBox >
	)
}

export default HomeView