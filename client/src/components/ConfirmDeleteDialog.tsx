import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../contexts/AuthContext'
import { useNotificationContext } from '../contexts/NotificationContext'
import { ApiEntity, ApiEntityImpl } from '../services/entityServices'
import { Service } from '../models/Service'
import { AuthTokenType, IdType } from '../types/common/commonTypes'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'
import { ApiUser, ApiUserImpl } from '../services/userServices'
import { User } from '../models/User'


interface ConfirmDeleteDialogProps {
    itemToDelete: {_id: IdType, entityType: 'client' | 'service' | 'product' | 'staff'},
    showConfirmationDialog: boolean,
    closeConfirmationDialog: () => void,
}

function ConfirmDeleteDialog({ 
    itemToDelete, 
    showConfirmationDialog, 
    closeConfirmationDialog,
}: ConfirmDeleteDialogProps) {
    const { user } = useAuthContext() as any
    const { displayNotification } = useNotificationContext() as any;
    const entityServices: ApiEntity<IdType, Service, AuthTokenType> = new ApiEntityImpl<IdType, Service, AuthTokenType>(`${itemToDelete.entityType}s`);
    const userServices: ApiUser<IdType, User, AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>(itemToDelete.entityType === 'client' ? 'clients' : 'staff');
    const navigate = useNavigate();

    const onDeleteButtonClick = async () => {
        try {
            let deleteResponse = '';
            let navigateTo = ''

            if (itemToDelete.entityType === 'service') {
                deleteResponse = await entityServices.deleteOne(itemToDelete._id, undefined, user.authToken);
                navigateTo = 'services';
            } else if (itemToDelete.entityType === 'product') {
                deleteResponse = await entityServices.deleteOne(itemToDelete._id, undefined, user.authToken);
                navigateTo = 'products';
            } else if (itemToDelete.entityType === 'client' || itemToDelete.entityType === 'staff') {
                deleteResponse = await userServices.deleteOne(itemToDelete._id, undefined, user.authToken);
                navigateTo = itemToDelete.entityType === 'client' ? 'clients' : 'staff';
            }            

            if(deleteResponse) {    
                displayNotification(deleteResponse, 'success')
                navigate(`/management/${navigateTo}`);
            } 
            
            closeConfirmationDialog()
        } catch (err) {
            displayNotification(err, 'error')
        }
    }

    return (
        <>
            <Dialog
                open={showConfirmationDialog}
                onClose={() => closeConfirmationDialog()}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'>

                <DialogTitle id="dialog-title">Are you sure you want to delete this 
                {itemToDelete.entityType === 'staff' ? ' staff member' : ` ${itemToDelete.entityType}`} 
                ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        Once you click "DELETE", you will not be able to retrieve it.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Stack width='100%' px={2} pb={2} direction='row' justifyContent='space-between'>
                        <Button autoFocus variant='contained' color='primary' onClick={() => closeConfirmationDialog()}>Cancel</Button>
                        <Button variant='text' color='error' onClick={onDeleteButtonClick}>Delete</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDeleteDialog