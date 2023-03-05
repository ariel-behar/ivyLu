
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import weAreOpenSign from '../assets/img/weareopen-sign.jpg'

import registerFormSchema from '../validations/registerFormSchema';
import { User, ClientRegisterDTO } from '../models/User';
import { useAuthContext } from '../contexts/AuthContext';
import { AuthTokenType, IdType } from '../types/common/common-types';
import { useNotificationContext } from '../contexts/NotificationContext';
import { ApiUser, ApiUserImpl } from '../services/userServices';
import { isGuestRouteGuard } from '../hoc/isGuestRouteGuard';

import styled from '@mui/material/styles/styled';

import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/system/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const StyledHR = styled('hr')`
	width: 100%;
	height: 2px;
`

const StyledGridContainer = styled(Grid)`
	min-height: 60vh;
	background-image: ${`url(${weAreOpenSign})`};
    background-size: cover;
    background-repeat: no-repeat;
	background-position: center right -150px;

	.grid-item-form-container {
		margin-bottom: 20px;
		padding-top: 24px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.form-container-paper {
			border-radius: 20px;
			background-color: transparent;


			input.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input {
				background-color: rgba(94, 84, 80, 0.7);
				color: white;
			}
			label.css-1pysi21-MuiFormLabel-root-MuiInputLabel-root, 
			label.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root,
			label.css-u4tvz2-MuiFormLabel-root,
			span.css-vqmohf-MuiButtonBase-root-MuiRadio-root {
				color: rgba(255, 255, 255, 0.5);
			}

			label.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused,
			.css-j204z7-MuiFormControlLabel-root,
			.css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked {
				color: white;
			}

			button.css-16o0qn6-MuiButtonBase-root-MuiButton-root.Mui-disabled {
				color: rgba(255, 255, 255, 0.6);
				background-color: rgba(25, 118, 210, 0.3);
			}

			.form-container-paper-stack {
				padding: 40px 24px;
				border-radius: 20px;
				background-color: rgba(0,0,0, 0.6);
			}
		}
	}

	@media (max-width: 899px) {
		background-position: center right -150px;
		margin-bottom: 10px;
		.grid-item-form-container {
			margin-bottom: 20px;
		}
	}
`

const userServices: ApiUser<IdType, User, AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>('clients');

type FormData = {
	firstName: string,
	lastName: string,
	email: string,
	phone: string,
	gender: "male" | "female",
	password: string,
	confirmPassword: string
}

function RegisterView() {
	const [gender, setGender] = useState<string>('female')
	const { displayNotification } = useNotificationContext() as any;
	const { login } = useAuthContext() as any;
	const navigate = useNavigate();
	const [hovered, setHovered] = useState<boolean>(false);

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

		const user = new ClientRegisterDTO(firstName, lastName, email, phone, gender, password)

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
		<Box py={{xs: 0, md: 3}}>
			<Container>
				<Stack direction='row' alignItems='center' sx={{ overflow: 'hidden', margin: '20px 0' }}>
					<StyledHR />
					<Typography variant="h3" sx={{ color: 'common.white', marginLeft: '30px', marginRight: '30px', whiteSpace: 'nowrap' }}>Register</Typography>
					<StyledHR />
				</Stack>


				<StyledGridContainer container >
					<Grid item xs={12} md={5} className='grid-item-form-container' >
						<Paper className='form-container-paper' elevation={15}>
							<Stack direction='column' alignItems='center' className='form-container-paper-stack' >
								<form onSubmit={handleSubmit(onFormSubmit)}>
									<Stack spacing={1}>
										<TextField
											required
											autoComplete='off'
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
											autoComplete='off'
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
											autoComplete='off'
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
											autoComplete='off'
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
											autoComplete='off'
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
											autoComplete='off'
											id="confirmPassword"
											type="password"
											label="Confirm Password"
											variant="outlined"
											size="small"
											{...register('confirmPassword')}
											error={errors.confirmPassword ? true : false}
											helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
										/>

										<Button
											onMouseOver={() => setHovered(true)}
											onMouseOut={() => setHovered(false)}

											sx={{
												'&:hover': {
													transform: hovered ? 'scale(1.1)' : 'scale(1.0)',
												}
											}}
											color="primary"
											variant="contained"
											type='submit'
											disabled={!(isDirty && isValid)}>REGISTER</Button>
									</Stack>
								</form>

								<Stack mt={2} direction='row' justifyContent='center'>
									<Typography variant="h6" component='p' color='white'>Already a member of IvyLu? <br /> <RouterLink style={{ color: '#42a5f5' }} to="/login">Login here </RouterLink></Typography>
								</Stack>
							</Stack>
						</Paper>

					</Grid>

				</StyledGridContainer>
			</Container>
		</Box>
	)
}

export default isGuestRouteGuard(RegisterView)