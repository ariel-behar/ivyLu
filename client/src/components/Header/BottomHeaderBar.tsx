import IsNotloggedInButtons from './HeaderButtons/IsNotloggedInButtons';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IsLoggedInButtons from './HeaderButtons/IsLoggedInButtons';
import Paper from '@mui/material/Paper';

interface BottomHeaderBarProps {
    isLoggedIn: boolean
}

function BottomHeaderBar({ isLoggedIn }: BottomHeaderBarProps) {
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