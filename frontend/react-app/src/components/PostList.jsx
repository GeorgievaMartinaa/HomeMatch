import {useEffect, useRef, useState} from "react";
import {PostCard} from "@/components/PostCard";
import {PaginationComponent} from "@/components/Pagination";
import PostDetails from "@/components/PostDetails";
import {Field} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {X} from "lucide-react";

export default function PostList() {
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedElement, setSelectedElement] = useState(null)
    const [filterText, setFilterText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedFilter, setDebouncedFilter] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('');


    const pageCache = useRef({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilter(filterText);
        }, 500);

        return () => clearTimeout(timer);
    }, [filterText]);

    useEffect(() => {
        const cacheKey = `${pageNumber}-${debouncedFilter}-${sortField}-${sortDirection}`;

        if (pageCache.current[cacheKey]) {
            setPosts(pageCache.current[cacheKey]);
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
            pageCache.current[cacheKey] = data.content;
            setPosts(data.content)
            setTotalPages(data.totalPages)

            setIsLoading(false)
        }

        fetchPosts();

    }, [pageNumber, debouncedFilter, sortField, sortDirection])

    const onNextPage = () => {
        setPageNumber(pageNumber + 1);
    }
    const onPrevPage = () => {
        setPageNumber(pageNumber - 1);
    }

    const handleCloseDetails = () => {
        setSelectedElement(null)
    }

    const handleFilterPosts = (event) =>{
        setPageNumber(0);
        setFilterText(event.target.value);
    }

    const handleRemoveSortDetails = () => {
        setSortField('');
        setSortDirection('');
    }


    return (
        <div className='flex flex-col gap-3'>
            <div className='w-1/3 ml-1 flex gap-5'>
                <div className='w-1/3'>
                    <Field>
                        <Input id="location" type="text" placeholder="Filter by location..." value={filterText}
                               onChange={handleFilterPosts}/>
                    </Field>
                </div>
                <div className='w-2/3 flex gap-2'>
                    <Field>
                        <Select value={sortField} onValueChange={setSortField}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by..." />
                            </SelectTrigger>
                            <SelectContent className=' bg-card'>
                                <SelectItem value="price">Price</SelectItem>
                                <SelectItem value="createdDate">Date</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field>
                        <Select value={sortDirection} onValueChange={setSortDirection} >
                            <SelectTrigger>
                                <SelectValue placeholder="Direction" />
                            </SelectTrigger>
                            <SelectContent className=' bg-card'>
                                <SelectItem value="ASC" >Ascending</SelectItem>
                                <SelectItem value="DESC" >Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                    <X className=' hover:text-accent cursor-pointer' onClick={handleRemoveSortDetails}/>
                </div>

            </div>
            <div className='flex gap-2'>
                <div className={`flex flex-wrap gap-2 ${selectedElement ? 'w-full sm:w-2/3' : 'w-full'}`}>
                    {posts.map(post => {
                        return <PostCard post={post} key={post.id} selectElement={setSelectedElement}/>
                    })}
                </div>
                {selectedElement &&
                <div className='w-full sm:w-1/3'>
                    <PostDetails post={selectedElement} onClose={handleCloseDetails}/>
                </div>
                }
            </div>
            <PaginationComponent handleNext={onNextPage} handlePrev={onPrevPage} hasPrev={pageNumber > 0}
                                 hasNext={pageNumber < totalPages - 1}/>
        </div>
    )
}