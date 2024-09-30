import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Header from './components/layout/Header'
import { lazy } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))

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
                    ],
                },
                {
                    Component: NoAuthRoute,
                    children: [
                        {
                            path: '/login',
                            Component: LoginPage,
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
