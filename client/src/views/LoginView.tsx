import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

import * as authServices from '../services/authServices'

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useAuthContext } from "../context/AuthContext";

type FormData = {
	email: string,
	password: string,
}

function LoginView() {
	const navigate = useNavigate()
	const { login } = useAuthContext() as any;
	const { handleSubmit, register, formState: { errors, isDirty} } = useForm<FormData>({
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onFormSubmit = async (data: FormData,  e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		e?.preventDefault()
		
		const user = data;

		try {
			let loginUserResponse = await authServices.login(user)

			login(loginUserResponse)
			navigate('/')

		} catch (err: any) {
			let error = await err;
			console.log(await error.message )
		}
	}

	return (
		<>
			<div> LoginView</div>

			<form onSubmit={handleSubmit(onFormSubmit)}>

				<TextField id="email" label="E-mail" variant="outlined" size="small" {...register('email')} />
				{errors.email ? <span> {errors.email.message} </span> : ''}

				<TextField id="password" type="password" label="Password" variant="outlined" size="small" {...register('password')} />
				{errors.password ? <span> {errors.password.message}</span> : ''}

				<Button variant="contained" type='submit' disabled={!isDirty}>LOGIN</Button>
			</form>
		</>
	)
}

export default LoginView