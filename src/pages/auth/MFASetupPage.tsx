import { useState, useEffect, useContext } from 'react'
// import LoadingScreen from "react-loading-screen";
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
// import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
// import AuthContext from "../../context/AuthContext";
import Cookies from 'universal-cookie'

export default function MFASetupPage() {
    const [qrCodeLink, setQrCodeLink] = useState(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAEEAQAAAADmc3enAAADDElEQVR4nO2ZS24jMQxEeQPe/5a8AcN6lNoxMJhZuWaRGEbSLb0FwU+RkqP/8an4JX42EREZmTnPlZU57x3ZwYaRyPnyFPN/3ktsVrHhJGSm7JoH7bE+r2yYiap5Hl91iSGc9T+ICZWWc6Olp/ATipy8NVbO9uwJ1tNbbD9OyLg/ft5y/fOEPjhO+ZuYWE0mfa99A7FlPSUURG48p53cAncSCt3Y2KE/E79UPiut00lMxkjcSpZNZY2dY+k6LdpJhKpHwnbzuLSCyqSRUMqObwq3SWoSzd2CchLKnSJqWKcMImyIv48oEkhNkGzWakr7VF1tJGRRr8jNcitwk8wCyko0mUzE6rTB7UDRt+YshOIj5Q/aMfqvsG3BO4k8TZlKCsR3wDyN2UZoUzkTZzoQKRMpdiMR0tej9tUYrEXenAQG9eosk8oqf73H9vOElkjfjJ2QyOrQGHmV30JQPNQSOV10Ielv3sh5CEYC5nk1Y2W1kup2aR+hYiZbMjaOpNRtQj4iUNtVO4bF7Y698ucjelsNEstjbS/MjrQSkSdvERridx+dBEPJSgpnHQK5RnsJhUvDEfNZ5LZD5slqI6FqPsmixKkdJDXiX4XxEEyKqiRZSwNE/FVSVmKbsQJHeXPUSJT4diATwRGrcVRzTyP5X9u9RHEh0bnrRW3hrrQSsXdXfYRfB1H6Ei3ISKiCi75c1BMSzIEnrETuIUdyX3XCpjFF1jsJqa0IJniu07TU60EfQQfsTSMGyFy9zSeTPYScc6J1eiIZVflY6iEkbtl7u1kMkrIvz0jtIwgZRYyLnmuifjLZQ6j/6oUbvb3G4mSRz82Vh+hzrtkBqbjD0+HzdbPpIfI2ZGXQjge1GnMj5yF42YmN+fGM8vmaDDxEd9/b/52ajo2nHTgJWrEagFKIDnDubZxErMuUNdrVtxZ/+dRB4C7q6PZB6pyThZXYX4o4U6yriJwew03wJk/JzjNR956/rMS9iMjYVshCt5c4E2KcS3ckbhPKSuyPZav9mpVqLxc3nkbi759f4kcTX+YFRy0pIdhkAAAAAElFTkSuQmCC'
    )
    const cookies = new Cookies()

    // let { user_id_exists, loginUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSubmit = async () => {
        navigate('/login')
    }

    // const getQRCode = async() => {
    // 	let response = await fetch('http://localhost:8000/api/auth/set-two-factor-auth/', {
    // 		method: "POST",
    // 		headers: {
    // 			"Content-Type": "application/json"
    // 		},
    // 		body: JSON.stringify({ user_id: cookies.get('user_id') }),
    //     });
    //     let responseJson = await response.json();
    //     setQrCodeLink(responseJson.qr_code);
    //     cookies.remove('user_id');
    // }

    // useEffect(() => {
    // 	if(!user_id_exists) {
    //   alert("Can't enter this page");
    // 		navigate('/login');
    // 	}
    // else {
    //   getQRCode();
    // }
    // }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Scan
                </Typography>
                <img src={qrCodeLink} />

                {/* Input for secret key */}

                {/* Input for verufy authenticator code! */}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Done
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
