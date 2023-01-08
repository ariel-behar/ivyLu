import { Link as RouterLink } from 'react-router-dom'

import { getMeasurementUnit } from '../../utils/getMeasurementUnit'

import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import StyledTableCell from './StyledTableCell'
import StyledTableRow from './StyledTableRow'
import { useAuthContext } from '../../contexts/AuthContext'
import { Order } from '../../models/Order'
import getOrderStatus from '../../utils/getOrderStatus'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'


interface OrderDataTableInterface {
    entities: Order[],
}

function OrderDataTable({
    entities,
}: OrderDataTableInterface) {
    const { isAdmin, isOperator } = useAuthContext() as any;
    return (
        <>
            <TableHead>
                <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>Code</StyledTableCell>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>

                    <StyledTableCell>Client Name</StyledTableCell>
                    <StyledTableCell>Client Phone</StyledTableCell>
                    <StyledTableCell>Ordered</StyledTableCell>
                    <StyledTableCell>Shipped</StyledTableCell>
                    <StyledTableCell>Completed</StyledTableCell>

                    <StyledTableCell>Status</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {
                    (entities as Order[]).map((order: Order) => (

                        <StyledTableRow
                            key={order._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='center'>
                                <img height='50px' src={order.product.imgUrl} alt={`${order.product.title}`} />
                            </TableCell>

                            <TableCell>{order.product.productCode}</TableCell>
                            <TableCell>{order.product.productCategory.substring(0, 1).toUpperCase()}{order.product.productCategory.substring(1,)}</TableCell>
                            <TableCell>{order.product.title}</TableCell>
                            <TableCell>{order.product.price} BNG</TableCell>

                            <TableCell>{order.client.firstName} {order.client.lastName}</TableCell>
                            <TableCell>{order.client.phone}</TableCell>

                            <TableCell>
                                {`${format(parseISO(order.createdAt), 'dd/MM/yyyy')} - ${format(parseISO(order.createdAt), 'HH:mm')}`}
                            </TableCell>

                            <TableCell> - </TableCell>

                            <TableCell> - </TableCell>
                            
                            <TableCell sx={{color: order.status === 1? 'warning.main' : ''}}>
                                {`${getOrderStatus(Number(order.status))}`}
                            </TableCell>

                        </StyledTableRow>
                    ))
                }
            </TableBody>
        </>

    )
}

export default OrderDataTable