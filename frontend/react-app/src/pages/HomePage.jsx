import Header from '../components/Header.jsx'
import PostList from '../components/PostList.jsx'
import SortAndFilter from "@/components/SortAndFilter.jsx";
import { useCallback, useEffect, useRef, useState } from "react"
import {getAllPosts} from "@/repository/PostRepository";

export default function HomePage() {
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [debouncedFilter, setDebouncedFilter] = useState('');
    const [sortValue, setSortValue] = useState("createdDate DESC");
    const [isLoading, setIsLoading] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('');

    const [sortField, sortDirection] = sortValue.split(" ");
    const pageCache = useRef({});


    useEffect(() => {
        const cacheKey = `${pageNumber}-${debouncedFilter}-${sortField}-${sortDirection}-${categoryFilter}`;

        if (pageCache.current[cacheKey]) {
            setPosts(pageCache.current[cacheKey].posts);
            setTotalPages(pageCache.current[cacheKey].totalPages);
            return;
        }

        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const data = await getAllPosts({
                    pageNumber, pageSize: 12, location: debouncedFilter,
                    sortBy: sortField, direction: sortDirection, category: categoryFilter
                });
                pageCache.current[cacheKey] = {
                    posts: data.content,
                    totalPages: data.totalPages
                };
                setPosts(data.content)
                setTotalPages(data.totalPages)
            } catch (error) {
                console.error(error.message)
            }
            setIsLoading(false)
        }

        fetchPosts();

    }, [pageNumber, debouncedFilter, sortField, sortDirection, categoryFilter])

  const changeCategoryFilter = useCallback((newValue) => setCategoryFilter(newValue), [])

   return (
        <div className='flex flex-col gap-5'>
            <Header page='home'/>
            <div className='flex flex-col gap-3 px-8'>

                <SortAndFilter setPageNumber={setPageNumber} setDebouncedFilter={setDebouncedFilter}
                               setSortValue={setSortValue} sortValue={sortValue}
                               setCategoryFilter={changeCategoryFilter} categoryFilter={categoryFilter}/>
                <PostList pageNumber={pageNumber} setPageNumber={setPageNumber} posts={posts}
                          isLoading={isLoading} totalPages={totalPages}/>
            </div>
        </div>
    )
}