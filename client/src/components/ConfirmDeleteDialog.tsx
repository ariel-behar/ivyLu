import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../contexts/AuthContext'
import { useNotificationContext } from '../contexts/NotificationContext'

import { ApiUser, ApiUserImpl } from '../services/userServices'
import { User } from '../models/User'
import { Service } from '../models/Service'
import { ApiEntity, ApiEntityImpl } from '../services/entityServices'
import { AuthTokenType, IdType } from '../types/common/common-types'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'

interface Props {
    itemToDelete: { _id: IdType, entityType: 'client' | 'service' | 'product' | 'staff' },
    showConfirmationDialog: boolean,
    closeConfirmationDialog: () => void,
}

function ConfirmDeleteDialog({
    itemToDelete,
    showConfirmationDialog,
    closeConfirmationDialog,
}: Props) {
    const { user } = useAuthContext() as { user: User }
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

            if (deleteResponse) {
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
                aria-describedby='dialog-description'
            >

                <DialogTitle id="dialog-title" sx={{ backgroundColor: 'main.black', color: 'common.white' }}>
                    Are you sure you want to delete this
                    {itemToDelete.entityType === 'staff' ? ' staff member' : ` ${itemToDelete.entityType}`}
                    ?
                </DialogTitle>
                <DialogContent sx={{marginTop: '20px', color: 'black'}}>
                    <DialogContentText id='dialog-description' sx={{color: 'black'}}>
                        Once you click "DELETE", you will NOT be able to retrieve it.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                <Stack width='100%' px={2} pb={2} direction='row' justifyContent='space-between' alignItems='baseline'>
                        <Button autoFocus variant='contained' color='primary' onClick={() => closeConfirmationDialog()}>Cancel</Button>
                        <Button variant='contained' color='error' onClick={onDeleteButtonClick}>Delete</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDeleteDialog