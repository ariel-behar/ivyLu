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

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";


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
		<Box py={3}>
			<Container>
				<div> LoginView</div>

				<Stack direction='row' alignItems='center' sx={{ overflow: 'hidden', margin: '20px 0' }}>
					<hr style={{ width: '100%', height: '2px' }} />
					<Typography variant="h3" sx={{ color: 'common.white', marginLeft: '30px', marginRight: '30px', whiteSpace: 'nowrap' }}>Login</Typography>
					<hr style={{ width: '100%', height: '2px' }} />
				</Stack>


				<Grid
					container
					height='60vh'
					style={{
						backgroundImage: `url('${hairsalon}')`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',

					}}
				>
					<Grid item md={5} display='flex' direction='column' alignItems='center' justifyContent='start' pt={3} height='100%'>

						<Paper elevation={15} sx={{ borderRadius: "20px", backgroundColor: 'transparent' }} >
							<Stack
								direction='column'
								alignItems='center'
								px={3}
								py={5}
								borderRadius="20px"

								sx={{ backgroundColor: `rgba(94, 84, 80, 0.7)`, border: `1px solid #434242` }}>

								<form onSubmit={handleSubmit(onFormSubmit)} >

									<Stack spacing={2} >

										<TextField
											sx={{background: "rgb(232, 241, 250)"}}
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
											sx={{background: "rgb(232, 241, 250)"}}
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
									<Typography variant="h6" component='p' color='white'>Not a member of IvyLu yet? <RouterLink style={{color:'#42a5f5'}} to="/register">Register here </RouterLink></Typography>
								</Stack>
							</Stack>
						</Paper>

					</Grid>
					<Grid item md={7}>

					</Grid>

				</Grid>
			</Container>
		</Box>
	)
}

export default isGuestRouteGuard(LoginView)