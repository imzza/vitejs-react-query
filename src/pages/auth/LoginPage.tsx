import { useLoginMutation } from '../../api/axios'
import { Avatar, Grid2 as Grid, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginSchema } from '../../types/schemas'

import PasswordInput from '../../components/forms/PasswordInput'
import TextInput from '../../components/forms/TextInput'
import Checkbox from '../../components/forms/Checkbox'
import LoadingButton from '../../components/LoadingButton'

export default function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: '/' } }
    const loginMutation = useLoginMutation()

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<LoginSchema>({
        defaultValues: { email: '', password: '', remember: false },
        resolver: zodResolver(loginSchema),
    })

    // useEffect(() => {
    //     loginMutation.mutate(
    //         {
    //             email: 'admin@fusetheme.com',
    //             password: 'admin',
    //         },
    //         {
    //             onSuccess: (data) => {
    //                 console.log(`onSuccess Callback: ${JSON.stringify(data)}`)
    //             },
    //             onError: (error) => {
    //                 console.log(`onError Callback: ${JSON.stringify(error)}`)
    //             },
    //         }
    //     )
    // }, [])

    const onSubmit: SubmitHandler<LoginSchema> = async (data: LoginSchema) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                console.log(`onSuccess Callback: ${JSON.stringify(data)}`)
                navigate(from, { replace: true })
            },
            onError: (error) => {
                console.log(`onError Callback: ${JSON.stringify(error)}`)
            },
        })

        try {
            console.log(`Data: ${data}`)
            // await loginUser(data).unwrap()
            // if (!isError) {
            // reset()
            // Cookies.set('token', loginResponse.accessToken, { expires: 7 })
            // dispatch(
            //     setCredentials({
            //         userInfo: loginResponse.user,
            //         userToken: loginResponse.accessToken,
            //         loggedIn: true,
            //     })
            // )
            // navigate(from, { replace: true })
            // enqueueSnackbar('LoggedIn successfully!', {
            //     variant: 'success',
            //     anchorOrigin: {
            //         vertical: 'top',
            //         horizontal: 'center',
            //     },
            // })
            // } else {
            // enqueueSnackbar('Invalid Credentials', {
            //     variant: 'error',
            //     anchorOrigin: {
            //         vertical: 'top',
            //         horizontal: 'center',
            //     },
            // })
            // dispatch(
            //     presentNotification({
            //         message: 'Invalid Credentials',
            //         open: true,
            //         severity: 'error',
            //         autoHideDuration: 5000,
            //     })
            // )
            // }

            // const response = await auth.login({
            //     email: data.email,
            //     password: data.password,
            // })
            // const { user: userInfo, access_token } = response.data
            // if (access_token) {
            //     reset()
            //     Cookies.set('token', access_token, { expires: 7 })
            //     dispatch(
            //         setCredentials({
            //             userInfo: userInfo,
            //             userToken: access_token,
            //             loggedIn: true,
            //         })
            //     )
            //     navigate(from, { replace: true })
            //     enqueueSnackbar('LoggedIn successfully!', {
            //         variant: 'success',
            //         anchorOrigin: {
            //             vertical: 'top',
            //             horizontal: 'center',
            //         },
            //     })
            // } else {
            //     enqueueSnackbar('Invalid Credentials', {
            //         variant: 'error',
            //         anchorOrigin: {
            //             vertical: 'top',
            //             horizontal: 'center',
            //         },
            //     })
            //     dispatch(
            //         presentNotification({
            //             message: 'Invalid Credentials',
            //             open: true,
            //             severity: 'error',
            //             autoHideDuration: 5000,
            //         })
            //     )
            // }
        } catch (e) {
            // enqueueSnackbar('Invalid Credentials', {
            //     variant: 'error',
            //     anchorOrigin: {
            //         vertical: 'top',
            //         horizontal: 'center',
            //     },
            // })
            // dispatch(
            //     presentNotification({
            //         message: 'Invalid Credentials',
            //         open: true,
            //         severity: 'error',
            //         autoHideDuration: 5000,
            //     })
            // )
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {location.state?.message ? (
                    <Typography variant="body2" color="textSecondary" align="center">
                        {location.state.message}
                    </Typography>
                ) : null}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextInput
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        id="email"
                        autoComplete="email"
                        label="Email Address"
                        autoFocus
                        control={control}
                    />
                    <PasswordInput control={control} name="password" label="Password" id="password" fullWidth />
                    <Checkbox control={control} name="remember" label="Remember me" />

                    <LoadingButton
                        type="submit"
                        label="Sign In"
                        loading={isSubmitting || loginMutation.isPending}
                        disabled={isSubmitting || loginMutation.isPending}
                    />

                    <Grid container>
                        <Grid>
                            <Link to="/forgot-password">
                                <Typography variant="body2">Forgot password?</Typography>
                            </Link>
                        </Grid>
                        <Grid>
                            <Link to="/registration">
                                <Typography variant="body2">Don't have an account? Sign Up</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
