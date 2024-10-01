import {Avatar, Container, Grid, Typography, Box} from '@mui/material'
import { useEffect } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPasswordSchema, ForgotPasswordSchema } from '../../settings/schemas'
import { useForgotPasswordMutation } from '../../redux/api/authApi'
import { Link } from 'react-router-dom'
import TextInput from '../../components/forms/TextInput'
import LoadingButton from '../../components/LoadingButton'

export default function ForgotPasswordPage() {
    const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation() // data, error, isError,
    const {
        control,
        formState: { errors, isSubmitting },
        handleSubmit,
        setError,
        // reset,
        getValues,
    } = useForm<ForgotPasswordSchema>({
        resolver: yupResolver(forgotPasswordSchema),
        criteriaMode: 'all',
        reValidateMode: 'onChange',
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data: ForgotPasswordSchema) => {
        console.log(`Data: ${JSON.stringify(data)}`)
        try {
            await forgotPassword(data).unwrap()
            // reset()
        } catch (error: unknown) {
            const errorData = error as Record<string, string[]>
            for (const key in errorData) {
                setError(key as keyof ForgotPasswordSchema, {
                    type: 'manual',
                    message: errorData[key][0],
                })
            }
            console.error('An error occurred', errorData)
        }
    }

    useEffect(() => {
        console.log('Errors', errors)
    }, [errors])

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
                {isSuccess ? (
                    <>
                        <Typography component="h2" variant="h5">
                            Check your email
                        </Typography>

                        <img src="/email.svg" />

                        <Typography variant="body2" color="textSecondary" align="center">
                            Check your <strong>{getValues('email')}</strong> inbox for instructions from us on how to
                            reset your password.
                        </Typography>

                        <Link to="/login">
                            <Typography variant="body2">Go back to login screen</Typography>
                        </Link>
                    </>
                ) : (
                    <>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h2" variant="h5">
                            Reset your password
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="center">
                            To reset your password, enter the email address you use to log in.
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                            <TextInput
                                fullWidth
                                margin="normal"
                                control={control}
                                name='email'
                                label='Email Address'
                            />
                            <LoadingButton
                                type="submit"

                                label="Get reset link"
                                loading={isSubmitting || isLoading}
                                disabled={isSubmitting || isLoading}
                            />

                            <Grid container>
                                <Grid item xs>
                                    <Link to="/forgot-password">
                                        <Typography variant="body2">Forgot password?</Typography>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/registration">
                                        <Typography variant="body2">Don't have an account? Sign Up</Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    )
}
