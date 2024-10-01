import { useEffect } from 'react'
import { useLoginMutation } from '../../api/axios'

export default function LoginPage() {
    const loginMutation = useLoginMutation()

    useEffect(() => {
        loginMutation.mutate(
            {
                email: 'admin@fusetheme.com',
                password: 'admin',
            },
            {
                onSuccess: (data) => {
                    console.log(`onSuccess Callback: ${JSON.stringify(data)}`)
                },
                onError: (error) => {
                    console.log(`onError Callback: ${JSON.stringify(error)}`)
                },
            }
        )
    }, [])
    
    if (loginMutation.isPending) {
        return <h1>Loading...</h1>
    }
    return (
        <h1>
            Login Page {loginMutation.isError ? loginMutation.error.message : null} {loginMutation.isSuccess ? 'Success' : null}
        </h1>
    )
}
