'use client'
import { Input } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
export default function UserDetailsForm() {
    const { register, getValues, formState: { errors } } = useFormContext()
    return (
        <div className='space-y-4'>
            <Input defaultValue={getValues('name')} label='name' {...register('name')} isInvalid={!!errors.name} errorMessage={errors.name?.message as string} variant='bordered'></Input>
            <Input defaultValue={getValues('email')} label='email' {...register('email')} isInvalid={!!errors.email} errorMessage={errors.email?.message as string} variant='bordered'></Input>
            <Input defaultValue={getValues('password')} label='password' {...register('password')} variant='bordered' type='password' isInvalid={!!errors.password} errorMessage={errors.password?.message as string}></Input>
            {/* <SocialLogin></SocialLogin> */}
            <div className='flex justify-center hover:underline text-sm'>
                {/* <Link href='/forgot-password'></Link> */}
            </div>
        </div>
    )
}