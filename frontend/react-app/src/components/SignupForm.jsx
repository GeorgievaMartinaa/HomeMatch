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
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/context/authContext";
import {useNavigate} from "react-router";
import {Spinner} from "@/components/ui/spinner";

export function SignupForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])


    const {isAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated])

    async function handleRegister(event) {
        event.preventDefault();
        setEmailError('');
        setUsernameError('');
        setErrors([]);
        setIsLoading(true);

        const response = await fetch("http://localhost:8080/api/v1/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({firstName, lastName, email, username, password}),
        })

        console.log(response)
        if (!response.ok) {
            const errorData = await response.json();

            if(errorData.customErrorCode === "BAD_USERNAME"){
                setUsernameError(errorData.detail);
                setUsername('');
            }else if(errorData.customErrorCode === "BAD_EMAIL"){
                setEmailError(errorData.detail);
                setEmail('');
            } else if(errorData.errors) {
                setErrors(errorData.errors)
            }
            setPassword('');
            setIsLoading(false);
            return;
        }

        setIsLoading(false);

        navigate('/success_registration');
    }

    return (
        <>
            {isLoading && <div className="flex justify-center">
                <Spinner className="size-8 "/>
            </div>}
            {!isLoading &&
            <Card>
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Enter your information below to create the account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister}>
                        <FieldGroup className='flex flex-col gap-4'>
                            <Field className="grid grid-cols-2 gap-3">
                                <Field>
                                    <FieldLabel htmlFor="name">First Name</FieldLabel>
                                    <Input id="name" type="text" placeholder="John" value={firstName} required
                                           onChange={(e) => {
                                               setFirstName(e.target.value)
                                           }}/>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                    <Input id="lastName" type="text" placeholder="Doe" value={lastName} required
                                           onChange={(e) => {
                                               setLastName(e.target.value)
                                           }}/>
                                </Field>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" type="email" placeholder="jon@gmail.com" value={email} required
                                       onChange={(e) => {
                                           setEmail(e.target.value)
                                       }}/>
                                <FieldError>{emailError}</FieldError>
                                <FieldDescription>
                                    We&apos;ll use this to contact you. We will not share your email
                                    with anyone else.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input id="username" type="text" value={username} required onChange={(e) => {
                                    setUsername(e.target.value)
                                }}/>
                                <FieldError>{usernameError}</FieldError>
                                <FieldError>{errors?.username?.map((msg, i) => (
                                    <div key={i}>{msg}</div>
                                ))}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input id="password" type="password" value={password} required onChange={(e) => {
                                    setPassword(e.target.value)
                                }}/>
                                <FieldError>
                                    {errors?.password?.map((msg, i) => (
                                        <div key={i}>{msg}</div>
                                    ))}
                                </FieldError>
                            </Field>
                            <FieldGroup>
                                <Field>
                                    <Button type="submit">Create Account</Button>
                                    <FieldDescription className="px-6 text-center">
                                        Already have an account? <a href="/login">Sign in</a>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            }
        </>
    );
}
