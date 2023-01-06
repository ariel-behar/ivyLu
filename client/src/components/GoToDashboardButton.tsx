import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function GoToDashboardButton() {
  const navigate = useNavigate()

  const onBackButtonClickHandler = () => {
    navigate(`/dashboard`);
  }

  return (
    <Stack direction='row' justifyContent='right' mb={3}>
      <Button size="small" variant="text" color="success" onClick={onBackButtonClickHandler} endIcon={<ArrowForwardIcon />}>
        Go to dashboard
      </Button>
    </Stack>
  )
}

export default GoToDashboardButton