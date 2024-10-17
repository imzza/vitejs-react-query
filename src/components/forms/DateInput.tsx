import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Controller, Control, FieldValues } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export interface FormInputProps extends FieldValues {
    name: string
    control: Control<any>
    label: string
}

export default function DateInput({ name, control, label, ...other }: FormInputProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <DatePicker value={value} onChange={onChange} label={label} {...other} />
                )}
            />
        </LocalizationProvider>
    )
}
