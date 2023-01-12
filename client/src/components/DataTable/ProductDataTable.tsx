import { Link as RouterLink } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext'

import { Product } from '../../models/Product'

import { getMeasurementUnit } from '../../utils/getMeasurementUnit'
import { IdType } from '../../types/common/common-types'

import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

import StyledTableCell from './StyledTableCell'
import StyledTableRow from './StyledTableRow'
interface Props {
    entities: Product[],
    onDeleteButtonClickHandler: (_id: IdType, entity: 'product') => void
}

function ProductDataTable({
    entities,
    onDeleteButtonClickHandler
}: Props) {
    const { isAdmin, isOperator } = useAuthContext() as any;

    return (
        <>
            <TableHead>
                <TableRow>
                    <StyledTableCell ></StyledTableCell>
                    <StyledTableCell >Code</StyledTableCell>
                    <StyledTableCell >Category</StyledTableCell>
                    <StyledTableCell >Title</StyledTableCell>
                    <StyledTableCell >Description</StyledTableCell>
                    <StyledTableCell >Comments</StyledTableCell>
                    <StyledTableCell >Volume</StyledTableCell>
                    <StyledTableCell >Price</StyledTableCell>


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
                    (entities as Product[]).map((product) => (
                        <StyledTableRow
                            key={product._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='center'><img height='50px' src={product.imgUrl} alt={`${product.title}`} /></TableCell>
                            <TableCell>{product.productCode}</TableCell>
                            <TableCell>{product.productCategory.substring(0, 1).toUpperCase()}{product.productCategory.substring(1,)}</TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.additionalComments}</TableCell>
                            <TableCell >{`${product.volume} ${getMeasurementUnit(product.volumeMeasurementUnit).abbreviated}`}</TableCell>
                            <TableCell >{product.price} BGN</TableCell>



                            {(isAdmin || isOperator) &&
                                <>
                                    <TableCell align='center'>
                                        <Button
                                            variant="text"
                                            component={RouterLink}
                                            to={`/management/products/${product._id}/edit`}>
                                            Edit
                                        </Button>
                                    </TableCell>

                                    <TableCell align='center'>
                                        <Button
                                            variant="text"
                                            color="error"
                                            onClick={() => onDeleteButtonClickHandler(product._id, 'product')}
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

export default ProductDataTable