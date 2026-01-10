import {useEffect, useRef, useState} from "react";
import {PostCard} from "@/components/PostCard";
import {PaginationComponent} from "@/components/Pagination";
import {PostDetailsModal} from "@/components/PostDetailsModal";

export default function PostList() {
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pageCache = useRef({});

    useEffect(() => {

        if (pageCache.current[pageNumber]) {
            setPosts(pageCache.current[pageNumber]);
            return;
        }

        const baseUrl = 'http://localhost:8080/api/v1/post';
        const params = new URLSearchParams({
            pageNumber: pageNumber,
            pageSize: 12,
        });

        const fetchPosts = async () => {
            const response = await fetch(`${baseUrl}?${params.toString()}`, {
                method: "GET",
            })

            if (!response.ok) {
                console.log("Error fetch posts")
                return;
            }
            const data = await response.json();
            pageCache.current[pageNumber] = data.content;
            setPosts(data.content)
            setTotalPages(data.totalPages)
        }

        fetchPosts();

    }, [pageNumber])

    const onNextPage = () => {
        setPageNumber(pageNumber + 1);
    }
    const onPrevPage = () => {
        setPageNumber(pageNumber - 1);

    }

    const fetchPostById = async (postId) => {
        const response = await fetch(`http://localhost:8080/api/v1/post/${postId}`, {
            method: "GET"
        })

        if (!response.ok) {
            console.log("Error fetch post details")
            return;
        }
        const data = await response.json();
        console.log(data)
        setSelectedPost(data)
    }

    const onPostClick = (postId) => {
        console.log("Post details ", postId)

        fetchPostById(postId)

        setIsModalOpen(true)
    }

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {posts.map(post => {
                    return <PostCard post={post} key={post.id} handlePostDetails={() => onPostClick(post.id)}/>
                })}
                <PaginationComponent handleNext={onNextPage} handlePrev={onPrevPage} hasPrev={pageNumber > 0}
                                     hasNext={pageNumber < totalPages - 1}/>
            </div>
            {isModalOpen && selectedPost &&
            <PostDetailsModal open={isModalOpen} post={selectedPost} onOpenChange={() => {
                setIsModalOpen(false);
                setSelectedPost(null);
            }}/>}
        </>
    )
}