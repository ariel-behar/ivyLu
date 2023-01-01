import logoIvyLu from '../../assets/img/logo-ivylu.png'

import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Toolbar from "@mui/material/Toolbar"

function Footer() {
    return (
        <Paper
            square
            component='header'
            elevation={10}
            sx={{
                backgroundColor: 'main.black',
                position: 'fixed',
                bottom: 0,
                width: '100%',
                height:'50px'
            }}
        >
            <Container>
                <Toolbar sx={{
                    backgroundColor: 'main.black',
                    borderRadius: '50%',
                    position: "absolute",
                    zIndex: '100',
                    left: "50%",
                    bottom: "5px",
                    transform: "translate(-50%, 0)"
                }}>
                    <img src={logoIvyLu} alt="IvyLu Logo" style={{ maxWidth: "80px" }} />
                </Toolbar>
            </Container>
        </Paper>
    )
}

export default Footer