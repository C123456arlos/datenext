'use client'
import CardWrapper from "@/app/components/CardWrapper"
import { useRouter } from "next/navigation"
import { FaCheckCircle } from "react-icons/fa"
export default function RegisterSuccessPage() {
    const router = useRouter()
    return (
        <CardWrapper headerText='you registered' subHeaderText='you can login' action={() => router.push('/login')}
            actionLabel='go to login' headerIcon={FaCheckCircle}></CardWrapper>
    )
}
