import { TextField, styled } from '@mui/material'
import { Controller, Control, FieldValues } from 'react-hook-form'
import { TextFieldProps } from '@mui/material'

type TextInputProps = TextFieldProps &
    FieldValues & {
        control: Control<any>
        name: string
        label: string
    }

const StyledTextField = styled(TextField)(() => ({
    '& .MuiFormHelperText-root': {
        marginLeft: '0px',
    },
}))

export default function TextInput({ control, name, label, ...props }: TextInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <StyledTextField {...field} {...props} error={!!error} helperText={error?.message} label={label} />
            )}
        />
    )
}
