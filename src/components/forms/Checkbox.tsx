import { Checkbox as MuiCheckbox, FormControlLabel, FormGroup, FormHelperText } from '@mui/material'
import { FieldValues, Controller } from 'react-hook-form'

interface CheckboxProps extends FieldValues {
    name: string
    label: string
}

export default function Checkbox({ name, label, control, ...props }: CheckboxProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormGroup {...props}>
                    <FormControlLabel control={<MuiCheckbox checked={value} onChange={onChange} />} label={label} />
                    {error && <FormHelperText sx={{ color: '#d32f2f' }}>{error?.message?.toString()}</FormHelperText>}
                </FormGroup>
            )}
        />
    )
}
