import { Link as RouterLink} from 'react-router-dom'

import logoIvyLu from '../../assets/img/logo-ivylu.png'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

function Footer() {
    return (
        <Box
            component='footer'
            sx={{
                marginTop: 'auto',
                backgroundColor: 'main.black',
                position: 'relative',
                zIndex: 3,
                width: '100%',
                height: '50px'
            }}
        >
            <Container sx={{ height: '100%' }}>
                <Stack height='100%' direction='row' alignItems='center' justifyContent='right' position='relative'>

                    <Typography variant='body2'>
                        Powered by 
                        <a href='http://www.arielbehar.com' rel="noreferrer" target='_blank' style={{color: 'grey'}}>Ariel Behar</a>
                        </Typography>

                    <Box sx={{
                        backgroundColor: 'main.black',
                        padding: '10px 20px',
                        borderRadius: '50%',
                        position: "absolute",
                        zIndex: 4,
                        left: "50%",
                        bottom: "5px",
                        transform: "translate(-50%, 0)"
                    }}>
                        <img src={logoIvyLu} alt="IvyLu Logo" style={{ maxWidth: "80px" }} />
                    </Box>

                </Stack>
            </Container>
        </Box>
    )
}

export default Footer