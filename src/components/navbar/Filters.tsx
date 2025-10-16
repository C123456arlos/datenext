import { useFilters } from '../../app/hooks/useFilters'
import { Button, Select, Selection, SelectItem, Slider, Spinner, Switch } from '@nextui-org/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaFemale, FaMale } from 'react-icons/fa'
export default function Filters() {
    const { orderByList, genderList, selectAge, selectGender, selectOrder, selectWithPhoto, filters, totalCount } = useFilters()
    // const orderByList = [
    //     { label: 'last active', value: 'updated' },
    //     { label: 'newest members', value: 'created' }
    // ]
    // const genderList = [
    //     { value: 'male', icon: FaMale },
    //     { value: 'female', icon: FaFemale }
    // ]
    // const pathname = usePathname()
    // const searchParams = useSearchParams()
    // const router = useRouter()
    // const handleAgeSelect = (value: number[]) => {
    //     const params = new URLSearchParams(searchParams)
    //     params.set('ageRange', value!.toString())
    //     router.replace(`${pathname}?${params}`)
    // }
    // const handleOrderSelect = (
    //     value: Selection
    // ) => {
    //     if (value instanceof Set) {
    //         const params = new URLSearchParams(
    //             searchParams
    //         )
    //         // @ts-ignore
    //         params.set('orderBy', value.values().next().value)
    //         router.replace(`${pathname}?${params}`)
    //     }
    // }
    // const selectedGender = searchParams.get('gender')?.split(',') || ['male', 'female']
    // const handleGenderSelect = (selectGender: string) => {
    //     const params = new URLSearchParams(searchParams)
    //     if (selectedGender.includes(selectGender)) { params.set('gender', selectedGender.filter((gender) => gender !== selectGender).toString()) }
    //     else { params.set('gender', [...selectedGender, selectGender].toString()) }
    //     router.replace(`${pathname}?${params}`)
    // }
    const { gender, ageRange, orderBy, withPhoto } = filters
    return (
        <div className='shadow-md py-4 px-4 lg:px-6'>
            <div className='hidden md:flex flex-row justify-around items-center'>
                <div className='flex gap-2 items-center'>
                    <div className='text-default font semibold text-xl'>
                        results: {totalCount}
                        {/* {isPending ?(<Spinner size='sm' color='default'></Spinner>):(totalCount)} */}
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div>gender:</div>
                    {genderList.map(
                        ({ icon: Icon, value }) => (
                            <Button key={value} size='sm' isIconOnly color='default' variant={gender.includes(value) ? 'solid' : 'light'} onClick={() => selectGender(value)}><Icon size={24}></Icon></Button>
                        )
                    )}
                </div>
                <div className='flex flex-row items-center gap-2 w-1/4'>
                    <Slider label='age range' onChangeEnd={values => selectAge(values as number[])} size='sm' minValue={10} maxValue={100} defaultValue={ageRange} aria-label='age range slider' color='foreground'></Slider>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-sm'>with photo</p>
                    <Switch color='default' defaultSelected size='sm' onChange={(checked) => selectWithPhoto(checked)}></Switch>
                </div>
                <div className='w-1/4'>
                    <Select size='sm' fullWidth label='order by' variant='bordered' color='default' aria-label='order by selector'
                        selectedKeys={new Set(orderBy)}
                        // @ts-ignore
                        onSelectionChange={selectOrder}>{orderByList.map((item) => (
                            <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>))}</Select>
                </div>
            </div>
        </div>
    )
}




// import React from "react";
// import {
//   Button,
//   Select,
//   SelectItem,
//   Slider,
//   Spinner,
//   Switch,
// } from "@nextui-org/react";
// import { useFilters } from "@/hooks/useFilters";

// export default function Filters() {
//   const {
//     orderByList,
//     genderList,
//     selectAge,
//     selectGender,
//     selectOrder,
//     selectWithPhoto,
//     filters,
//     totalCount,
//     isPending,
//   } = useFilters();

//   const { gender, ageRange, orderBy } = filters;

