import { Service } from '../../models/Service'
import { IdType } from '../../types/common/commonTypes'

import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import StyledTableCell from './StyledTableCell'
import StyledTableRow from './StyledTableRow'


interface ServiceDataTableInterface {
    entity: Service[],
    onDeleteButtonClickHandler: (_id: IdType, entity: 'service') => void
}

function ServiceDataTable({
    entity,
    onDeleteButtonClickHandler
}: ServiceDataTableInterface) {
    return (
        <>
            <TableHead>
                <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Additional Comments</StyledTableCell>
                    <StyledTableCell>Duration</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                    
                    <StyledTableCell align='center'>Edit</StyledTableCell>
                    <StyledTableCell align='center'>Delete</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {
                    (entity as Service[]).map((service) => (
                        <StyledTableRow
                            key={service._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='center'><img height='50px' src={service.imgUrl} alt={`${service.title}`} /></TableCell>
                            <TableCell>{service.title}</TableCell>
                            <TableCell>{service.description}</TableCell>
                            <TableCell>{service.additionalComments}</TableCell>
                            <TableCell >{service.duration} hrs</TableCell>
                            <TableCell >{service.price} BGN</TableCell>
                            
                            <TableCell align='center'><Button variant="text">Edit</Button></TableCell>
                            
                            <TableCell align='center'>
                                <Button variant="text" color="error" onClick={() => onDeleteButtonClickHandler(service._id, 'service')}>
                                    Delete 
                                </Button>
                            </TableCell>
                        </StyledTableRow>
                    ))
                }
            </TableBody>
        </>

    )
}

export default ServiceDataTable