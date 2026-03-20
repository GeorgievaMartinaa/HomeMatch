import {useCallback, useState} from "react";
import {PostCard} from "@/components/PostCard";
import {PaginationComponent} from "@/components/Pagination";
import PostDetails from "@/components/PostDetails";
import {Spinner} from "@/components/ui/spinner";
import {getPostById} from "@/repository/PostRepository";

export default function PostList({isLoading, posts, totalPages, setPageNumber, pageNumber, isOwner, onPostChanged}) {

    const [selectedElement, setSelectedElement] = useState(null);

    const handleCloseDetails = useCallback(() => {
        setSelectedElement(null)
    },[])

    const onNextPage = () => {
        setPageNumber(pageNumber + 1);
    }
    const onPrevPage = () => {
        setPageNumber(pageNumber - 1);
    }

    const changeSelectedElement = useCallback((post) => {
        setSelectedElement(post)
    }, [])

    const handlePostChanged = useCallback(async () => {
        if (onPostChanged) onPostChanged()
        if (selectedElement) {
            try {
                const updated = await getPostById(selectedElement.id)
                setSelectedElement(updated)
            } catch {
                setSelectedElement(null)
            }
        }
    }, [selectedElement, onPostChanged])

    return (
        <div>
            {isLoading ? (
                <div className=' h-screen flex justify-center items-center'>
                    <Spinner className="size-8"/>
                </div>) : (
                <>
                    <div className='flex gap-2'>
                        <div className={`flex flex-wrap gap-2 ${selectedElement ? 'w-full sm:w-2/3 h-min' : 'w-full'}`}>
                            {posts.map(post => {
                                return <PostCard post={post} key={post.id} selectElement={changeSelectedElement}/>
                            })}
                        </div>
                        {selectedElement &&
                            <div className='w-full sm:w-1/3'>
                                <PostDetails post={selectedElement} onClose={handleCloseDetails} isOwner={isOwner} onPostChanged={handlePostChanged}/>
                            </div>
                        }
                    </div>
                    <PaginationComponent handleNext={onNextPage} handlePrev={onPrevPage} hasPrev={pageNumber > 0}
                                         hasNext={pageNumber < totalPages - 1}/>
                </>
            )}
        </div>
    )
}