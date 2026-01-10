import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Mail, Phone} from "lucide-react";


export function PostDetailsModal({open, post, onOpenChange}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[425px] bg-linear-to-b from-card-active to-card-active-foreground/60 text-muted-foreground shadow-xl/30 ">
                <DialogHeader>
                    <DialogTitle>{post.title}</DialogTitle>
                    <DialogDescription className='text-card-active-foreground'>
                        {post.description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <h3><span className='text-sm'>Location:</span> {post.location} </h3>
                    <h3><span className='text-sm'>Price:</span> {post.priceAmount} {post.priceCurrency} </h3>
                    <h3><span className='text-sm'>Contact:</span> {post.creatorName} </h3>
                    <div className='pl-[10px] flex-col'>
                        <div className='flex flex-row gap-2 items-center'>
                            <Phone className='size-4'/><span>{post.creatorPhoneNumber}</span>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Mail className='size-4'/><span>{post.creatorEmail}</span>
                        </div>
                    </div>
                </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
</Dialog>
)
}