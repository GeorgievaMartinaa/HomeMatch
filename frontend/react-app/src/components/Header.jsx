import {Link} from "react-router";
import {Button} from "@/components/ui/button";
import {User} from "lucide-react";

export default function Header() {
    return (

        <div className='flex justify-between'>
            <div>
                <Link to={'/'}>HomeMatch</Link>
            </div>
            <div>
                <div className='flex gap-3'>
                    <Button className='hover:cursor-pointer'>Create post</Button>
                    <Link to={'/profile'}>
                        <Button variant="ghost" className='size-9 hover:cursor-pointer'>
                            <User className='size-7'/>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}