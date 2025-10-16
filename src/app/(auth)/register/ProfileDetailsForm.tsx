import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { error } from 'console'
import { format, subYears } from 'date-fns'
import { useFormContext } from 'react-hook-form'
export default function ProfileDetailsForm() {
    const { register, getValues, setValue, formState: { errors } } = useFormContext()
    const genderList = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ]
    return (
        <div className='space-y-4'>
            <Select defaultSelectedKeys={getValues('gender')} label='gender'
                aria-label='select gender' variant='bordered' {...register('gender')} errorMessage={errors.gender?.message as string}
                onChange={(e) => setValue('gender', e.target.value)}>{genderList.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}</Select>
            <Input defaultValue={getValues('dateOfBirth')} label='date of birth' max={format(subYears(new Date(), 10), 'yyyy-MM-dd')}
                type='date' variant='bordered' {...register('dateOfBirth')} isInvalid={!!errors.dateOfBirth} errorMessage={errors.dateOfBirth?.message as string}></Input>
            <Textarea defaultValue={getValues('description')} label='description' variant='bordered' {...register('description')}
                isInvalid={!!errors.description} errorMessage={errors.description?.message as string}></Textarea>
            <Input defaultValue={getValues('city')} label='city' variant='bordered' {...register('city')} errorMessage={errors.city?.message as string}></Input>
            <Input defaultValue={getValues('country')} label='country' variant='bordered' {...register('country')} isInvalid={!!errors.country}
                errorMessage={errors.country?.message as string}></Input>
        </div>
    )
}
