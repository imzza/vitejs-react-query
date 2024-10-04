import { Controller, FieldValues, Control } from 'react-hook-form'

import { FormControlLabel, Switch as MuiSwitch, FormGroup, FormHelperText } from '@mui/material'

interface SwitchProps extends FieldValues {
    name: string
    label: string
    control: Control<any>
}

export default function Switch({ control, name, label, ...props }: SwitchProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormGroup {...props}>
                    <FormControlLabel control={<MuiSwitch {...field} checked={field.value} />} label={label} />
                    {error && <FormHelperText sx={{ color: '#d32f2f' }}>{error?.message?.toString()}</FormHelperText>}
                </FormGroup>
            )}
        />
    )
}
