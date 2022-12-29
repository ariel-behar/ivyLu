import { useNavigate } from "react-router-dom"

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button/Button";

import UndoIcon from '@mui/icons-material/Undo';

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
            <Button size="small" variant="contained" color="secondary" onClick={onBackButtonClickHandler} startIcon={<UndoIcon />}>
                Back to Services
            </Button>
        </Stack>
    )
}

export default BackToButton