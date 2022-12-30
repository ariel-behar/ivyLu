import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext'
import { useNotificationContext } from '../../contexts/NotificationContext'
import { ApiClient, ApiClientImpl } from '../../services/clientServices'
import { Service } from '../../models/Service'
import { AuthTokenType, IdType } from '../../types/common/commonTypes'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'


type ConfirmationDialogProps = {
    showConfirmationDialog: boolean,
    closeConfirmationDialog: () => void,
    itemToDelete: { _id: string, title: string },
    itemToDeleteType: string
}

function ConfirmationDialog({ showConfirmationDialog, closeConfirmationDialog, itemToDelete, itemToDeleteType }: ConfirmationDialogProps) {
    const { user } = useAuthContext() as any
    const { displayNotification } = useNotificationContext() as any;
    const clientServices: ApiClient<IdType, Service, AuthTokenType> = new ApiClientImpl<IdType, Service, AuthTokenType>(`${itemToDeleteType}s`);
    const navigate = useNavigate();

    const onDeleteButtonClick = async () => {
        let itemId = itemToDelete._id

        try {
            let deleteResponse = '';

            if (itemToDeleteType === 'service') {
                deleteResponse = await clientServices.deleteOne(itemId, undefined, user.AUTH_TOKEN);

            } else if (itemToDeleteType === 'product') {
                deleteResponse = await clientServices.deleteOne(itemId, undefined, user.AUTH_TOKEN);


            } else if (itemToDeleteType === 'user') {

            }

            if(deleteResponse) {    
                displayNotification(`Record ${itemToDelete.title} has successfully been deleted`, 'success')
                navigate(`/management/${itemToDeleteType}s`);
            }

            closeConfirmationDialog()

        } catch (err: any) {

            // displayNotification(err.message, 'error')
            console.log(err.message)
        }
    }

    return (
        <>
            <Dialog
                open={showConfirmationDialog}
                onClose={() => closeConfirmationDialog()}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'>

                <DialogTitle id="dialog-title">Are you sure you want to delete the {itemToDeleteType}: <b>{itemToDelete.title}</b>?</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        Once you click "DELETE", you will not be able to retrieve it.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Stack width='100%' px={2} pb={2} direction='row' justifyContent='space-between'>
                        <Button autoFocus variant='contained' color='primary' onClick={() => closeConfirmationDialog()}>Cancel</Button>
                        <Button variant='contained' color='error' onClick={onDeleteButtonClick}>Delete</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmationDialog