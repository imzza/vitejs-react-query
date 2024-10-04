import Checkbox from '../components/forms/Checkbox'
import TextInput from '../components/forms/TextInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Box, Typography } from '@mui/material'
import LoadingButton from '../components/LoadingButton'
import Autocomplete from '../components/forms/Autocomplete'
import ComboBox from '../components/forms/ComboBox'
import z from 'zod'
import Switch from '../components/forms/Switch'
import PasswordInput from '../components/forms/PasswordInput'
import FileUpload from '../components/forms/FileUpload'
import DateInput from '../components/forms/DateInput'
// import dayjs from "dayjs"
import { useStatesQuery } from '../api/axios'

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Please enter a valid email' }),
    checkbox: z.boolean().refine((val) => val === true, {
        message: 'Checkbox is required',
    }),
    state: z.array(z.string()).min(1, { message: 'Please select atlease 1 select' }),
    select: z.string().min(1, { message: 'Select is required' }),
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
    switch: z.boolean().refine((val) => val === true, { message: 'Switch is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    image: z.instanceof(File, { message: 'Image file is required' }),
    // date: z.string().refine((val) => dayjs(val, "YYYY-MM-DD", true).isValid(), {
    //     message: "Date is required"
    // }),
})

type FormSchema = z.infer<typeof formSchema>

export default function HomePage() {
    const { data: states } = useStatesQuery()
    console.log(`States Data: ${JSON.stringify(states)}`);

    const methods = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            checkbox: false,
            amount: '',
            state: ['AK'],
            select: '',
            switch: false,
            password: '',
            image: '' as unknown as File,
            // date: ''
        },
        criteriaMode: 'all',
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

    console.log(methods.formState.errors)

    const onSubmit = (data: FormSchema) => {
        console.log(methods.formState.errors)
        console.log(data)
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Typography variant="h3" sx={{ textAlign: 'center' }} color="primary">
                Home Page
            </Typography>
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
                    <Autocomplete name="state" control={methods.control} label="State" options={states} />
                    <ComboBox name="select" control={methods.control} label="ComboBox" options={states} />

                    <PasswordInput control={methods.control} name="password" label="Password" fullWidth />
                    {/* <FileUpload name="image" control={methods.watch} limit={1} multiple={false} /> */}
                    <FileUpload control={methods.control} limit={1} multiple={false} name="image" label="File Upload" />
                    <Checkbox
                        name="checkbox"
                        control={methods.control}
                        label="Accept terms and condition"
                        sx={{ alignSelf: 'flex-start' }}
                    />
                    <Switch
                        name="switch"
                        control={methods.control}
                        label="Switch Component"
                        sx={{ alignSelf: 'flex-start' }}
                    />
                    {/* <DateInput name="date" label="Date Input" control={methods.control} /> */}

                    <LoadingButton label="Submit" loading={false} sx={{ width: '200px' }} />
                </Stack>
            </Box>
        </form>
    )
}
