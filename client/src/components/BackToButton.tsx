import { useNavigate } from "react-router-dom"

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button/Button";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type BackToButtonProps = {
    whereTo: 'services' | 'products'
}

function BackToButton({ whereTo }: BackToButtonProps) {
    const navigate = useNavigate()

    const onBackButtonClickHandler = () => {
        navigate(`/${whereTo}`);
    }

    return (
        <Stack direction='row' justifyContent='right' mb={3}>
            <Button size="small" variant="text" color="secondary" onClick={onBackButtonClickHandler} startIcon={<ArrowBackIcon />}>
                Back to {whereTo}
            </Button>
        </Stack>
    )
}

export default BackToButton