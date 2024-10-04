import { Button, CircularProgress } from '@mui/material'

interface LoadingButtonProps {
    loading: boolean
    disabled?: boolean
    label: string
    [key: string]: any
}

export default function LoadingButton({ loading, label, sx, ...props }: LoadingButtonProps) {
    return (
        <Button type="submit" fullWidth variant="contained" sx={{ ...sx, mt: 3, mb: 2, padding: 1.2 }} {...props}>
            {label}
            {loading ? <CircularProgress color="secondary" sx={{ position: 'absolute' }} size={25} /> : null}
        </Button>
    )
}
