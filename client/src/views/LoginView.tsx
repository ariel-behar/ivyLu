import { useForm } from "react-hook-form"
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";
import { useNotificationContext } from "../contexts/NotificationContext";

import { AuthTokenType, IdType } from "../types/common/common-types";
import { User, UserLoginDTO } from "../models/User";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ApiUser, ApiUserImpl } from "../services/userServices";
import { isGuestRouteGuard } from "../hoc/isGuestRouteGuard";
import Typography from "@mui/material/Typography";

const userServices: ApiUser<IdType, User, AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>('clients');

type FormData = {
	email: string,
	password: string,
}

function LoginView() {
	const navigate = useNavigate()
	const { login } = useAuthContext() as any;
	const { displayNotification } = useNotificationContext() as any;
	const { handleSubmit, register, formState: { errors, isDirty } } = useForm<FormData>({
		mode:'onBlur',
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
		<>
			<div> LoginView</div>

			<form onSubmit={handleSubmit(onFormSubmit)}>
				<Stack direction='column'>

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
						id="password"
						type="password"
						label="Password"
						variant="outlined"
						size="small"
						{...register('password')}
						error={errors.password ? true : false}
						helperText={errors.password ? errors.password.message : ''}
					/>

					<Button variant="contained" type='submit' disabled={!isDirty}>LOGIN</Button>
				</Stack>
			</form>

			<Stack mt={2} direction='row' justifyContent='center'>
				<Typography variant="body1">Not a member of IvyLu yet? <RouterLink to="/register">Register here </RouterLink></Typography>
			</Stack>
		</>
	)
}

export default isGuestRouteGuard(LoginView)