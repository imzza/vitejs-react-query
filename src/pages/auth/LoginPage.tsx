import { useEffect } from 'react'
import { useLoginMutation } from '../../api/axios'

export default function LoginPage() {
    const { mutate: login, isPending: isLoading, isError, isSuccess, error } = useLoginMutation()

    useEffect(() => {
        login(
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

    useEffect(() => {
        if (isSuccess) {
            console.log('Success')
        }
    }, [isSuccess])

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <h1>
            Login Page {isError ? error.message : null} {isSuccess ? 'Success' : null}
        </h1>
    )
}
