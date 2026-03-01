import {LoginForm} from "@/components/LoginForm";
import Header from "@/components/Header";

export default function LoginPage() {
    return (
        <div className="h-svh overflow-hidden">
            <Header/>
            <div className="flex w-full h-[90%] items-center justify-center">
                <div className="w-full max-w-sm">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
}