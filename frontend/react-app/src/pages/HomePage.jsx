import Header from '../components/Header.jsx'
import PostList from '../components/PostList.jsx'
import SortAndFilter from "@/components/SortAndFilter.jsx";
import {useEffect, useRef, useState} from "react";

export default function HomePage() {
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [debouncedFilter, setDebouncedFilter] = useState('');
    const [sortValue, setSortValue] = useState("createdDate DESC");
    const [isLoading, setIsLoading] = useState(false);


    const [sortField, sortDirection] = sortValue.split(" ");
    const pageCache = useRef({});


    useEffect(() => {
        const cacheKey = `${pageNumber}-${debouncedFilter}-${sortField}-${sortDirection}`;

        if (pageCache.current[cacheKey]) {
            setPosts(pageCache.current[cacheKey].posts);
            setTotalPages(pageCache.current[cacheKey].totalPages);
            return;
        }

        const baseUrl = 'http://localhost:8080/api/v1/post';
        const params = new URLSearchParams({
            pageNumber: pageNumber,
            pageSize: 12,
            location: debouncedFilter,
            sortBy: sortField,
            direction: sortDirection
        });

        const fetchPosts = async () => {
            setIsLoading(true);

            const response = await fetch(`${baseUrl}?${params.toString()}`, {
                method: "GET",
            })

            if (!response.ok) {
                console.log("Error fetch posts")
                return;
            }
            const data = await response.json();
            pageCache.current[cacheKey] = {
                posts: data.content,
                totalPages: data.totalPages
            };
            setPosts(data.content)
            setTotalPages(data.totalPages)

            setIsLoading(false)
        }

        fetchPosts();

    }, [pageNumber, debouncedFilter, sortField, sortDirection])

    return (<div className='flex flex-col gap-5'>
        <Header page='home'/>
        <div className='flex flex-col gap-3 px-[2rem]'>

            <SortAndFilter setPageNumber={setPageNumber} setDebouncedFilter={setDebouncedFilter}
                           setSortValue={setSortValue} sortValue={sortValue}/>
            <PostList pageNumber={pageNumber} setPageNumber={setPageNumber} posts={posts}
                      isLoading={isLoading} totalPages={totalPages}/>
        </div>
    </div>)
}