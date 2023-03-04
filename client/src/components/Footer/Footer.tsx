import logoIvyLuSmallScreen from '../../assets/img/logo-ivylu.png'
import logoIvyLuLargeScreen from '../../assets/img/logo-ivylu-art-and-beauty-horizontal.png'

import styled from '@mui/material/styles/styled'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'

const StyledBox = styled(Box)`
    margin-top: 'auto';
    background-color: ${({ theme }) => theme.palette.main.black} ;
    position: 'relative';
    z-index: 3;
    width: 100%;
    height: 60px;

    .logo-container-div {
        background-color: ${({ theme }) => theme.palette.main.black};
        position: absolute;
        z-index: 4;
        left: 0;
        bottom: 0;
        transform: translate(0, 0);
        background-color: transparent;
        padding: 0 10px;

        img {
            max-width: 210px;
        }
    }

    @media (max-width: 599px) { 
        height: 50px;
        .logo-container-div {
            padding: 5px 10px;

            img {
                max-width: 50px;
            }
        }
    }
`

function Footer() {
    return (
        <StyledBox component='footer'>
            <Container sx={{ height: '100%' }}>
                <Stack
                    height='100%'
                    direction='row'
                    alignItems='center'
                    justifyContent='right'
                    position='relative'
                >
                    <Typography variant='body2' color='grey'>
                        Powered by &nbsp;
                        <Link href='http://www.arielbehar.com' rel="noreferrer" target='_blank' style={{ color: 'lightgrey' }}>Ariel Behar</Link>
                    </Typography>


                    <Box className='logo-container-div' display={{xs: 'none', sm: 'block'}}>
                        <img src={logoIvyLuLargeScreen} alt="IvyLu Logo" />
                    </Box>

                    <Box className='logo-container-div' display={{xs: 'block', sm: 'none'}}>
                        <img src={logoIvyLuSmallScreen} alt="IvyLu Logo" />
                    </Box>
                </Stack>
            </Container>
        </StyledBox>
    )
}

export default Footer