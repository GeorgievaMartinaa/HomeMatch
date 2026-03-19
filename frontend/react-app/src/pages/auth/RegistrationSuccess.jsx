import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemTitle } from "@/components/ui/item"
import { Link } from "react-router"
import Header from '@/components/Header.jsx'

export default function RegistrationSuccess() {
  return (
      <div className="flex w-full h-svh justify-center items-center">
        <Item className="max-w-xl h-fit border-4 border-double rounded-xl shadow-lg shadow-primary/30 border-primary text-start gap-5 p-5">
          <ItemHeader className="font-bold text-xl text-center justify-center">Account registration
            successful</ItemHeader>
          <ItemContent className="basis-full text-sm/8">
            <ItemTitle>Verify your account</ItemTitle>
            <ItemDescription>We have sent you a link for account verification on your email. Please verify your
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