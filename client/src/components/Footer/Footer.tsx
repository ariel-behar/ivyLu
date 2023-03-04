import logoIvyLu from '../../assets/img/logo-ivylu.png'

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
    height: 50px;

    .logo-container-div {
        background-color: ${({ theme }) => theme.palette.main.black};
        padding: 10px 20px;
        border-radius: 50%;
        position: absolute;
        z-index: 4;
        left: 50%;
        bottom: 5px;
        transform: translate(-50%, 0);
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

                    <Box className='logo-container-div'>
                        <img src={logoIvyLu} alt="IvyLu Logo" style={{ maxWidth: "80px" }} />
                    </Box>
                </Stack>
            </Container>
        </StyledBox>
    )
}

export default Footer