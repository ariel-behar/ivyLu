import IsLoggedInButtons from './HeaderButtons/IsLoggedInButtons';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


function BottomHeaderBar() {
    return (
        <Box style={{ background: '#F3EFE0', boxShadow: 'none' }}>
            <Container>
                <IsLoggedInButtons bar={'bottom'} />
            </Container>
        </Box>
    )
}

export default BottomHeaderBar