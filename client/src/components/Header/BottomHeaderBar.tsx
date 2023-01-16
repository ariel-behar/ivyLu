import IsLoggedInButtons from './HeaderButtons/IsLoggedInButtons';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface Props {
    isLoggedIn: boolean
}

function BottomHeaderBar({ isLoggedIn }: Props) {
    return (
        <Box
            sx={{ backgroundColor: 'main.beige', position: 'fixed', top:'64px', width: '100%', zIndex: 100 }}
            component={Paper}
        >
            <Container>
                <IsLoggedInButtons whichHeaderBar='bottom'/>
            </Container>
        </Box >
    )
}

export default BottomHeaderBar