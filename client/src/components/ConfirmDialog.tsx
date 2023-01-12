
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'
import { Product } from '../models/Product'
import { Service } from '../models/Service'
import Typography from '@mui/material/Typography'
import { getMeasurementUnit } from '../utils/getMeasurementUnit'
import Box from '@mui/material/Box'



interface Props {
    entity: Product | Service,
    entityType: 'product' | 'service',
    showConfirmationDialog: boolean,
    closeConfirmDialog: () => void,
    onConfirmDialogConfirmClick: () => void,
}

function ConfirmDialog({
    entity,
    entityType,
    showConfirmationDialog,
    closeConfirmDialog,
    onConfirmDialogConfirmClick
}: Props) {

    return (
        <>
            <Dialog
                open={showConfirmationDialog}
                onClose={() => closeConfirmDialog()}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'>

                <DialogTitle id="dialog-title">Please <b>confirm</b> if your
                    {entityType === 'product' && ` order details `}
                    {entityType === 'service' && ' appointment details '}
                    are correct:</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        <Stack>
                            <img src={entity.imgUrl} alt={entity.title} style={{maxHeight: '350px'}}/>

                            <Box>
                                {
                                    entityType === 'product' &&
                                    <>
                                        <Typography variant="h6" component='h6'>
                                            Category: <b>{(entity as Product).productCategory.substring(0, 1).toUpperCase()}{(entity as Product).productCategory.substring(1,)}</b>
                                        </Typography>

                                        <Typography variant="h6" component='h6'>
                                            Description:  <b>{(entity as Product).description}</b>
                                        </Typography>

                                        <Typography variant="h6" component='h6'>
                                            Price: <b>{(entity as Product).price} BGN</b>
                                        </Typography>

                                        <Typography variant="h6" component='h6'>
                                            Volume: <b> {(entity as Product).volume} {getMeasurementUnit((entity as Product).volumeMeasurementUnit).abbreviated} </b>
                                        </Typography>
                                    </>
                                }
                            </Box>
                        </Stack>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Stack width='100%' px={2} pb={2} direction='row' justifyContent='space-between'>
                        <Button autoFocus variant='contained' color='primary' onClick={() => closeConfirmDialog()}>Cancel</Button>
                        <Button variant='text' color='primary' onClick={() => onConfirmDialogConfirmClick()}>Confirm
                            {entityType === 'product' ? ' order' : ''}
                            {entityType === 'service' ? ' appointment' : ''}
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDialog