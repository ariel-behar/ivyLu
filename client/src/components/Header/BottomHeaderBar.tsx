import IsLoggedInButtons from './HeaderButtons/IsLoggedInButtons';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


function BottomHeaderBar() {
    return (
        <Box sx={{ backgroundColor: 'main.beige'}}>
            <Container>
                <IsLoggedInButtons bar={'bottom'} />
            </Container>
        </Box>
    )
}

export default BottomHeaderBar