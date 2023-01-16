import { useNavigate } from "react-router-dom"

import Button from "@mui/material/Button/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    whereTo: 'services' | 'products'
}

function BackToButton({ whereTo }: Props) {
    const navigate = useNavigate()

    const onBackButtonClickHandler = () => {
        navigate(`/${whereTo}`);
    }

    return (
        <>
            <Button size="small" variant="contained" color="secondary" onClick={onBackButtonClickHandler} startIcon={<ArrowBackIcon />}>
                Back to {whereTo}
            </Button>
        </>
    )
}

export default BackToButton