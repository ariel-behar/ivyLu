import { Product } from "../../models/Product"
import { Service } from "../../models/Service"
import { User } from "../../models/User"


import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"

import ProductDataTable from "./ProductDataTable"
import ServiceDataTable from "./ServiceDataTable"
import UserDataTable from "./UserDataTable"

interface DataTableInterface {
    entityType: 'user' | 'service' | 'product',
    entities: Omit<User, 'password'>[] | Product[] | Service[]
}

function DataTable({ entityType, entities }: DataTableInterface) {
    return (
        <TableContainer component={Paper} sx={{marginTop: '20px'}}>
            <Table aria-label='simple table' stickyHeader size="small">
                    {entityType === 'user'
                        ? <UserDataTable entity={entities as Omit<User, 'password'>[]}/>
                        : ''
                    }
                    {
                        entityType === 'service'
                            ? <ServiceDataTable entity={entities as Service[]} />
                            : ''
                    }
                    {
                        entityType === 'product'
                            ? <ProductDataTable entity={entities as Product[]}/>
                            : ''
                    }
            </Table>
        </TableContainer>
    )
}

export default DataTable