import { Avatar, Grid2 as Grid, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '../../components/LoadingButton'
import PasswordInput from '../../components/forms/PasswordInput'
import TextInput from '../../components/forms/TextInput'
import Checkbox from '../../components/forms/Checkbox'
import { registerSchema, RegisterSchema } from '../../types/schemas'
import { useRegisterMutation } from '../../api/axios'

export default function RegisterPage() {
    const registerMutation = useRegisterMutation()
    const navigate = useNavigate()

    const {
        control,
        formState: { isSubmitting },
        handleSubmit,
        setError,
        reset,
        getValues,
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        criteriaMode: 'all',
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            termsAccepted: false,
        },
    })

    const onSubmit: SubmitHandler<RegisterSchema> = async (formData: RegisterSchema) => {
        registerMutation.mutate(formData, {
            onSuccess: (data) => {
                console.log(`onSuccess Callback: ${JSON.stringify(data)}`)
                navigate(`/please-verify?email=${encodeURIComponent(formData.email)}`)
            },
            onError: (error) => {
                console.log(`onError Callback: ${JSON.stringify(error)}`)
            },
        })

        // console.log("Data", data)

        // try {
        //     await registerUser(data).unwrap()
        //     reset()
        // } catch (error: unknown) {
        //     const errorData = error as Record<string, string[]>
        //     console.log('Error', errorData.data)
        //     for (const key in errorData.data) {
        //         setError(key as keyof RegisterSchema, {
        //             type: 'manual',
        //             message: errorData.data[key][0],
        //         })
        //     }
        //     console.error('An error occurred', errorData)
        // }
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
                {registerMutation.isSuccess ? (
                    <>
                        <Typography component="h2" variant="h5">
                            Check your email
                        </Typography>

                        <img src="/email.svg" />

                        <Typography variant="body2" color="textSecondary" align="center">
                            Check your <strong>{getValues('email')}</strong> inbox inbox for instructions from us on how
                            to verify your account.
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
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                            <TextInput
                                margin="dense"
                                required
                                fullWidth
                                name="firstName"
                                autoComplete="firstName"
                                label="First Name"
                                autoFocus
                                control={control}
                            />
                            <TextInput
                                margin="dense"
                                required
                                fullWidth
                                name="lastName"
                                autoComplete="lastName"
                                label="Last name"
                                control={control}
                            />
                            <TextInput
                                margin="dense"
                                required
                                fullWidth
                                name="email"
                                id="email"
                                autoComplete="email"
                                label="Email Address"
                                control={control}
                            />
                            <PasswordInput
                                margin="dense"
                                control={control}
                                name="password"
                                label="Password"
                                id="password"
                                fullWidth
                            />
                            <Checkbox
                                control={control}
                                name="termsAccepted"
                                label="I hereby accept the terms and conditions."
                            />

                            <LoadingButton
                                type="submit"
                                disabled={isSubmitting || registerMutation.isPending}
                                loading={isSubmitting || registerMutation.isPending}
                                label="Sign Up"
                            />

                            <Grid container justifyContent="flex-end">
                                <Grid>
                                    <Link to="/login">
                                        <Typography variant="body2">Already have an account? Sign in</Typography>
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
