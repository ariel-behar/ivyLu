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
import { ApiUser, ApiUserImpl } from '../../services/userServices'
import { User } from '../../models/User'


type ConfirmationDialogProps = {
    itemToDelete: {_id: IdType, entity: 'client' | 'service' | 'product' | 'staff'},
    showConfirmationDialog: boolean,
    closeConfirmationDialog: () => void,
}

function ConfirmationDialog({ 
    itemToDelete, 
    showConfirmationDialog, 
    closeConfirmationDialog,
}: ConfirmationDialogProps) {
    const { user } = useAuthContext() as any
    const { displayNotification } = useNotificationContext() as any;
    const clientServices: ApiClient<IdType, Service, AuthTokenType> = new ApiClientImpl<IdType, Service, AuthTokenType>(`${itemToDelete.entity}s`);
    const userServices: ApiUser<IdType, User, AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>(itemToDelete.entity === 'client' ? 'clients' : 'staff');
    const navigate = useNavigate();

    const onDeleteButtonClick = async () => {
        try {
            let deleteResponse = '';
            let navigateTo = ''

            if (itemToDelete.entity === 'service') {
                deleteResponse = await clientServices.deleteOne(itemToDelete._id, undefined, user.AUTH_TOKEN);
                navigateTo = 'services';
            } else if (itemToDelete.entity === 'product') {
                deleteResponse = await clientServices.deleteOne(itemToDelete._id, undefined, user.AUTH_TOKEN);
                navigateTo = 'prodcuts';
            } else if (itemToDelete.entity === 'client' || itemToDelete.entity === 'staff') {
                deleteResponse = await userServices.deleteOne(itemToDelete._id, undefined, user.AUTH_TOKEN);
                navigateTo = itemToDelete.entity === 'client' ? 'clients' : 'staff';
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

                <DialogTitle id="dialog-title">Are you sure you want to delete this {itemToDelete.entity}?</DialogTitle>
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