
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/system/Stack';
import FormHelperText from '@mui/material/FormHelperText';

import registerFormSchema from '../validations/registerFormSchema';
import { User, UserRegisterDTO } from '../models/User';
import { useAuthContext } from '../contexts/AuthContext';
import { AuthTokenType, IdType } from '../types/common/commonTypes';
import { useNotificationContext } from '../contexts/NotificationContext';
import { ApiUser, ApiUserImpl } from '../services/userServices';
import { isGuestRouteGuard } from '../hoc/isGuestRouteGuard';

const userServices: ApiUser<IdType, User, AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>('clients');

type FormData = {
	firstName: string,
	lastName: string,
	email: string,
	phone: number,
	gender: "male" | "female",
	password: string,
	confirmPassword: string
}

function RegisterView() {
	const [gender, setGender] = useState<string>('female')
	const { displayNotification } = useNotificationContext() as any;
	const { login } = useAuthContext() as any;
	const navigate = useNavigate();

	const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormData>({
		mode: 'onBlur',
		resolver: yupResolver(registerFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: undefined,
			gender: 'female',
			password: '',
			confirmPassword: ''
		}
	})

	const onFormSubmit = async (data: FormData, e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		e?.preventDefault();

		const { firstName, lastName, email, phone, gender, password } = data;

		const user = new UserRegisterDTO(firstName, lastName, email, phone, gender, password)

		try {
			let registerUserResponse = await userServices.register(user as User)

			login(registerUserResponse)
			navigate('/')

		} catch (err) {
				displayNotification(err, 'error')

		}
	}

	const onGenderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setGender((e.target as HTMLInputElement).value)
	}

	return (
		<>
			<div>RegisterView</div>

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

					<FormControl required>
						<FormLabel id="gender-select-group" >Gender</FormLabel>
						<RadioGroup row aria-labelledby="gender-select-group" value={gender ?? ' '} onChange={onGenderChange} >
							<FormControlLabel value="female" control={<Radio />} label="Female" {...register('gender')} />
							<FormControlLabel value="male" control={<Radio />} label="Male" {...register('gender')} />
						</RadioGroup>
						<FormHelperText> {errors.gender ? errors.gender.message : ''} </FormHelperText>
					</FormControl>

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

					<Button variant="contained" type='submit' disabled={!(isDirty && isValid)}>REGISTER</Button>
				</Stack>
			</form>
		</>
	)
}

export default isGuestRouteGuard(RegisterView)