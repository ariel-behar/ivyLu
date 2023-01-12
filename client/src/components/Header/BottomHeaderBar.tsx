import IsNotloggedInButtons from './HeaderButtons/IsNotloggedInButtons';
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
            sx={{ backgroundColor: 'main.beige', position: 'fixed', width: '100%', zIndex: 100 }}
            component={Paper}
        >
            <Container>
                {
                    isLoggedIn
                        ? <IsLoggedInButtons />
                        : <IsNotloggedInButtons />
                }
            </Container>
        </Box >
    )
}

export default BottomHeaderBar