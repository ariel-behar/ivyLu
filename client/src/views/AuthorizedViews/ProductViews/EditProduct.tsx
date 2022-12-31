import React, { useState } from "react"
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import uniqid from 'uniqid';

import createProductFormSchema from "../../../validations/createProductFormSchema";

import { AuthTokenType, IdType } from "../../../types/common/commonTypes";
import { ApiClient, ApiClientImpl } from "../../../services/clientServices";
import { Product } from "../../../models/Product";

import { useAuthContext } from "../../../contexts/AuthContext";
import { useNotificationContext } from "../../../contexts/NotificationContext";
import { IMAGE_URL_REGEX } from "../../../utils/regex";

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

type FormData = {
    title: string,
    description: string,
    additionalComments: string | null,
    imgUrl: string,
    price: number,
    volume: string,
    volumeMeasurementUnit: string,
    productCode: string,
    status: 'active' | 'inactive'
}

const measurementUnits: object = {
    milliliters: {
        onTextField: 'Milliliters',
        abbreviated: 'ml',
        lowerCase: 'milliliters'
    },
    grams: {
        onTextField: 'Grams',
        abbreviated: 'gr',
        lowerCase: 'grams'
    }
}

const clientServices: ApiClient<IdType, Product, AuthTokenType> = new ApiClientImpl<IdType, Product, AuthTokenType>('products');

function EditProduct() {
    let product = useLoaderData() as Product;
    let { productId } = useParams<string>()
    const [measurementUnit, setMeasurementUnit] = useState<object>(measurementUnits[product.volumeMeasurementUnit as keyof typeof measurementUnits])
    const [priceValue, setPriceValue] = useState<string>(product.price.toString())
    const [status, setStatus] = useState<string>(product.status)
    const [previewImgUrl, setPreviewImageUrl] = useState<string>(product.imgUrl)
    const { user } = useAuthContext() as any;
    const { displayNotification } = useNotificationContext() as any;
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormData>({
        mode: 'onBlur',
        resolver: yupResolver(createProductFormSchema),
        defaultValues: {
            title: product.title,
            description: product.description,
            additionalComments: product.additionalComments,
            imgUrl: product.imgUrl,
            price: product.price,
            volume: product.volume,
            volumeMeasurementUnit: product.volumeMeasurementUnit,
            productCode: product.productCode,
            status: product.status
        }
    })

    const handleVolumeMeasurementUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ((e.target.value as string).toLowerCase() === 'milliliters') {
            setMeasurementUnit(measurementUnits['milliliters' as keyof typeof measurementUnits]);
        } else if ((e.target.value as string).toLowerCase() === 'grams') {
            setMeasurementUnit(measurementUnits['grams' as keyof typeof measurementUnits]);
        }
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
        navigate('/management/products')
    }

    const onFormSubmit = async (data: FormData, e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
        e?.preventDefault();

        let { title, description, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status } = data;
        price = Number(price);

        const product = { title, description, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status }

        if (productId) {
            try {
                let editProductResponse = await clientServices.update(productId, product as Product, user.AUTH_TOKEN)
                console.log('editProductResponse:', editProductResponse)

                if (editProductResponse) {
                    displayNotification({message: 'Record has successfully been modified'}, 'success')
                    navigate('/management/products')
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
                            label="Product Title"
                            variant="outlined"
                            size="small"
                            {...register('title')}
                            error={errors.title ? true : false}
                            helperText={errors.title ? errors.title.message : ''}
                        />

                        <TextField
                            required
                            label="Product Description"
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
                                label="Product Image"
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
                                label="Volume"
                                variant="outlined"
                                size="small"
                                type='number'
                                {...register('volume')}
                                error={errors.volume ? true : false}
                                helperText={errors.volume ? errors.volume.message : ''}
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>{measurementUnit['abbreviated' as keyof typeof measurementUnit]}</InputAdornment>
                                }}
                            />

                            <TextField
                                required
                                label='Select Measurement Unit'
                                select
                                value={measurementUnit['lowerCase' as keyof typeof measurementUnit]}
                                {...register('volumeMeasurementUnit')}
                                onChange={handleVolumeMeasurementUnitChange}
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.volumeMeasurementUnit ? true : false}
                                helperText={errors.volumeMeasurementUnit ? errors.volumeMeasurementUnit.message : ''}
                            >
                                {
                                    Object.values(measurementUnits).map(unit => (
                                        <MenuItem key={uniqid()} value={unit.lowerCase}>{unit.onTextField}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Stack>

                        <TextField
                            required
                            label="Price"

                            variant="outlined"
                            size="small"
                            type='number'
                            {...register('price')}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriceValue(e.target.value)}
                            value={priceValue}
                            error={errors.price ? true : false}
                            helperText={errors.price ? errors.price.message : ''}
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>BGN</InputAdornment>
                            }}
                        />

                        <TextField
                            required
                            label="Product code"
                            variant="outlined"
                            size="small"
                            type='number'
                            {...register('productCode')}
                            error={errors.price ? true : false}
                            helperText={errors.productCode ? errors.productCode.message : ''}
                        />


                        <FormControl required>
                            <FormLabel id="status-select-group" >Status</FormLabel>
                            <RadioGroup row aria-labelledby="status-select-group" value={status ?? ' '} onChange={onStatusChange} >
                                <FormControlLabel value="active" control={<Radio />} label="Active" {...register('status')} />
                                <FormControlLabel value="inactive" control={<Radio />} label="Inactive" {...register('status')} />
                            </RadioGroup>
                            <FormHelperText> {errors.status ? errors.status.message : ''} </FormHelperText>
                        </FormControl>

                        <Stack direction='row' justifyContent='space-around'>
                            <Button variant="contained" type='submit' disabled={!(isDirty && isValid)}>Edit Product</Button>
                            <Button variant="contained" color="error" onClick={onClickCancelButton}>Cancel</Button>
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

export default EditProduct