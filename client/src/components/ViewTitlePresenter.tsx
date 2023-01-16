import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'

interface Props {
    image: string,
    children: React.ReactNode
}

function ViewTitlePresenter({
    image,
    children
}: Props) {

    return (
        <ParallaxBanner style={{
            width: '105%',
            height: "250px",
            transformOrigin: 'bottom left',
            transform: 'rotate(-3deg)'
        }} >
            <ParallaxBannerLayer image={image} speed={-30} />
            <ParallaxBannerLayer style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <Container sx={{ height: "100%" }}>
                    <Stack height='100%' direction='row' alignItems='center'>
                        <Typography
                            variant="h1"
                            component='h3'
                            color='common.white'
                            style={{
                                transformOrigin: 'bottom left',
                                transform: 'rotate(3deg)'
                            }}
                        >
                            {children}
                        </Typography>
                    </Stack>
                </Container>
            </ParallaxBannerLayer>

        </ParallaxBanner >
    )
}

export default ViewTitlePresenter