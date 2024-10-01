import { useEffect } from 'react'

export default function LogoutPage() {
    useEffect(() => {
        window.history.replaceState({}, document.title, '/')
        setTimeout(() => {
            window.location.reload()
        }, 5000)
    }, [])

    return (
        <div>
            <h1>Logout Page</h1>
            {/* Add your logout page content here */}
        </div>
    )
}
