import { useState } from "react"

import { Product } from "../../models/Product"
import { Service } from "../../models/Service"
import { Order } from "../../models/Order"
import { User } from "../../models/User"
import { IdType } from "../../types/common/common-types"

import ConfirmDeleteDialog from "../ConfirmDeleteDialog"
import ProductDataTable from "./ProductDataTable"
import ServiceDataTable from "./ServiceDataTable"
import UserDataTable from "./UserDataTable"
import OrderDataTable from "./OrderDataTable"

import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"

type TEntityType = 'client' | 'staff' | 'service' | 'product' | 'order'
interface Props {
    entityType: TEntityType,
    entities: Omit<User, 'password'>[] | Product[] | Service[] | Order[] | null
}

function DataTable({ entityType, entities }: Props) {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false)
    const [deleteItem, setDeleteItem] = useState<{ _id: string, entity: TEntityType | '' }>({
        _id: '',
        entity: ''
    })

    const onDeleteButtonClickHandler = (_id: IdType, entity: TEntityType): void => {
        setShowConfirmationDialog(true)
        setDeleteItem({ _id, entity })
    }

    const closeConfirmationDialog = (): void => {
        setShowConfirmationDialog(false)
    }

    return (
        <>
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table aria-label='simple table' stickyHeader size="small">

                    {(entityType === 'client' || entityType === 'staff')
                        && <UserDataTable
                            entityType={entityType}
                            entities={entities as Omit<User, 'password'>[]}
                            onDeleteButtonClickHandler={onDeleteButtonClickHandler} />
                    }

                    {entityType === 'service'
                        && <ServiceDataTable
                            entities={entities as Service[]}
                            onDeleteButtonClickHandler={onDeleteButtonClickHandler} />
                    }

                    {entityType === 'product'
                        && <ProductDataTable
                            entities={entities as Product[]}
                            onDeleteButtonClickHandler={onDeleteButtonClickHandler} />
                    }

                    {entityType === 'order'
                        && <OrderDataTable
                            entities={entities as Order[]}
                            />
                    }

                </Table>
            </TableContainer>

            {
                showConfirmationDialog
                    ? <ConfirmDeleteDialog
                        itemToDelete={{ _id: deleteItem._id, entityType: deleteItem.entity as 'client' | 'service' | 'product' | 'staff' }}
                        showConfirmationDialog={showConfirmationDialog}
                        closeConfirmationDialog={closeConfirmationDialog}
                    />
                    : ''
            }
        </>
    )
}

export default DataTable