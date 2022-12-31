import { Product } from '../../models/Product'

import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { getMeasurementUnit } from '../../utils/getMeasurementUnit'


interface ProductDataTableInterface {
    entity: Product[]
}

function ProductDataTable({
    entity
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
                            <TableCell align='center'><Button variant="text" color='error'>Delete</Button></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </>

    )
}

export default ProductDataTable