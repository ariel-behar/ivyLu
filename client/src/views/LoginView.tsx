import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ApiClient, ApiClientImpl } from "../services/clientServices";
import { IdType } from "../types/common/commonTypes";
import { User, UserLoginDTO } from "../models/User";

const clientServices: ApiClient<IdType, User> = new ApiClientImpl<IdType, User>('users');

type FormData = {
	email: string,
	password: string,
}

function LoginView() {
	const navigate = useNavigate()
	const { login } = useAuthContext() as any;
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
			let loginUserResponse = await clientServices.login(user as User)

			login(loginUserResponse)
			navigate('/')

		} catch (err: any) {
			let error = await err;
			console.log(await error.message)
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
		</>
	)
}

export default LoginView