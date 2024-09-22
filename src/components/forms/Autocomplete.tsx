import { Controller, FieldValues } from 'react-hook-form'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { Autocomplete as MuiAutocomplete, Box, Checkbox, TextField } from '@mui/material'

interface AutocompleteProps extends FieldValues {
    name: string
    label: string
    options?: { value: any; label: string }[]
}

export default function Autocomplete({ control, name, options, label }: AutocompleteProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
                <MuiAutocomplete
                    options={options || []}
                    value={value.map((value: string) => options?.find((item) => item.value === value))}
                    getOptionLabel={(option) => options?.find((item) => item.value === option.value)?.label ?? ''}
                    isOptionEqualToValue={(option, newValue) => option.value === newValue.value}
                    onChange={(_, newValue) => {
                        onChange(newValue.map((item) => item.value))
                    }}
                    disableCloseOnSelect
                    multiple
                    sx={{width: '100%'}}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            inputRef={ref}
                            error={!!error}
                            helperText={error?.message}
                            label={label}
                            sx={{'& .MuiFormHelperText-root': {
                                marginLeft: '0px',
                            }}}
                        />
                    )}
                    renderOption={({key, ...props}, option, { selected }) => (
                        <Box component="li" key={key} {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon />}
                                checkedIcon={<CheckBoxIcon />}
                                checked={selected}
                            />
                            {option.label}
                        </Box>
                    )}
                />
            )}
        />
    )
}
