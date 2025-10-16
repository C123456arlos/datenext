import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import useFilterStore from "./useFilterStore"
import { ChangeEvent, startTransition, useEffect } from "react"
import { FaFemale, FaMale } from "react-icons/fa"
import usePaginationStore from "./usePaginationStore"
import { Selection } from "@nextui-org/react"
export const useFilters = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { filters, setFilters } = useFilterStore()
    const { pageNumber, pageSize, setPage, totalCount } = usePaginationStore(state => ({
        pageNumber: state.pagination.pageNumber,
        pageSize: state.pagination.pageSize,
        setPage: state.setPage,
        totalCount: state.pagination.totalCount
    }))
    const { gender, ageRange, orderBy, withPhoto } = filters
    useEffect(() => {
        if (gender || ageRange || orderBy || withPhoto) {
            setPage(1)
        }
    }, [gender, ageRange, orderBy, setPage, withPhoto])
    useEffect(() => {

        const searchParams = new URLSearchParams()

        if (gender) searchParams.set('gender', gender.join(','))
        if (ageRange) searchParams.set('ageRange', ageRange.toString())
        if (orderBy) searchParams.set('orderBy', orderBy)
        if (pageSize) searchParams.set('pageSize', pageSize.toString())
        if (pageNumber) searchParams.set('pageNumber', pageNumber.toString())
        searchParams.set('withPhoto', withPhoto.toString())
        router.replace(`${pathname}?${searchParams}`)
    }, [ageRange, orderBy, gender, router, pathname, withPhoto, pageNumber, pageSize])

    const orderByList = [
        { label: 'last active', value: 'updated' },
        { label: 'newest members', value: 'created' }
    ]
    const genderList = [
        { value: 'male', icon: FaMale },
        { value: 'female', icon: FaFemale }
    ]
    const handleAgeSelect = (value: number[]) => {
        setFilters('ageRange', value)
    }
    const handleOrderSelect = (value: Selection) => {
        if (value instanceof Set) {
            setFilters('orderBy', value.values().next().value)
        }
    }
    const handleGenderSelect = (value: string) => {
        if (gender.includes(value)) setFilters('gender', gender.filter(g => g !== value))
        else setFilters('gender', [...gender, value])
    }
    const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters('withPhoto', e.target.checked)
    }
    return { orderByList, genderList, selectAge: handleAgeSelect, selectGender: handleGenderSelect, selectOrder: handleOrderSelect, selectWithPhoto: handleWithPhotoToggle, filters, totalCount }
}

