import React, { useState } from "react"
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import uniqid from 'uniqid';

import createServiceFormSchema from "../../../validations/createServiceFormSchema";
import { Service } from "../../../models/Service";
import { useNotificationContext } from "../../../contexts/NotificationContext";
import { ApiClient, ApiClientImpl } from "../../../services/clientServices";
import { AuthTokenType, IdType } from "../../../types/common/commonTypes";
import { useAuthContext } from "../../../contexts/AuthContext";
import { IMAGE_URL_REGEX } from "../../../utils/regex";
import { isOperatorAdminRouteGuard } from "../../../hoc/isOperatorAdminRouteGuard";

import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import MenuItem from "@mui/material/MenuItem"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputAdornment from "@mui/material/InputAdornment";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';


const clientServices: ApiClient<IdType, Service, AuthTokenType> = new ApiClientImpl<IdType, Service, AuthTokenType>('services');

type FormData = {
    title: string,
    description: string,
    additionalComments: string | null,
    imgUrl: string,
    price: (number[] | number) | undefined,
    duration: string,
    status: 'active' | 'inactive'
}

const serviceDuration = ['0:05', '0:10', '0:15', '0:20', '0:25', '0:30', '0:35', '0:40', '0:45', '0:50', '0:55', '1:00', '1:05', '1:10', '1:15', '1:20', '1:25', '1:30', '1:40', '1:45', '1:50', '1:55', '2:00']

function EditService() {
    let service = useLoaderData() as Service;
    let { serviceId } = useParams<string>()
    const [duration, setDuration] = useState<string>(service.duration)
    const [previewImgUrl, setPreviewImageUrl] = useState<string>(service.imgUrl)
    const [status, setStatus] = useState<string>('active')
    const { user } = useAuthContext() as any;
    const { displayNotification } = useNotificationContext() as any;
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormData>({
        mode: 'onBlur',
        resolver: yupResolver(createServiceFormSchema),
        defaultValues: {
            title: service.title,
            description: service.description,
            additionalComments: service.additionalComments,
            imgUrl: service.imgUrl,
            price: service.price,
            duration: service.duration,
            status: service.status
        }
    })

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(e.target.value as string);
    }

    const handlePreviewImage = (e: React.FocusEvent<HTMLInputElement>) => {
        if ((IMAGE_URL_REGEX).test(e.target.value)) {
            setPreviewImageUrl(e.target.value as string);
        } else {
            setPreviewImageUrl('')
        }
    }

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setStatus((e.target as HTMLInputElement).value)
    }

    const onClickCancelButton = (): void => {
        navigate('/management/services')
    }


    const onFormSubmit = async (data: FormData, e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
        e?.preventDefault();

        let { title, description, additionalComments, imgUrl, price, duration, status } = data;
        price = Number(price);

        const service = { title, description, additionalComments, imgUrl, price, duration, status }

        if (serviceId) {
            try {
                let editServiceResponse = await clientServices.update(serviceId, service as Service, user.AUTH_TOKEN)

                if (editServiceResponse) {
                    displayNotification({message: 'Record has successfully been modified'}, 'success')
                    navigate('/management/services')
                }
            } catch (err) {
                displayNotification(err, 'error')
            }
        }
    }

    return (
        <Grid container spacing={2} columnSpacing={1}>
            <Grid item xs={12} sm={12} lg={8}>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Stack spacing={2}>
                        <TextField
                            required
                            label="Service Title"
                            variant="outlined"
                            size="small"
                            {...register('title')}
                            error={errors.title ? true : false}
                            helperText={errors.title ? errors.title.message : ''}
                        />

                        <TextField
                            required
                            label="Service Description"
                            variant="outlined"
                            size="small"
                            {...register('description')}
                            error={errors.description ? true : false}
                            helperText={errors.description ? errors.description.message : ''}
                        />

                        <TextField
                            label="Additional Comments"
                            variant="outlined"
                            size="small"
                            {...register('additionalComments')}
                            error={errors.additionalComments ? true : false}
                            helperText={errors.additionalComments ? errors.additionalComments.message : ''}
                        />

                        <Box width='100%' component='div' onBlur={handlePreviewImage}>
                            <TextField
                                required
                                fullWidth
                                label="Service Image"
                                placeholder='https://...'
                                variant="outlined"
                                size="small"
                                {...register('imgUrl')}
                                error={errors.imgUrl ? true : false}
                                helperText={errors.imgUrl ? errors.imgUrl.message : ''}
                            />
                        </Box>

                        <Stack direction='row' spacing={2}>
                            <TextField
                                required
                                label="Price"
                                variant="outlined"
                                size="small"
                                type='number'
                                {...register('price')}
                                error={errors.price ? true : false}
                                helperText={errors.price ? errors.price.message : ''}
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>BGN</InputAdornment>
                                }}
                            />

                            <TextField
                                required
                                label='Select Duration'
                                select
                                value={duration}
                                {...register('duration')}
                                onChange={handleDurationChange}
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.duration ? true : false}
                                helperText={errors.duration ? errors.duration.message : ''}
                            >
                                {
                                    serviceDuration.map(duration => (
                                        <MenuItem key={uniqid()} value={duration}>{duration}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Stack>

                        <FormControl required>
                            <FormLabel id="status-select-group" >Status</FormLabel>
                            <RadioGroup row aria-labelledby="status-select-group" value={status ?? ' '} onChange={onStatusChange} >
                                <FormControlLabel value="active" control={<Radio />} label="Active" {...register('status')} />
                                <FormControlLabel value="inactive" control={<Radio />} label="Inactive" {...register('status')} />
                            </RadioGroup>
                            <FormHelperText> {errors.status ? errors.status.message : ''} </FormHelperText>
                        </FormControl>

                        <Stack direction='row' justifyContent='space-around'>
                            <Button variant="contained" type='submit' disabled={!(isDirty && isValid)}>Edit Service </Button>
                            <Button variant="contained" color="error" onClick={onClickCancelButton}>Cancel </Button>
                        </Stack>
                    </Stack>
                </form>
            </Grid>
            <Grid item lg={4}>
                <Stack maxHeight='320px' border='1px solid black' height='100%' width='100%' direction='column' justifyContent='center' alignItems='center'>
                    {
                        previewImgUrl
                            ? <CardMedia height='100%' width='auto' component='img' image={previewImgUrl} alt='Preview Image' />
                            : <Typography variant='h4' textAlign='center'>Image preview will appear here</Typography>
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}

export default isOperatorAdminRouteGuard(EditService)