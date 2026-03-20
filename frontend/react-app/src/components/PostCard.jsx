import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getPostById} from "@/repository/PostRepository";

export function PostCard({post, selectElement}) {

    const postDetails = async () => {
        try {
            const fetchedPost = await getPostById(post.id);
            selectElement(fetchedPost);
        } catch (error) {
            console.error(error.message);
        }
    }

    function formatPostDate(instantString) {
        const postDate = new Date(instantString);
        const now = new Date();

        const isSameDay = postDate.getDate() === now.getDate() &&
            postDate.getMonth() === now.getMonth() &&
            postDate.getFullYear() === now.getFullYear();

        if (isSameDay) {
            const diffMs = now - postDate;
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

            if (diffHours === 0) {
                const diffMinutes = Math.floor(diffMs / (1000 * 60));
                return diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
            } else if (diffHours === 1) {
                return '1 hour ago';
            } else {
                return `${diffHours} hours ago`;
            }
        } else {
            return postDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: 'numeric'
            });
        }
    }
    return (
        <Card className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] gap-3 hover:cursor-pointer"
              onClick={postDetails}>
            <CardHeader className='text-start gap-1'>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription className='line-clamp-2'>{post.location}</CardDescription>
                <CardDescription>{post.priceAmount} {post.priceCurrency}</CardDescription>
            </CardHeader>
            <CardContent className='text-left h-1/3'>
                <p className='line-clamp-2'>{post.description}</p>
            </CardContent>
            <CardFooter className='justify-end'>
                <p>{formatPostDate(post.createdAt)}</p>
            </CardFooter>
        </Card>
    )

}