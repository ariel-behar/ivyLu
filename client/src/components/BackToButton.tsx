import { useNavigate } from "react-router-dom"

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
        <>
            <Button size="small" variant="text" color="secondary" onClick={onBackButtonClickHandler} startIcon={<ArrowBackIcon />}>
                Back to {whereTo}
            </Button>
        </>
    )
}

export default BackToButton