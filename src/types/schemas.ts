import z from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Email is invalid'),
    password: z.string().min(1, 'Password is required'),
    remember: z.boolean().optional(),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Email is invalid'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    termsAccepted: z.boolean().refine((val) => val === true, { message: 'Accept Terms & Conditions is required' }),
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Email is invalid'),
})
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>


export const verifyEmailCodeSchema = z.object({
    verificationCode: z.string().min(1, 'Verification Code is required'),
    email: z.string().min(1, 'Email is required').email('Email is invalid'),
})

export type VerifyEmailCodeSchema = z.infer<typeof verifyEmailCodeSchema>


// export const resetPasswordSchema = Yup.object().shape({
//     password: Yup.string().required('Password is required').min(8),
//     confirmPassword: Yup.string()
//         .required('Confirm Password is required')
//         .oneOf([Yup.ref('password')], 'Passwords must match'),
// })

// export type ResetPasswordSchema = Yup.InferType<typeof resetPasswordSchema>

// export const changePasswordSchema = Yup.object().shape({
//     oldPassword: Yup.string().required('Old Password is required'),
//     password: Yup.string().required('Password is required').min(8),
//     confirmPassword: Yup.string()
//         .required('Confirm Password is required')
//         .oneOf([Yup.ref('password')], 'Passwords must match'),
// })

// export type ChangePasswordSchema = Yup.InferType<typeof changePasswordSchema>
