import {SignupForm} from "@/components/SignupForm";
import Header from "@/components/Header";

export default function RegisterPage() {
    return (
        <div className='h-svh overflow-hidden'>
            <Header page='register'/>
            <div className="flex h-[90%] w-full items-center justify-center">
                <div className="w-full max-w-sm">
                    <SignupForm/>
                </div>
            </div>
        </div>
    )
}