import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import styled from "@mui/material/styles/styled"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.main?.black,
      color: theme.palette.common.white,
    },
  }));

export default StyledTableCell;