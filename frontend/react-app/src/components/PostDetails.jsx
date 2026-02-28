import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from "@/components/ui/item";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";

export default function PostDetails({post, onClose}) {
    return (
        <>
            <Item>
                <div className='flex justify-between w-full'>
                    <ItemTitle className='text-lg'>{post.title}</ItemTitle>
                    <ItemActions>
                        <Button variant="ghost" size="icon" className="rounded-full hover:cursor-pointer" onClick={onClose}>
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
                    <div className='pl-2'>
                        <ItemDescription>{post.creatorName}</ItemDescription>
                        <ItemDescription>{post.creatorEmail}</ItemDescription>
                        <ItemDescription>{post.creatorPhoneNumber}</ItemDescription>
                    </div>
                </ItemContent>

            </Item>
        </>
    )
}