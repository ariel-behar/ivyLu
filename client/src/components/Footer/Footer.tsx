import logoIvyLu from '../../assets/img/logo-ivylu.png'

import Box from '@mui/material/Box'

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
        </Box>
    )
}

export default Footer