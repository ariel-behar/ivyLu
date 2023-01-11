import { Link as RouterLink } from 'react-router-dom'

import { Service } from '../../models/Service'
import { IdType } from '../../types/common/common-types'
import { useAuthContext } from '../../contexts/AuthContext'

import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import StyledTableCell from './StyledTableCell'
import StyledTableRow from './StyledTableRow'



interface ServiceDataTableInterface {
    entities: Service[],
    onDeleteButtonClickHandler: (_id: IdType, entity: 'service') => void
}

function ServiceDataTable({
    entities,
    onDeleteButtonClickHandler
}: ServiceDataTableInterface) {
    const { isAdmin, isOperator } = useAuthContext() as any;

    return (
        <>
            <TableHead>
                <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Comments</StyledTableCell>
                    <StyledTableCell>Duration</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>

                    {(isAdmin || isOperator) &&
                        <>
                            <StyledTableCell align='center'>Edit</StyledTableCell>
                            <StyledTableCell align='center'>Delete</StyledTableCell>
                        </>
                    }

                </TableRow>
            </TableHead>
            <TableBody>

                {
                    (entities as Service[]).map((service) => (
                        <StyledTableRow
                            key={service._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='center'><img height='50px' src={service.imgUrl} alt={`${service.title}`} /></TableCell>
                            <TableCell>{service.title}</TableCell>
                            <TableCell>{service.description}</TableCell>
                            <TableCell>{service.additionalComments}</TableCell>
                            <TableCell >{service.duration} minutes</TableCell>
                            <TableCell >{service.price} BGN</TableCell>

                            {(isAdmin || isOperator) &&
                                <>
                                    <TableCell align='center'>
                                        <Button
                                            variant="text"
                                            component={RouterLink}
                                            to={`/management/services/${service._id}/edit`}>
                                            Edit
                                        </Button>
                                    </TableCell>

                                    <TableCell align='center'>
                                        <Button
                                            variant="text"
                                            color="error"
                                            onClick={() => onDeleteButtonClickHandler(service._id, 'service')}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </>
                            }

                        </StyledTableRow>
                    ))
                }
            </TableBody>
        </>

    )
}

export default ServiceDataTable