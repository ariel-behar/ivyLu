import womanDarkHair from '../assets/img/woman-brown-hair.jpg'

import Container from '@mui/material/Container'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Box from '@mui/material/Box';

function HomeView() {
	return (
		<Box >
			<Carousel infiniteLoop showThumbs={false} showIndicators={false} showStatus={false}>

				<div className='image'>
					<Container>
						<img src={womanDarkHair} alt='Woman brown hair' />
						<p className="legend">Legend 1</p>
					</Container>
				</div>
				<div className='image'>
					<img src={womanDarkHair} alt='Woman brown hair' />
					<p className="legend">Legend 2</p>
				</div>
				<div className='image'>
					<img src={womanDarkHair} alt='Woman brown hair' />
					<p className="legend">Legend 3</p>
				</div>

			</Carousel>
		</Box>
	)
}

export default HomeView