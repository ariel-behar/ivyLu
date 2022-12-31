import { useState } from "react"

import { Product } from "../../models/Product"
import { Service } from "../../models/Service"
import { User } from "../../models/User"

import ConfirmationDialog from "../Common/ConfirmationDialog"
import ProductDataTable from "./ProductDataTable"
import ServiceDataTable from "./ServiceDataTable"
import UserDataTable from "./UserDataTable"

import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import { IdType } from "../../types/common/commonTypes"


interface DataTableInterface {
    entityType: 'user' | 'service' | 'product',
    entities: Omit<User, 'password'>[] | Product[] | Service[]
}

function DataTable({ entityType, entities }: DataTableInterface) {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false)
    const [deleteItem, setDeleteItem] = useState<{ _id: string, entity: 'user' | 'service' | 'product' | '' }>({
        _id: '',
        entity: ''
    })


    const onDeleteButtonClickHandler = (_id: IdType, entity: 'user' | 'service' | 'product'): void => {
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
                    {entityType === 'user'
                        ? <UserDataTable entity={entities as Omit<User, 'password'>[]} onDeleteButtonClickHandler={onDeleteButtonClickHandler}/>
                        : ''
                    }
                    {
                        entityType === 'service'
                            ? <ServiceDataTable entity={entities as Service[]} onDeleteButtonClickHandler={onDeleteButtonClickHandler} />
                            : ''
                    }
                    {
                        entityType === 'product'
                            ? <ProductDataTable entity={entities as Product[]} onDeleteButtonClickHandler={onDeleteButtonClickHandler} />
                            : ''
                    }
                </Table>
            </TableContainer>

            {
                showConfirmationDialog
                    ? <ConfirmationDialog
                        itemToDelete={{_id: deleteItem._id, entity: deleteItem.entity as 'user' | 'service' | 'product'}}
                        showConfirmationDialog={showConfirmationDialog}
                        closeConfirmationDialog={closeConfirmationDialog}
                    />
                    : ''
            }
        </>
    )
}

export default DataTable