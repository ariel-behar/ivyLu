
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

import registerFormSchema from '../validations/registerFormSchema';
import * as authServices from '../services/authServices'
import User from '../models/User';
import { useAuthContext } from '../context/AuthContext';


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

	const { login } = useAuthContext() as any;
	const navigate = useNavigate();
	

	const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormData>({
		mode: 'onChange',
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

	const onFormSubmit = async (data: FormData,  e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		e?.preventDefault();

		const { firstName, lastName, email, phone, gender, password } = data;

		const user = new User(firstName, lastName, email, phone, gender, password)

		try {
			let registerUserResponse = await authServices.register(user)

			login(registerUserResponse)
			navigate('/')

		} catch (err: any) {
			let error = await err;
			console.log(await error.message )
		}

	}

	const onGenderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setGender((e.target as HTMLInputElement).value)
	}

	return (
		<>
			<div>RegisterView</div>

			<form onSubmit={handleSubmit(onFormSubmit)}>
				<TextField id="first-name" label="First Name" variant="outlined" size="small" {...register('firstName')} />
				{errors.firstName ? <span> {errors.firstName.message}</span> : ''}
				<TextField id="last-name" label="Last Name" variant="outlined" size="small" {...register('lastName')} />
				{errors.lastName ? <span> {errors.lastName.message}</span> : ''}
				<TextField id="email" label="E-mail" variant="outlined" size="small" {...register('email')} />
				{errors.email ? <span> {errors.email.message}</span> : ''}

				<TextField id="phone-number" type='number' label="Phone Number" variant="outlined" size="small" {...register('phone')}/>
				{errors.phone ? <span> {errors.phone.message}</span> : ''}

				<FormControl>
					<FormLabel id="gender-select-group">Gender</FormLabel>
					<RadioGroup row aria-labelledby="gender-select-group" value={gender ?? ' '}  onChange={ onGenderChange } >
						<FormControlLabel value="female" control={<Radio />} label="Female" {...register('gender')}/>
						<FormControlLabel value="male" control={<Radio />} label="Male" {...register('gender')}/>
					</RadioGroup>
				</FormControl>
				{errors.gender ? <span> {errors.gender.message}</span> : ''}

				<TextField id="password" type="password" label="Password" variant="outlined" size="small" {...register('password')}/>
				{errors.password ? <span> {errors.password.message}</span> : ''}

				<TextField id="confirmPassword" type="password" label="Confirm Password" variant="outlined" size="small" {...register('confirmPassword')}/>
				{errors.confirmPassword ? <span> {errors.confirmPassword.message}</span> : ''}

				<Button variant="contained" type='submit' disabled={!(isDirty && isValid)}>REGISTER</Button>
			</form>
		</>
	)
}

export default RegisterView