import { TextField, Autocomplete, styled } from '@mui/material'
import { Controller, FieldValues } from 'react-hook-form'

interface ComboBoxProps extends FieldValues {
    name: string
    label: string
    options?: { label: string; value: string }[]
}
const StyledTextField = styled(TextField)(() => ({
    '& .MuiFormHelperText-root': {
        marginLeft: '0px',
    },
}))

export default function ComboBox({ control, name, label, options }: ComboBoxProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                    value={
                        value
                            ? (options?.find((option) => {
                                  return value === option.value
                              }) ?? null)
                            : null
                    }
                    sx={{ width: '100%' }}
                    disablePortal
                    options={options || []}
                    renderInput={(params) => (
                        <StyledTextField
                            {...params}
                            inputRef={ref}
                            label={label}
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                    onChange={(_, newValue) => onChange(newValue?.value)}
                />
            )}
        />
    )
}
