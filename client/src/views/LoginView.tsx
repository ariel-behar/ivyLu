import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate, Link as RouterLink } from "react-router-dom";

import hairsalon from '../assets/img/hairsalon.jpg'

import { useAuthContext } from "../contexts/AuthContext";
import { useNotificationContext } from "../contexts/NotificationContext";

import { ApiUser, ApiUserImpl } from "../services/userServices";

import { User, UserLoginDTO } from "../models/User";
import { isGuestRouteGuard } from "../hoc/isGuestRouteGuard";
import { AuthTokenType, IdType } from "../types/common/common-types";

import styled from "@mui/material/styles/styled";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const StyledHR = styled('hr')`
	width: 100%;
	height: 2px;
`

const StyledGridContainer = styled(Grid)`
	min-height: 60vh;
	background-image: ${`url(${hairsalon})`};
    background-size: cover;
    background-repeat: no-repeat;

	.grid-item-form-container {
		padding-top: 24px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;

		.form-container-paper {
			border-radius: 20px;
			background-color: transparent;


			input.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input {
				background-color: rgba(94, 84, 80, 0.7);
				color: white;
			}
			label.css-1pysi21-MuiFormLabel-root-MuiInputLabel-root, 
			label.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root,
			span.css-vqmohf-MuiButtonBase-root-MuiRadio-root {
				color: rgba(255, 255, 255, 0.5);
			}

			label.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused,
			label.css-u4tvz2-MuiFormLabel-root	{
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
	email: string,
	password: string,
}

function LoginView() {
	const navigate = useNavigate()
	const { login } = useAuthContext() as any;
	const { displayNotification } = useNotificationContext() as any;
	const [hovered, setHovered] = useState<boolean>(false);
	const { handleSubmit, register, formState: { errors, isDirty } } = useForm<FormData>({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onFormSubmit = async (data: FormData, e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		e?.preventDefault()

		const user: UserLoginDTO = data;

		try {
			let loginUserResponse = await userServices.login(user as User)

			login(loginUserResponse)
			navigate('/')

		} catch (err) {
			displayNotification(err, 'error')
		}
	}

	return (
		<Box py={{xs: 0, md: 3}}>
			<Container>
				<Stack direction='row' alignItems='center' sx={{ overflow: 'hidden', margin: '20px 0' }}>
					<StyledHR />
					<Typography variant="h3" sx={{ color: 'common.white', marginLeft: '30px', marginRight: '30px', whiteSpace: 'nowrap' }}>Login</Typography>
					<StyledHR />
				</Stack>


				<StyledGridContainer container >
					<Grid item xs={12} md={5} className='grid-item-form-container'>
						<Paper className='form-container-paper' elevation={15}>
							<Stack direction='column' alignItems='center' className="form-container-paper-stack" >

								<form onSubmit={handleSubmit(onFormSubmit)} >
									<Stack spacing={1} >
										<TextField
											required
											// autoComplete="off"
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
											// inputProps={{
											// 	autocomplete: 'new-password',
											// 	form: {
											// 		autocomplete: 'off',
											// 	},
											// }}
											id="password"
											type="password"
											label="Password"
											variant="outlined"
											size="small"
											{...register('password')}
											error={errors.password ? true : false}
											helperText={errors.password ? errors.password.message : ''}
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
											variant='contained'
											type='submit'
											disabled={!isDirty}>LOGIN</Button>
									</Stack>

								</form>

								<Stack mt={2} direction='row' justifyContent='center'>
									<Typography variant="h6" component='p' color='white'>Not a member of IvyLu yet? <br /> <RouterLink style={{ color: '#42a5f5' }} to="/register">Register here </RouterLink></Typography>
								</Stack>
							</Stack>
						</Paper>
					</Grid>
				</StyledGridContainer>
			</Container>
		</Box>
	)
}

export default isGuestRouteGuard(LoginView)