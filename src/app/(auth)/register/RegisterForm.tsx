'use client'
import { registerUser } from '@/app/actions/authActions'
import { RegisterSchema, registerSchema } from '@/lib/schemas/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, CardBody, Button, Input } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { GiPadlock } from 'react-icons/gi'
export default function RegisterForm() {
    const { register, handleSubmit, setError, formState: { errors, isValid, isSubmitting }, } = useForm<RegisterSchema>({
        // resolver: zodResolver(registerSchema),
        mode: 'onTouched'
    })

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data)
        if (result.status === 'success') { console.log('user registered') } else {
            if (Array.isArray(result.error)) {
                result.error.forEach((e: any) => {
                    console.log(e)
                    const fieldName = e.path.join('.') as | 'email' | 'name' | 'password';
                    setError(fieldName, { message: e.message })
                })
            } else { setError('root.serverError', { message: result.error }) }
        }
    }
    // const onSubmit = (data: RegisterSchema) => {
    //     console.log(data)
    // }
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <Input defaultValue='' label='name' {...register('name')} isInvalid={!!errors.name} errorMessage={errors.name?.message as string} variant='bordered'></Input>
                        <Input defaultValue='' label='email' {...register('email')} isInvalid={!!errors.email} errorMessage={errors.email?.message as string} variant='bordered'></Input>
                        <Input defaultValue='' label='password' {...register('password')} variant='bordered' type='password' isInvalid={!!errors.password} errorMessage={errors.password?.message as string}></Input>
                        <Button fullWidth color='default' type='submit' isDisabled={!isValid}>register</Button>
                        {/* <SocialLogin></SocialLogin> */}
                        <div className='flex justify-center hover:underline text-sm'>
                            {/* <Link href='/forgot-password'></Link> */}
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}
