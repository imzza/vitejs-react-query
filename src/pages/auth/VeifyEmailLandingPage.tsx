import { useEffect } from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { Typography, Card, CardContent } from "@mui/material"

export default function VerifyEmailLandingPage() {
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const email = searchParams.get("email")
        if (!email) {
            navigate("/")
        }
        setTimeout(() => {
            navigate(`/verify-email?email=${encodeURIComponent(String(email))}`)
        }, 3000)
    }, [location, searchParams])

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto' }}>
            <CardContent>
                <Typography variant="h5" component="div" textAlign={'center'}>
                    Thanks for Signing Up!
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1, textAlign: 'center' }} color="text.secondary">
                    A verification email has been sent to the email address you provided. Please verify your email to unlock full site features.
                </Typography>
            </CardContent>
        </Card>
    )
}