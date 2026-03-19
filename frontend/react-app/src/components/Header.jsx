import {Link} from "react-router";
import {Button} from "@/components/ui/button";
import {LogInIcon, LogOutIcon, User, Plus} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useContext} from "react";
import {AuthContext} from "@/context/authContext";

export default function Header({page}) {
    const {isAuthenticated, logout} = useContext(AuthContext)

    return (
        <div className='flex justify-between py-3 px-10 bg-card/80 shadow-md shadow-white/50'>
            <div className='self-center'>
                <Link to={'/'} className='hover:text-accent'>HomeMatch</Link>
            </div>
            {page === 'home' && (
                <div>
                    <div className='flex gap-3'>
                        <Button className='hover:cursor-pointer'>
                            <Plus />
                            <Link to={'/create_post'}>Нов пост</Link>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className='size-9 hover:cursor-pointer'>
                                    <User className='size-7'/>
                                </Button>
                            </DropdownMenuTrigger>
                            {isAuthenticated ? (
                                <DropdownMenuContent align="end" className='bg-card'>
                                    <Link to={'/profile'}>
                                        <DropdownMenuItem
                                            className='hover:cursor-pointer focus:bg-background focus:text-accent'>
                                            <User className='focus:text-accent'/>
                                            Мој профил
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator/>
                                    <Link to={'/'}>
                                        <DropdownMenuItem
                                            className='hover:cursor-pointer focus:bg-background focus:text-accent'
                                            onClick={logout}>
                                            <LogOutIcon className='focus:text-accent'/>
                                            Одјави се
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            ) : (
                                <DropdownMenuContent align="end" className='bg-card'>
                                    <Link to={'/login'}>
                                        <DropdownMenuItem
                                            className='hover:cursor-pointer focus:bg-background focus:text-accent'>
                                            <LogInIcon className='focus:text-accent'/>
                                            Најави се
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            )}
                        </DropdownMenu>
                    </div>
                </div>
            )}
        </div>
    )
}