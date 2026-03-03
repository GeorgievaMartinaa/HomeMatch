import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from "@/components/ui/item";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Mail, Phone, User, X} from "lucide-react";

export default function PostDetails({post, onClose}) {
    return (
        <>
            <Item>
                <div className='flex justify-between w-full'>
                    <ItemTitle className='text-lg'>{post.title}</ItemTitle>
                    <ItemActions>
                        <Button variant="ghost" size="icon" className="rounded-full hover:cursor-pointer"
                                onClick={onClose}>
                            <X/>
                        </Button>
                    </ItemActions>
                </div>
                <Separator/>
                <ItemDescription className='text-left text-foreground'>{post.description}</ItemDescription>
                <ItemContent className='w-full text-left'>
                    <ItemDescription>{post.location}</ItemDescription>
                    <ItemDescription>{post.priceAmount} {post.priceCurrency}</ItemDescription>
                </ItemContent>
                <Separator/>
                <ItemContent className='w-full text-left'>
                    <ItemTitle>Contact details:</ItemTitle>
                    <div className='flex flex-col gap-2 pl-2 pt-2'>
                        <div className='flex items-center gap-2'>
                            <User size='16'/>
                            <ItemDescription>{post.creatorName}</ItemDescription>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Mail size='16' />
                            <ItemDescription>{post.creatorEmail}</ItemDescription>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Phone size='16'/>
                            <ItemDescription>{post.creatorPhoneNumber}</ItemDescription>
                        </div>
                    </div>
                </ItemContent>

            </Item>
        </>
    )
}