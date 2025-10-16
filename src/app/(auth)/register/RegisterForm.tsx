'use client'
import { registerUser } from '@/app/actions/authActions'
import { profileSchema, RegisterSchema, registerSchema } from '@/lib/schemas/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { GiPadlock } from 'react-icons/gi'
import UserDetailsForm from './UserDetailsForm'
import { handleFormServerErrors } from '@/lib/util'
import ProfileDetailsForm from './ProfileDetailsForm'
import { useRouter } from 'next/navigation'
const stepSchemas = [registerSchema, profileSchema]
export default function RegisterForm() {
    const [activeStep, setActiveStep] = useState(0)
    const currentValidationSchema = stepSchemas[activeStep]
    const registerFormMethods = useForm<RegisterSchema>({ resolver: zodResolver(currentValidationSchema), mode: 'onTouched' })
    // const { register, handleSubmit, setError, formState: { errors, isValid, isSubmitting }, } = useForm<RegisterSchema>({
    //     resolver: zodResolver(registerSchema),
    //     mode: 'onTouched'
    // })
    // const onSubmit = async (data: RegisterSchema) => {
    //     const result = await registerUser(data)
    //     if (result.status === 'success') { console.log('user registered') } else {
    //         if (Array.isArray(result.error)) {
    //             result.error.forEach((e: any) => {
    //                 console.log(e)
    //                 const fieldName = e.path.join('.') as | 'email' | 'name' | 'password';
    //                 setError(fieldName, { message: e.message })
    //             })
    //         } else { setError('root.serverError', { message: result.error }) }
    //     }
    // }
    // const onSubmit = (data: RegisterSchema) => {
    //     console.log(data)
    // }
    const { handleSubmit, getValues, setError, formState: { errors, isValid, isSubmitting } } = registerFormMethods
    const router = useRouter()
    const onSubmit = async () => {
        registerFormMethods
        // console.log(getValues())
        const result = await registerUser(getValues())
        if (result.status === 'success') {
            // console.log('user registered')
            router.push('/register/success')
        } else {
            handleFormServerErrors(result, setError)
        }
    }
    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <UserDetailsForm></UserDetailsForm>;
            case 1:
                return <ProfileDetailsForm></ProfileDetailsForm>;
            default:
                return 'unknown step'
        }
    }
    const onBack = () => {
        setActiveStep((prev) => prev - 1)
    }
    const onNext = async () => {
        if (activeStep === stepSchemas.length - 1) {
            await onSubmit()
        } else {
            setActiveStep((prev) => prev + 1)
        }
    }
    return (
        <Card className='w-3/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-default'>
                    <div className='flex flex-row items-center gap-3'>
                        <GiPadlock size={30}></GiPadlock>
                        <h1 className='text-3xl font-semibold'>register</h1>
                    </div>
                    <p className='text-neutral-500'>nextmatch</p>
                </div>
            </CardHeader>
            <CardBody>
                <FormProvider {...registerFormMethods}>
                    <form onSubmit={handleSubmit(onNext)}>
                        <div className='space-y-4'>
                            {getStepContent(activeStep)}
                            {errors.root?.serverError && (
                                <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                            )}
                            <div className='flex flex-row items-center gap-6'>
                                {activeStep !== 0 && (<Button onClick={onBack} fullWidth>back</Button>)}
                                <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth color='default' type='submit'>
                                    {activeStep === stepSchemas.length - 1 ? 'submit' : 'continue'}
                                </Button>
                            </div>
                            {/* <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth color='default' type='submit'>register</Button> */}
                            {/* <UserDetailsForm></UserDetailsForm> */}
                            {/* <Button fullWidth color='default' type='submit' isDisabled={!isValid}>register</Button> */}
                            {/* <SocialLogin></SocialLogin> */}
                            <div className='flex justify-center hover:underline text-sm'>
                                {/* <Link href='/forgot-password'></Link> */}
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </CardBody>
        </Card>
    )
}




