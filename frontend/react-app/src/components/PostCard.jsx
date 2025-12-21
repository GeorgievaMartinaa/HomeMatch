import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export function PostCard({post}){
    return (
        <Card className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] gap-2">
            <CardHeader className='text-start gap-1'>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.location}</CardDescription>
                <CardDescription>{post.priceAmount} {post.priceCurrency}</CardDescription>
            </CardHeader>
            <CardContent className='text-left'>
                <p className='line-clamp-2'>{post.description}</p>
            </CardContent>
            <CardFooter className='justify-end'>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )

}