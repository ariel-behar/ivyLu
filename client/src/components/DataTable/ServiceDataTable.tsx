import { Service } from '../../models/Service'
import { IdType } from '../../types/common/commonTypes'

import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"


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
                    <TableCell sx={{ backgroundColor: 'main.black', color: 'mainContrast.white'}}></TableCell>
                    <TableCell sx={{ backgroundColor: 'main.black', color: 'mainContrast.white'}}>Title</TableCell>
                    <TableCell sx={{ backgroundColor: 'main.black', color: 'mainContrast.white'}}>Description</TableCell>
                    <TableCell sx={{ backgroundColor: 'main.black', color: 'mainContrast.white'}}>Additional Comments</TableCell>
                    <TableCell sx={{ backgroundColor: 'main.black', color: 'mainContrast.white'}}>Duration</TableCell>
                    <TableCell sx={{ backgroundColor: 'main.black', color: 'mainContrast.white'}}>Price</TableCell>
                    
                    <TableCell sx={{ backgroundColor: 'main.black', color: 'mainContrast.white'}} align='center'>Edit</TableCell>
                    <TableCell sx={{ backgroundColor: 'main.black', color: 'mainContrast.white'}} align='center'>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {
                    (entity as Service[]).map((service) => (
                        <TableRow
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
                        </TableRow>
                    ))
                }
            </TableBody>
        </>

    )
}

export default ServiceDataTable