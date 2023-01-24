import React, { useState } from "react";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectShape } from "yup/lib/object";

import { useAuthContext } from "../../../contexts/AuthContext"

import registerFormSchema from "../../../validations/registerFormSchema";
import { User } from "../../../models/User";
import { ApiUser, ApiUserImpl } from "../../../services/userServices";
import { AuthTokenType, IdType } from "../../../types/common/common-types";

import maleAvatar from '../../../assets/img/male-avatar.png'
import femaleAvatar from '../../../assets/img/female-avatar.png'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import getUserRole from "../../../utils/getUserRole";
import Paper from "@mui/material/Paper";


import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useNotificationContext } from "../../../contexts/NotificationContext";

type TEditField = 'phone' | 'password' | null

type FormData = {
	email?: string,
	phone?: string,
	oldPassword?: string,
	password?: string,
	confirmPassword?: string
}

function ProfileView() {
	const { user, isClient, login } = useAuthContext() as { user: User, isClient: boolean, login: (userData: User) => void };
	const { displayNotification } = useNotificationContext() as any;

	const userServices: ApiUser<IdType, User, AuthTokenType> = new ApiUserImpl<IdType, User, AuthTokenType>(isClient ? 'clients' : 'staff');

	const [editField, setEditField] = useState<TEditField>(null);
	const [resolverShape, setResolverShape] = useState<ObjectShape>({});

	const { register, handleSubmit,reset, formState: { errors, isValid} } = useForm<FormData>({
		mode: 'onBlur',
		resolver: yupResolver(yup.object().shape(resolverShape)),
	})

	const onFieldUpdateSubmit = async (data: FormData, e: React.BaseSyntheticEvent<object, any, any> | undefined) => {
		e?.preventDefault()

		let editFieldData;

		if (Object.keys(data).includes('password')) {
			editFieldData = {
				oldPassword: data.oldPassword,
				newPassword: data.password
			}
		} else {
			editFieldData = data;
		}

		try {
			let updateResponse = await userServices.update(user._id, editFieldData, user.authToken);
			if (updateResponse) {
				login({ ...updateResponse, authToken: user.authToken })

				displayNotification({message: `Your ${editField} has successfully been updated`}, 'success')
				setEditField(null);
				reset()
			}

		} catch (err: any) {
			displayNotification(err, 'error')
		}
	}

	const onFieldEditClick = (selectedEditField: TEditField) => {
		if (typeof selectedEditField === 'string') {
			setEditField(selectedEditField);

			if (selectedEditField === 'phone') {
				setResolverShape({
					phone: yup.reach(registerFormSchema, selectedEditField),
				})
			}

			if (selectedEditField === 'password') {
				setResolverShape({
					oldPassword: yup.string().required('Old password is required'),
					password: yup.reach(registerFormSchema, 'password'),
					confirmPassword: yup.reach(registerFormSchema, 'confirmPassword')
				})
			}
		}
	}

	return (
		<>
			<div>ProfileView</div>

			<Paper>
				<Grid container direction='row' p={2} pl={5}>
					<Grid item md={10}>
						<Typography sx={{ borderBottom: '1px solid #4bb5ab' }} display='inline-block' variant="h4" textAlign='left' mt={2}><b>{user.firstName} {user.lastName}</b></Typography>
						<Box mt={3}>
							<Typography variant="body1" textAlign='left' mt={2} >
								E-mail: <b>{user.email}</b>
							</Typography>

							{
								editField === 'phone'
									? (
										<Stack spacing={1} direction='row' alignContent='baseline' alignItems='baseline'>
											<Typography variant="body1" textAlign='left' mt={2}>Phone: </Typography>
											<form onSubmit={handleSubmit(onFieldUpdateSubmit)}>
												<Stack spacing={1} direction='row' alignContent='baseline' alignItems='baseline'>
													<TextField
														required
														id="phone-number"
														type='number'
														label="Phone Number"
														variant="outlined"
														defaultValue={user.phone}
														size="small"
														{...register('phone')}
														error={errors.phone ? true : false}
														helperText={errors.phone ? errors.phone.message : ''}
													/>

													<Button
														type='submit'
														size="large"
														disabled={!isValid} >
														<CheckOutlinedIcon color={isValid ? "success" : 'inherit'} />
													</Button>
													<Button
														color="error"
														size="large"
														onClick={() => setEditField(null)} ><ClearOutlinedIcon color="error" /> </Button>
												</Stack>
											</form>
										</Stack>
									)
									: <>

										<Typography
											variant="body1"
											textAlign='left'
											mt={2}
										>
											Phone Number: <b>{user.phone}</b>
											<Button
												color="inherit"
												sx={{ marginBottom: '3px' }}
												endIcon={<EditOutlinedIcon fontSize="small" color="info" />}
												onClick={() => onFieldEditClick('phone')}
											/>
										</Typography>
									</>
							}

							{
								editField === 'password'
									?
									<>

										<Stack spacing={1} direction='row' alignContent='baseline' alignItems='baseline'>
											<Typography variant="body1" textAlign='left' mt={2}>Password: </Typography>
											<form onSubmit={handleSubmit(onFieldUpdateSubmit)}>
												<Stack spacing={1} direction='row' alignContent='baseline' alignItems='baseline'>
													<TextField
														required
														id="oldPassword"
														type="password"
														label="Old Password"
														variant="outlined"
														size="small"
														defaultValue=''
														{...register('oldPassword')}
														error={errors.oldPassword ? true : false}
														helperText={errors.oldPassword ? errors.oldPassword.message : ''}
													/>

													<TextField
														required
														id="password"
														type="password"
														label="New Password"
														variant="outlined"
														size="small"
														defaultValue=''
														{...register('password')}
														error={errors.password ? true : false}
														helperText={errors.password ? errors.password.message : ''}
													/>

													<TextField
														required
														id="confirmPassword"
														type="password"
														label="Confirm New Password"
														variant="outlined"
														size="small"
														defaultValue=''
														{...register('confirmPassword')}
														error={errors.confirmPassword ? true : false}
														helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
													/>

													<Button
														type='submit'
														size="large"
														disabled={!isValid} >
														<CheckOutlinedIcon color={isValid ? "success" : 'inherit'} />
													</Button>
													<Button
														color="error"
														size="large"
														onClick={() => setEditField(null)} ><ClearOutlinedIcon color="error" /> </Button>
												</Stack>
											</form>
										</Stack>
									</>
									: <Typography
										variant="body1"
										textAlign='left'
										mt={2}
									>
										Password: <b>**********</b>
										<Button
											color="inherit"
											sx={{ marginBottom: '3px' }}
											endIcon={<EditOutlinedIcon fontSize="small" color="info" />}
											onClick={() => onFieldEditClick('password')}
										/>
									</Typography>
							}

						</Box>
					</Grid>
					<Grid item md={2} sx={{ borderLeft: '1px solid #4bb5ab' }} textAlign="center">
						<img style={{ width: '100px' }} src={user.gender === 'male' ? maleAvatar : femaleAvatar} alt={user.gender === 'male' ? 'Male Avatar' : 'Female Avatar'} />

						{!isClient && <Typography variant="h6" textAlign='center'><b>{getUserRole(user.role).capitalized}</b></Typography>}
					</Grid>
				</Grid>
			</Paper>
		</>
	)
}

export default ProfileView