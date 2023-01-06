import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function GoToDashboardButton() {
  const navigate = useNavigate()

  const onBackButtonClickHandler = () => {
    navigate(`/dashboard`);
  }

  return (
    <>
      <Button size="small" variant="text" color="success" onClick={onBackButtonClickHandler} endIcon={<ArrowForwardIcon />}>
        Go to dashboard
      </Button>
    </>
  )
}

export default GoToDashboardButton