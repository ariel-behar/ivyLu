import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom'

import { useAuthContext } from '../contexts/AuthContext';

import womanBlondHair from '../assets/img/woman-blond-hair.jpg'
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
	background-image: ${`url('${womanBlondHair}')`};
	width: 100%;
	background-repeat: no-repeat;
	background-size: cover;

	.container {
		padding-top: 20px;
	}
`

function HomeView() {
	const { isLoggedIn } = useAuthContext() as { isLoggedIn: boolean }
	const [hovered, setHovered] = useState<boolean>(false);

	return (
		<StyledBackgroundBox sx={{ 
			height: isLoggedIn ? 'calc(100vh - 66px - 36.5px - 50px)' : 'calc(100vh - 65px - 50px)' 
			}}>

			<Container className='container'>
				<Grid container >
					<Grid item xs={12} sm={6} md={6} lg={5}>
						<motion.img
							src={entireLogo}
							style={{ maxWidth: '100%', maxHeight: '100%' }}
							alt="Logo"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 2 }}
						/>

						<Box ml={2}>
							<Typography
								mt={4}
								variant='h4'
								component={motion.h5}
								sx={{ color: 'common.white', textTransform: 'uppercase' }}
								color='white'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 2, delay: 0.5 }}
							>
								Immerse yourself in the Magical World of Colors, Style & Beauty
							</Typography>


							<Stack
								component={motion.div}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 2, delay: 0.8 }}
								mt={8} direction='row' spacing={3} justifyContent='space-between' alignItems='center' alignContent='center'
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