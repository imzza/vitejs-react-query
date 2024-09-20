import Checkbox from '../components/forms/Checkbox'
import TextInput from '../components/forms/TextInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Box } from '@mui/material'
import LoadingButton from '../components/LoadingButton'
import Autocomplete from '../components/forms/Autocomplete'
import ComboBox from '../components/forms/ComboBox'
import z from 'zod'

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Please enter a valid email' }),
    checkbox: z.boolean().refine((val) => val === true, {
        message: 'Checkbox is required',
    }),
    state: z.array(z.string()).min(1, {message: "Please select atlease 1 select"}),
    select: z.string().min(1, {message: 'Select is required'}),
    // amount: z.preprocess(
    //     (val) => (val === null ? undefined : val),
    //     z.number().min(1, 'Age is required and must be a positive number')
    // ),
    amount: z.preprocess(
        (val) => (val === null ? undefined : Number(val)),
        z
            .union([
                z.number().min(1, 'Amount must be a positive number'), // Number validation
                z.string().optional(), // Allow null and empty initial values
            ])
            .refine((val) => val !== undefined, { message: 'Amount is required' })
    ),
})

type FormSchema = z.infer<typeof formSchema>

export default function HomePage() {
    const methods = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            checkbox: false,
            amount: '',
            state: ['AK'],
            select: ''
        },
        criteriaMode: 'all',
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

    const onSubmit = (data: FormSchema) => {
        console.log(methods.formState.errors)
        console.log(data)
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <h1>Home Page</h1>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Stack spacing={1} sx={{ width: '400px', alignItems: 'center' }}>
                    <TextInput
                        name="name"
                        control={methods.control}
                        label="Name"
                        placeholder="Enter your name"
                        fullWidth
                    />
                    <TextInput
                        name="amount"
                        type="number"
                        control={methods.control}
                        label="Number..."
                        placeholder="Enter your lucky number"
                        fullWidth
                    />
                    <TextInput
                        name="email"
                        control={methods.control}
                        label="Email Address"
                        placeholder="Enter your email"
                        fullWidth
                    />
                    <Autocomplete
                        name="state"
                        control={methods.control}
                        label="State"
                        options={[
                            { label: 'Alabama', value: 'AL' },
                            { label: 'Alaska', value: 'AK' },
                            { label: 'Arizona', value: 'AZ' },
                            { label: 'Arkansas', value: 'AR' },
                            { label: 'California', value: 'CA' },
                        ]}
                    />
                    <ComboBox
                        name="select"
                        control={methods.control}
                        label="ComboBox"
                        options={[
                            { label: 'Alabama', value: 'AL' },
                            { label: 'Alaska', value: 'AK' },
                            { label: 'Arizona', value: 'AZ' },
                            { label: 'Arkansas', value: 'AR' },
                            { label: 'California', value: 'CA' },
                        ]}
                    />
                    <Checkbox
                        name="checkbox"
                        control={methods.control}
                        label="Accept terms and condition"
                        sx={{ alignSelf: 'flex-start' }}
                    />
                    <LoadingButton label="Submit" loading={false} sx={{ width: '200px' }} />
                </Stack>
            </Box>
        </form>
    )
}
