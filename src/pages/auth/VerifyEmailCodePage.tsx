import { Box, Typography } from '@mui/material'
import TextInput from '../../components/forms/TextInput'
import { useForm } from 'react-hook-form'
import LoadingButton from '../../components/LoadingButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifyEmailCodeSchema, VerifyEmailCodeSchema } from '../../types/schemas'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useVerifyEmailMutation } from '../../api/axios'

export default function VerifyEmailCodePage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const verifyEmialMutation = useVerifyEmailMutation()

    const methods = useForm<VerifyEmailCodeSchema>({
        resolver: zodResolver(verifyEmailCodeSchema),
        defaultValues: {
            verificationCode: '',
            email: String(searchParams.get('email')),
        },
    })

    useEffect(() => {
        console.log('UseEffect Called')
        const email = String(searchParams.get('email'))
        if (!email) {
            navigate('/', { state: { message: 'Invalid Email' } })
        }
        methods.setValue('email', email)
        console.log(email)
    }, [searchParams])

    const onSubmit = (data: VerifyEmailCodeSchema) => {
        console.log(methods.formState.errors, data)
        verifyEmialMutation.mutate(data, {
            onSuccess: (data) => {
                console.log(`onSuccess Callback: ${JSON.stringify(data)}`)
                navigate('/login', { state: { message: 'Email Verified Successfully' } })
            },
            onError: (error: any) => {
                console.log(`onError Callback: ${JSON.stringify(error.response.data)}`)
            },
        })
    }

    return (
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <Typography variant="h5">Please Verify Your Email</Typography>
            <Typography variant="body2">
                You should have receivd a verification code at the email address you provided. Please enter it here:
            </Typography>
            <TextInput
                name="verificationCode"
                control={methods.control}
                label="Verification Code"
                placeholder="eg. 123456"
                fullWidth
            />
            <LoadingButton label="Submit" loading={false} sx={{ width: '200px' }} />
        </Box>
    )
}
