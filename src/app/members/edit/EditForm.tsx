'use client'
import { updateMemberProfile } from '@/app/actions/userActions'
import { memberEditSchema, MemberEditSchema } from '@/lib/MemberEditSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Textarea } from '@nextui-org/react'
import { Member } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
type Props = {
    member: Member
}
export default function EditForm({ member }: Props) {
    const router = useRouter()
    const { register, handleSubmit, reset, setError, formState: {
        isValid, isDirty, isSubmitting, errors
    } }
        = useForm<MemberEditSchema>({
            resolver: zodResolver(memberEditSchema),
            mode: 'onTouched'
        })
    useEffect(() => {
        if (member) {
            reset({
                name: member.name,
                description: member.description,
                city: member.city,
                country: member.country
            })
        }
    }, [member, reset])
    const onSubmit = async (data: MemberEditSchema) => {
        const nameUpdated = data.name !== member.name
        const result = await updateMemberProfile(data, nameUpdated)
        if (result.status === 'success') {
            toast.success('profile updated')
            router.refresh()
            reset({ ...data })
        } else {
            if (Array.isArray(result.error)) {
                result.error.forEach((e: any) => {
                    const fieldName = e.path.join('.')
                    setError(fieldName, {
                        message: e.message
                    })
                })
            } else {
                setError('root.serverError', {
                    message: result.error
                })
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
            <Input label='name' variant='bordered' {...register('name')}
                defaultValue={member.name} isInvalid={!!errors.name} errorMessage={errors.name?.message}></Input>
            <Textarea label='description' variant='bordered' {...register('description')}
                defaultValue={member.description} isInvalid={!!errors.description} errorMessage={errors.description?.message}
                minRows={6}
            ></Textarea>
            <div className='flex flex-row gap-3'>
                <Input label='city' variant='bordered' {...register('city')}
                    defaultValue={member.city} isInvalid={!!errors.city} errorMessage={errors.city?.message}></Input>
                <Input label='country' variant='bordered' {...register('country')
                } defaultValue={member.country} isInvalid={!!errors.country} errorMessage={errors.country?.message}></Input>
            </div>
            {errors.root?.serverError && (
                <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
            )}
            <Button type='submit' className='flex self-end' variant='solid'
                isDisabled={!isValid || !isDirty} isLoading={isSubmitting} color='default'>update</Button>
        </form>
    )
}
