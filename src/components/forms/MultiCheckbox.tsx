import { Checkbox, FormControlLabel, FormControl, FormGroup, FormHelperText, FormLabel } from '@mui/material'
import { FieldValues, Controller } from 'react-hook-form'

interface MultiCheckboxProps extends FieldValues {
    name: string
    label: string
    options: { value: any; label: string }[]
}

export default function MultiCheckbox({ name, label, options, control, ...props }: MultiCheckboxProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormControl error={!!error}>
                    <FormLabel>
                        {label} {JSON.stringify(value)}
                    </FormLabel>
                    <FormGroup>
                        {options?.map((option) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={value.includes(option.value)}
                                        onChange={() => {
                                            if (value.includes(option.value)) {
                                                onChange((value as string[]).filter((item) => item !== option.value))
                                            } else {
                                                onChange([...value, option.value])
                                            }
                                        }}
                                        key={option.value}
                                    />
                                }
                                label={option.label}
                                key={option.value}
                            />
                        ))}
                    </FormGroup>
                    <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
            )}
        ></Controller>
    )
}
