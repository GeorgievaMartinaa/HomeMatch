import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription, FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {useContext, useEffect, useState} from "react"
import {AuthContext} from '@/context/authContext.jsx'
import {useNavigate} from "react-router"

export function LoginForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const [info, setInfo] = useState('');

    const {login, isAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate(-1);
        }
    }, [isAuthenticated]);

    async function handleLogin(event) {
        event.preventDefault()
        const response = await fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
        })

        if (!response.ok) {
            setInfo('');
            const errorData = await response.json();

            setError(errorData.detail);
            if (errorData.customErrorCode === "USER_NOT_VERIFIED") {
                setErrorCode(errorData.customErrorCode)
                setPassword('');
                return;
            }
            setUsername('');
            setPassword('');
            setErrorCode('');
            return;
        }

        setError('');
        setErrorCode('');
        setInfo('');
        const token = await response.text()

        login(token)
    }

    async function handleResendVerification(event) {
        event.preventDefault();
        const params = new URLSearchParams();
        params.append("username", username);

        const response = await fetch(`http://localhost:8080/api/v1/auth/resend-verification?${params}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.detail)
            setErrorCode('');
            return;
        }

        setErrorCode('');
        setError('');
        setInfo('Verification link is sent to your email')
    }

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your username and password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input id="username" type="text" value={username} required onChange={(e) => {
                                    setUsername(e.target.value)
                                }}/>
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    {/*<a*/}
                                    {/*    href="#"*/}
                                    {/*    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">*/}
                                    {/*    Forgot your password?*/}
                                    {/*</a>*/}
                                </div>
                                <Input id="password" type="password" value={password} required onChange={(e) => {
                                    setPassword(e.target.value)
                                }}/>
                                <FieldError>{error}</FieldError>
                                {errorCode === "USER_NOT_VERIFIED" &&
                                <Button variant="link" className='hover:underline' onClick={handleResendVerification}>Resend
                                    verification link</Button>}
                                {info && <FieldDescription className='color-primary'> {info} </FieldDescription>}
                            </Field>
                            <Field>
                                <Button type="submit">Login</Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="/register">Sign up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
