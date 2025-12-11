import {Button} from "@/components/ui/button";
import {Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemTitle} from "@/components/ui/item"
import {Link} from "react-router";

export default function RegistrationSuccess() {
    return (
        <div className="flex w-full gap-6 justify-center">
            <Item className='max-w-xl border-2 border-solid border-primary text-start'>
                <ItemHeader className='font-bold text-xl text-center justify-center'>Account registration
                    successful</ItemHeader>
                <ItemContent className='basis-full text-sm/8'>
                    <ItemTitle>Verify your account</ItemTitle>
                    <ItemDescription >We have sent you a link for account verification on your email. Please verify your
                        account in order to be able to use it.</ItemDescription>
                </ItemContent>
                <ItemActions>
                    <Button asChild>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                </ItemActions>
            </Item>
        </div>
    )
}