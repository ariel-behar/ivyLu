import React, { useState } from "react"
import { useForm } from 'react-hook-form';
import uniqid from 'uniqid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";

import { ApiEntity, ApiEntityImpl } from "../../../services/entityServices";
import { isOperatorAdminRouteGuard } from "../../../hoc/isOperatorAdminRouteGuard";

import createProductFormSchema from "../../../validations/createProductFormSchema";

import { Product, ProductCreateDTO } from "../../../models/Product";
import { User } from "../../../models/User";

import { useAuthContext } from "../../../contexts/AuthContext";
import { useNotificationContext } from "../../../contexts/NotificationContext";
import { IMAGE_URL_REGEX } from "../../../utils/regex";
import { AuthTokenType, IdType } from "../../../types/common/common-types";
import { getMeasurementUnit, measurementUnitsObj } from "../../../utils/getMeasurementUnit";
import { productCategories, TProductCategories } from "../../../utils/constants";


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
import Paper from "@mui/material/Paper";


type FormData = {
	title: string,
	description: string,
	productCategory: TProductCategories | '',
	additionalComments: string | null,
	imgUrl: string,
	price: number,
	volume: string,
	volumeMeasurementUnit: 'milliliters' | 'grams',
	productCode: string,
	status: 'active' | 'inactive'
}

const entityServices: ApiEntity<IdType, Product, AuthTokenType> = new ApiEntityImpl<IdType, Product, AuthTokenType>('products');

function CreateProduct() {
	const [productCategory, setProductCategory] = useState<TProductCategories>(productCategories[0])
	const [measurementUnit, setMeasurementUnit] = useState<object>(getMeasurementUnit('milliliters'))
	const [priceValue, setPriceValue] = useState<string>('1')
	const [status, setStatus] = useState<string>('active')
	const [previewImgUrl, setPreviewImageUrl] = useState<string>('')
	const { user } = useAuthContext() as { user: User };
	const { displayNotification } = useNotificationContext() as any;
	const navigate = useNavigate()

	const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormData>({
		mode: 'onBlur',
		resolver: yupResolver(createProductFormSchema),
		defaultValues: {
			title: '',
			description: '',
			productCategory: productCategories[0],
			additionalComments: '',
			imgUrl: '',
			price: 0,
			volume: '0',
			volumeMeasurementUnit: 'milliliters',
			productCode: '00000',
			status: 'active'
		}
	})

	const handleProductCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProductCategory(e.target.value as TProductCategories)
	}

	const handleVolumeMeasurementUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMeasurementUnit(getMeasurementUnit(e.target.value))
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

		let { title, description, productCategory, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status } = data;
		price = Number(price);
		let product;

		if (productCategory !== '') {
			product = new ProductCreateDTO(title, description, productCategory, additionalComments, imgUrl, price, volume, volumeMeasurementUnit, productCode, status)
		}

		try {
			let creatorId = user._id

			let createProductResponse = await entityServices.create(product as Product, creatorId, user.authToken)

			if (createProductResponse) {
				displayNotification({ message: `Product "${createProductResponse.title}" has successfully been created` }, 'success')
				navigate('/management/products')
			}

		} catch (err) {
			displayNotification(err, 'error')
		}
	}

	return (
		<Paper style={{padding: '10px'}}>
			<Grid container spacing={2} columnSpacing={1}>
				<Grid item xs={12} sm={12} lg={7}>

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
								required
								label='Select Product Category'
								select
								value={productCategory}
								{...register('productCategory')}
								onChange={handleProductCategoryChange}
								variant="outlined"
								size="small"
								fullWidth
								error={errors.productCategory ? true : false}
								helperText={errors.productCategory ? errors.productCategory.message : ''}
							>
								{
									productCategories.map(category => (
										<MenuItem key={uniqid()} value={category}>{`${category.substring(0, 1).toUpperCase()}${category.substring(1,)} `}</MenuItem>
									))
								}
							</TextField>

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
										Object.values(measurementUnitsObj).map(unit => (
											<MenuItem key={uniqid()} value={unit.lowerCase}>{unit.capitalized}</MenuItem>
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
								<Button variant="contained" type='submit' disabled={!(isDirty && isValid)}>Create Product</Button>
								<Button variant="contained" color="error" onClick={onClickCancelButton}>Cancel </Button>
							</Stack>
						</Stack>
					</form>
				</Grid>
				<Grid item lg={5}>
					<Stack maxHeight='320px' border='1px solid black' height='100%' width='100%' direction='column' justifyContent='center' alignItems='center'>
						{
							previewImgUrl
								? <CardMedia height='100%' width='auto' component='img' image={previewImgUrl} alt='Preview Image' />
								: <Typography variant='h4' textAlign='center'>Image preview will appear here</Typography>
						}
					</Stack>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default isOperatorAdminRouteGuard(CreateProduct)