import styled from "@mui/material/styles/styled";
import TableRow from "@mui/material/TableRow";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.main?.beigeLight,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  export default StyledTableRow;