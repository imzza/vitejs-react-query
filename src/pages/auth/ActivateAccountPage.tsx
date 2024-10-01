// import { useActivateAccountMutation } from '../../redux/api/authApi'
// import { useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'

// export default function ActivateAccountPage() {
//     const [queryParams] = useSearchParams()

//     const [activateAccount, { error }] = useActivateAccountMutation()

//     useEffect(() => {
//         const activateAccountAsync = async () => {
//             const uid = queryParams.get('uid')
//             const token = queryParams.get('token')
//             if (uid && token) {
//                 try {
//                     await activateAccount({ uid, token }).unwrap()
//                 } catch (err: any) {
//                     console.error(`Error: ${err.data.detail}`)
//                 }
//             }
//         }

//         activateAccountAsync()
//     }, [activateAccount, queryParams])

//     return (
//         <div>
//             <h1>Activate Account {error?.data?.detail}</h1>
//         </div>
//     )
// }

import { useActivateAccountMutation } from '../../redux/api/authApi'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <a color="inherit" href="https://mui.com/">
                Your Website
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

interface CustomError extends Error {
    data?: { detail?: string }
}

export default function ActivateAccountPage() {
    const [queryParams] = useSearchParams()
    const [activateAccount, { isLoading, isSuccess, isError, error }] = useActivateAccountMutation()

    useEffect(() => {
        const activateAccountAsync = async () => {
            const uid = queryParams.get('uid')
            const token = queryParams.get('token')
            if (uid && token) {
                try {
                    await activateAccount({ uid, token }).unwrap()
                } catch (err: any) {
                    console.error(`Error: ${err.data.detail}`)
                }
            }
        }
        activateAccountAsync()

        console.log('Activate account')
    }, [queryParams])

    // useMemo(() => {
    //      console.log('Activate account Memo')
    // }, [])

    useEffect(() => {
        if (isSuccess) {
            console.log('Account activated')
        }
        if (isError) {
            console.log('Error activating account')
        }
    }, [isError, isSuccess])

    return (
        <Container component="main" maxWidth="sm">
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
                {isError || (isSuccess && !isLoading) ? (
                    <>
                        <Typography component="h2" variant="h5">
                            Account activation
                        </Typography>

                        {/* <img src="/email.svg" /> */}

                        <Typography variant="body2" color="textSecondary" align="center">
                            Check your inbox for instructions from us on how to reset your password.{' '}
                            {JSON.stringify((error as CustomError)?.data?.detail)}
                        </Typography>

                        <Link to="/login">
                            <Typography variant="body2">Go back to login screen</Typography>
                        </Link>
                    </>
                ) : (
                    <>
                        <Typography component="h2" variant="h5">
                            Account activation
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="center">
                            Please wait while we activate your account.
                        </Typography>

                        <CircularProgress sx={{ marginTop: '20px' }} />

                        {/* <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
                        </Box> */}
                    </>
                )}
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}
