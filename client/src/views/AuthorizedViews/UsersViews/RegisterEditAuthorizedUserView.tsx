
import React, { useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import registerAuthorizedFormSchema from '../../../validations/registerAuthorizedFormSchema';
import { ApiUser, ApiUserImpl } from '../../../services/userServices';
import { AuthTokenType, IdType } from '../../../types/common/common-types';
import { StaffRegisterDTO, User, UserRole } from '../../../models/User';
import { useNotificationContext } from '../../../contexts/NotificationContext';
import { IMAGE_URL_REGEX } from '../../../utils/regex';
import { useAuthContext } from '../../../contexts/AuthContext';

import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/system/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const userServices: ApiUser<IdType, User, AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>('staff');

type FormData = {
	firstName: string,
	lastName: string,
	email: string,
	phone: string,
	gender: "male" | "female",
	imgUrl: string,
	role: UserRole,
	about: string,
	password: string,
	confirmPassword: string
}

interface Props {
	formType: 'register' | 'edit'
}

function RegisterEditAuthorizedUserView({ formType }: Props) {
	const staffMember = useLoaderData() as User || {};

	const [gender, setGender] = useState<"male" | "female">(staffMember.gender || 'female')
	const [role, setRole] = useState<UserRole>(staffMember.role || 2)
	const { displayNotification } = useNotificationContext() as any;
	const { user } = useAuthContext() as { user: User };
	const [previewImgUrl, setPreviewImageUrl] = useState<string>(staffMember.imgUrl || '')
	const navigate = useNavigate();

	const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormData>({
		mode: 'onBlur',
		resolver: yupResolver(registerAuthorizedFormSchema),
		defaultValues: {
			firstName: staffMember.firstName || '',
			lastName: staffMember.lastName || '',
			email: staffMember.email || '',
			phone: staffMember.phone || undefined,
			gender: staffMember.gender || 'female',
			imgUrl: staffMember.imgUrl || '',
			role: staffMember.role || 2,
			about: staffMember.about || '',
			password: '',
			confirmPassword: ''
		}
	})

	const onFormSubmit = async (data: FormData, e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		e?.preventDefault();

		let { firstName, lastName, email, phone, gender, role, password } = data;
		let imgUrl = '';
		let about = ''

		if (data.hasOwnProperty('about')) {
			imgUrl = data.imgUrl
			about = data.about
		}
		const newUser = new StaffRegisterDTO(firstName, lastName, email, phone, gender, password, role, about, imgUrl)

		try {
			if (formType === 'register') {
				let registerUserResponse = await userServices.register(newUser as User, user.authToken)

				if (registerUserResponse) {
					displayNotification({ message: 'Staff member has succesfully been created' }, 'success')
					navigate('/management/staff')
				}
			}

			if (formType === 'edit') {
				let editUserResponse = await userServices.update(staffMember._id, newUser as User, user.authToken)

				if (editUserResponse) {
					displayNotification({ message: 'Staff Member has succesfully been modified' }, 'success')
					navigate('/management/staff')
				}
			}
		} catch (err) {
			displayNotification(err, 'error')

		}

	}

	const onGenderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setGender(e.target.value as 'male' | 'female')
	}

	const onRoleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setRole(Number((e.target as HTMLInputElement).value))
	}

	const onClickCancelButton = (): void => {
		navigate('/management/staff')
	}

	const handlePreviewImage = (e: React.FocusEvent<HTMLInputElement>) => {
		if ((IMAGE_URL_REGEX).test(e.target.value)) {
			setPreviewImageUrl(e.target.value as string);
		} else {
			setPreviewImageUrl('')
		}
	}

	return (
		<Paper style={{ padding: '10px' }}>
			<div>RegisterAuthorizedView</div>
			<Grid container spacing={2} columnSpacing={1}>
				<Grid item xs={12} sm={12} lg={7}>
					<form onSubmit={handleSubmit(onFormSubmit)}>
						<Stack spacing={1}>
							<TextField
								required
								id="first-name"
								label="First Name"
								variant="outlined"
								size="small"
								{...register('firstName')}
								error={errors.firstName ? true : false}
								helperText={errors.firstName ? errors.firstName.message : ''}
							/>

							<TextField
								required
								id="last-name"
								label="Last Name"
								variant="outlined"
								size="small"
								{...register('lastName')}
								error={errors.lastName ? true : false}
								helperText={errors.lastName ? errors.lastName.message : ''}
							/>


							<TextField
								required
								id="email"
								label="E-mail"
								placeholder='example@email.com'
								variant="outlined"
								size="small"
								{...register('email')}
								error={errors.email ? true : false}
								helperText={errors.email ? errors.email.message : ''}
							/>

							<TextField
								required
								id="phone-number"
								type='number'
								label="Phone Number"
								variant="outlined"
								size="small"
								{...register('phone')}
								error={errors.phone ? true : false}
								helperText={errors.phone ? errors.phone.message : ''}
							/>



							<Stack direction='row' justifyContent='space-around'>
								<FormControl required>
									<FormLabel id="gender-select-group" >Gender</FormLabel>
									<RadioGroup row aria-labelledby="gender-select-group" value={gender ?? ' '} onChange={onGenderChange} >
										<FormControlLabel value="female" control={<Radio />} label="Female" {...register('gender')} />
										<FormControlLabel value="male" control={<Radio />} label="Male" {...register('gender')} />
									</RadioGroup>
									<FormHelperText> {errors.gender ? errors.gender.message : ''} </FormHelperText>
								</FormControl>

								<FormControl required>
									<FormLabel id="role-select-group" >User Role</FormLabel>
									<RadioGroup row aria-labelledby="role-select-group" value={role ?? ' '} onChange={onRoleChange} >
										<FormControlLabel value="2" control={<Radio />} label="Hairdresser" {...register('role')} />
										<FormControlLabel value="3" control={<Radio />} label="Operator" {...register('role')} />
										<FormControlLabel value="4" control={<Radio />} label="Admin" {...register('role')} />
									</RadioGroup>
									<FormHelperText> {errors.role ? errors.role.message : ''} </FormHelperText>
								</FormControl>
							</Stack>



							{
								role === 2
								&& <>
									<Box width='100%' component='div' onBlur={handlePreviewImage}>
										<TextField
											fullWidth
											required={role === 2}
											label={role === 2 ? "Hairdresser Image" : 'User Image'}
											placeholder='https://...'
											variant="outlined"
											size="small"
											{...register('imgUrl')}
											error={errors.imgUrl ? true : false}
											helperText={errors.imgUrl ? errors.imgUrl.message : ''}
										/>
										<TextField
											fullWidth
											required={role === 2}
											label="About Hairdresser"
											variant="outlined"
											size="small"
											{...register('about')}
											error={errors.about ? true : false}
											helperText={errors.about ? errors.about.message : ''}
										/>
									</Box>
								</>
							}

							<TextField
								required
								id="password"
								type="password"
								label="Password"
								variant="outlined"
								size="small"
								{...register('password')}
								error={errors.password ? true : false}
								helperText={errors.password ? errors.password.message : ''}
							/>

							<TextField
								required
								id="confirmPassword"
								type="password"
								label="Confirm Password"
								variant="outlined"
								size="small"
								{...register('confirmPassword')}
								error={errors.confirmPassword ? true : false}
								helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
							/>

						</Stack>

						<Stack direction='row' justifyContent='space-around' mt={3}>
							<Button variant="contained" type='submit' disabled={!(isDirty && isValid)}>{formType === 'register' ? 'REGISTER' : 'EDIT'}</Button>
							<Button variant="contained" color="error" onClick={onClickCancelButton}>Cancel </Button>
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

export default RegisterEditAuthorizedUserView;