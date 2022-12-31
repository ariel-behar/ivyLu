import { Product } from '../../models/Product'

import { getMeasurementUnit } from '../../utils/getMeasurementUnit'
import { IdType } from '../../types/common/commonTypes'

import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"



interface ProductDataTableInterface {
    entity: Product[],
    onDeleteButtonClickHandler: (_id: IdType, entity: 'product') => void
}

function ProductDataTable({
    entity,
    onDeleteButtonClickHandler
}: ProductDataTableInterface) {
    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Product Code</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Additional Comments</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell>Price</TableCell>

                    <TableCell align='center'>Edit</TableCell>
                    <TableCell align='center'>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {
                    (entity as Product[]).map((product) => (
                        <TableRow
                            key={product._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='center'><img height='50px' src={product.imgUrl} alt={`${product.title}`} /></TableCell>
                            <TableCell>{product.productCode}</TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.additionalComments}</TableCell>
                            <TableCell >{`${product.volume} ${getMeasurementUnit(product.volumeMeasurementUnit).abbreviated}`}</TableCell>
                            <TableCell >{product.price} BGN</TableCell>

                            <TableCell align='center'><Button variant="text">Edit</Button></TableCell>
                            
                            <TableCell align='center'>
                                <Button variant="text" color="error" onClick={() => onDeleteButtonClickHandler(product._id, 'product')}>
                                    Delete 
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </>

    )
}

export default ProductDataTable