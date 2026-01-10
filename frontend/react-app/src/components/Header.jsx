import {
    NavigationMenu,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {Link} from "react-router";

export default function Header() {
    return (
        <div className='relative w-full aspect-[10/3] min-h-[240px] max-h-[420px] bg-[url(/src/assets/homematch.png)]
                        bg-cover bg-no-repeat bg-[position:70%_40%] overflow-hidden'>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 backdrop-blur-[2px]">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to={'/'}>HomeMatch</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to={'/profile'}>Profile</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <h1 className=' h-[80%] font-[Oswald] italic md:text-3xl lg:text-6xl text-xl text-left content-center ml-[10%]'>
                    Find your perfect home</h1>
            </div>
        </div>

    )
}