import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Header from './components/layout/Header'
import { lazy } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import(/* webpackChunkName: "RegisterPage" */ './pages/auth/RegisterPage'))
const ActivateAccountPage = lazy(
    () => import(/* webpackChunkName: "ActivateAccountPage" */ './pages/auth/ActivateAccountPage')
)
const ForgotPasswordPage = lazy(
    () => import(/* webpackChunkName: "ForgotPasswordPage" */ './pages/auth/ForgotPasswordPage')
)
const ResetPasswordPage = lazy(
    () => import(/* webpackChunkName: "ResetPasswordPage" */ './pages/auth/ResetPasswordPage')
)

const VerifyEmailLandingPage = lazy(() => import('./pages/auth/VeifyEmailLandingPage'))

const VerifyEmailCodePage = lazy(() => import('./pages/auth/VerifyEmailCodePage'))

const MFASetupPage = lazy(() => import('./pages/auth/MFASetupPage'))
const MFAVerifyPage = lazy(() => import('./pages/auth/MFAVerifyPage'))

function Loader() {
    return <p>Loading</p>
}

function PrivateRoute() {
    // if (isLoading) {
    //     return <Loader />
    // }

    // if (!loggedIn) {
    //     return <Navigate to="/login" state={{ from: location }} replace />
    // }
    return <Outlet />
}

function NoAuthRoute() {
    // if (isLoading) {
    //     return <Loader />
    // }

    // if (!loggedIn) {
    //     return <Navigate to="/login" state={{ from: location }} replace />
    // }
    return <Outlet />
}

function LayoutMain() {
    return (
        <>
            <Header />
            <Box component="main" sx={{ marginTop: '100px' }} id="react-app" data-testid="react-app">
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </Box>
        </>
    )
}

const router = createBrowserRouter(
    [
        {
            id: 'root',
            path: '',
            Component: LayoutMain,
            children: [
                {
                    Component: PrivateRoute,
                    children: [
                        {
                            index: true,
                            Component: HomePage,
                        },
                        {
                            path: '/setup-mfa',
                            Component: MFASetupPage,
                        },
                    ],
                },
                {
                    Component: NoAuthRoute,
                    children: [
                        {
                            path: '/login',
                            Component: LoginPage,
                        },
                        {
                            path: '/registration',
                            Component: RegisterPage,
                        },
                        {
                            path: '/activate-account',
                            Component: ActivateAccountPage,
                        },
                        {
                            path: '/forgot-password',
                            Component: ForgotPasswordPage,
                        },
                        {
                            path: '/reset-password',
                            Component: ResetPasswordPage,
                        },
                        {
                            path: '/please-verify',
                            Component: VerifyEmailLandingPage,
                        },
                        {
                            path: '/verify-email',
                            Component: VerifyEmailCodePage,
                        },
                        {
                            path: '/verify-mfa',
                            Component: MFAVerifyPage,
                        },
                    ],
                },
                {
                    path: '*',
                    Component: () => <h1>Not Found</h1>,
                },
            ],
        },
    ],
    { basename: '/' }
)

export default router
