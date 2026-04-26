import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getPostById} from "@/repository/PostRepository";
import PostSourceBadge from "@/components/PostSourceBadge";

export function PostCard({post, selectElement, isSelected, isOwner}) {

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
        <Card className={`w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] gap-4 hover:cursor-pointer transition-shadow ${isSelected ? 'ring-2 ring-accent/60' : ''}`}
              onClick={postDetails}>
            <CardHeader className='text-start gap-1'>
              <div className="flex flex-col gap-2 lg:flex-row lg:justify-between w-full">
                <CardTitle className="w-[80%]">{post.title}</CardTitle>
                <div className="flex items-center gap-2">
                  {post.category && (
                    <span className={`text-xs font-medium px-3 py-1 rounded-full w-min h-fit ${post.category === 'RENT' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                          {post.category === 'RENT' ? 'Rent' : 'Sell'}
                      </span>
                  )}
                  {!isOwner && <PostSourceBadge fetchedFrom={post.fetchedFrom} />}
                </div>
              </div>
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