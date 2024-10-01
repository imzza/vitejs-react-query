import { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
// import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordSchema, ResetPasswordSchema } from '../../settings/schemas'
// import Button from "components/common/Button"
import Button from '../../components/common/Button'
import PasswordInput from '../../components/forms/PasswordInput'

import { useResetPasswordMutation } from '../../redux/api/authApi'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default function ResetPasswordPage() {
    const [resetPassword, { isLoading }] = useResetPasswordMutation() // data, error, isError,
    const [queryParams] = useSearchParams()
    const navigate = useNavigate()

    const {
        control,
        // register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setError,
        reset,
    } = useForm<ResetPasswordSchema>({
        resolver: yupResolver(resetPasswordSchema),
        criteriaMode: 'all',
        reValidateMode: 'onChange',
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data: ResetPasswordSchema) => {
        try {
            let formData = {
                password: data.password,
                token: String(queryParams.get('token')),
                uid: String(queryParams.get('uid')),
            }
            await resetPassword(formData).unwrap()
            reset()
            navigate('/login', { state: { message: 'Password reset successfully. Please login.' } })
        } catch (error: unknown) {
            const errorData = error as Record<string, string[]>
            for (const key in errorData.data) {
                setError(key as keyof ResetPasswordSchema, {
                    type: 'manual',
                    message: errorData.data[key][0],
                })
            }
            console.error('An error occurred', errorData)
        }
    }

    useEffect(() => {
        console.log('Errors', errors)
    }, [errors])

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
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
                    Reset your password
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    Enter your new password. After confirming, you will be asked to log in again.
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PasswordInput
                                control={control}
                                // register={register}
                                // errors={errors}
                                name="password"
                                label="New password"
                                id="password"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordInput
                                control={control}
                                // register={register}
                                // errors={errors}
                                name="confirmPassword"
                                label="Confirm new password"
                                id="confirm-password"
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Button
                        buttonText="Reset password"
                        isLoading={isSubmitting || isLoading}
                        fullWidth
                        disabled={isSubmitting || isLoading ? true : false}
                        type="submit"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login">
                                <Typography variant="body2">Already have an account? Sign in</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}