//   return (
//     <div className="shadow-md py-4 px-4 lg:px-6">
//       {/* Desktop Layout */}
//       <div className="hidden md:flex flex-row justify-around items-center">
//         <div className="flex gap-2 items-center">
//           <div className="text-default font-semibold text-xl">
//             Results:{" "}
//             {isPending ? (
//               <Spinner
//                 size="sm"
//                 color="default"
//               />
//             ) : (
//               totalCount
//             )}
//           </div>
//         </div>

//         <div className="flex gap-2 items-center">
//           <div>Gender:</div>
//           {genderList.map(
//             ({ icon: Icon, value }) => (
//               <Button
//                 key={value}
//                 size="sm"
//                 isIconOnly
//                 color="default"
//                 variant={
//                   gender.includes(value)
//                     ? "solid"
//                     : "light"
//                 }
//                 onClick={() =>
//                   selectGender(value)
//                 }
//               >
//                 <Icon size={24} />
//               </Button>
//             )
//           )}
//         </div>
//         <div className="flex flex-row items-center gap-2 w-1/4">
//           <Slider
//             label="Age range"
//             size="sm"
//             minValue={18}
//             maxValue={100}
//             defaultValue={ageRange}
//             aria-label="Age range slider"
//             color="foreground"
//             onChangeEnd={(value) =>
//               selectAge(value as number[])
//             }
//           />
//         </div>
//         <div className="flex flex-col items-center">
//           <p className="text-sm">With photo</p>
//           <Switch
//             color="default"
//             defaultSelected
//             size="sm"
//             onChange={(checked) =>
//               selectWithPhoto(checked)
//             }
//           />
//         </div>
//         <div className="w-1/4">
//           <Select
//             size="sm"
//             fullWidth
//             label="Order by"
//             variant="bordered"
//             color="default"
//             aria-label="Order by selector"
//             selectedKeys={new Set([orderBy])}
//             onSelectionChange={selectOrder}
//           >
//             {orderByList.map((item) => (
//               <SelectItem
//                 key={item.value}
//                 value={item.value}
//               >
//                 {item.label}
//               </SelectItem>
//             ))}
//           </Select>
//         </div>
//       </div>

//       {/* Mobile Layout */}
//       <div className="md:hidden space-y-4">
//         {/* Results Row */}
//         <div className="flex justify-between items-center">
//           <div className="text-default font-semibold text-lg">
//             Results:{" "}
//             {isPending ? (
//               <Spinner
//                 size="sm"
//                 color="default"
//               />
//             ) : (
//               totalCount
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <p className="text-sm">With photo</p>
//             <Switch
//               color="default"
//               defaultSelected
//               size="sm"
//               onChange={(checked) =>
//                 selectWithPhoto(checked)
//               }
//             />
//           </div>
//         </div>

//         {/* Gender and Order Row */}
//         <div className="flex justify-between items-center gap-4">
//           <div className="flex gap-2 items-center">
//             <div className="text-sm font-medium">Gender:</div>
//             {genderList.map(
//               ({ icon: Icon, value }) => (
//                 <Button
//                   key={value}
//                   size="sm"
//                   isIconOnly
//                   color="default"
//                   variant={
//                     gender.includes(value)
//                       ? "solid"
//                       : "light"
//                   }
//                   onClick={() =>
//                     selectGender(value)
//                   }
//                 >
//                   <Icon size={20} />
//                 </Button>
//               )
//             )}
//           </div>
//           <div className="flex-1 max-w-32">
//             <Select
//               size="sm"
//               fullWidth
//               label="Order by"
//               variant="bordered"
//               color="default"
//               aria-label="Order by selector"
//               selectedKeys={new Set([orderBy])}
//               onSelectionChange={selectOrder}
//             >
//               {orderByList.map((item) => (
//                 <SelectItem
//                   key={item.value}
//                   value={item.value}
//                 >
//                   {item.label}
//                 </SelectItem>
//               ))}
//             </Select>
//           </div>
//         </div>

//         {/* Age Range Row */}
//         <div className="px-2">
//           <Slider
//             label="Age range"
//             size="sm"
//             minValue={18}
//             maxValue={100}
//             defaultValue={ageRange}
//             aria-label="Age range slider"
//             color="foreground"
//             onChangeEnd={(value) =>
//               selectAge(value as number[])
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }