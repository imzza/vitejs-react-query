import { useState } from 'react'
import { TextField, InputAdornment, IconButton, styled } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface PasswordInputProps extends FieldValues {
    control: Control<any>
    name: string
    label: string
}

const StyledTextField = styled(TextField)(() => ({
    '& .MuiFormHelperText-root': {
        marginLeft: '0px',
    },
}))

export default function PasswordInput({ control, name, label, ...props }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    // const {
    //     formState: { errors },
    // } = useController({ control, name })

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <StyledTextField
                    label={label}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={name}
                    error={!!error}
                    helperText={error?.message?.toString()}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    tabIndex={-1}
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={(event) => {
                                        event.preventDefault()
                                        setShowPassword(!showPassword)
                                    }}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    {...field}
                    {...props}
                />
            )}
        />
    )
}
