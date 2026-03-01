import {useEffect, useRef, useState} from "react";
import {PostCard} from "@/components/PostCard";
import {PaginationComponent} from "@/components/Pagination";
import PostDetails from "@/components/PostDetails";
import {Field} from "@/components/ui/field";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ArrowDown, ArrowUp, X} from "lucide-react";
import {Spinner} from "@/components/ui/spinner";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";

export default function PostList() {
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedElement, setSelectedElement] = useState(null)
    const [filterText, setFilterText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedFilter, setDebouncedFilter] = useState('');
    const [sortValue, setSortValue] = useState("createdDate DESC");

    const [sortField, sortDirection] = sortValue.split(" ");
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

    const onNextPage = () => {
        setPageNumber(pageNumber + 1);
    }
    const onPrevPage = () => {
        setPageNumber(pageNumber - 1);
    }

    const handleCloseDetails = () => {
        setSelectedElement(null)
    }

    const handleFilterPosts = (event) => {
        setPageNumber(0);
        setFilterText(event.target.value);
    }

    const handleRemoveFilterText = () => {
        setFilterText('');
        setPageNumber(0);
    }

    const handleSortPosts = (value) => {
        setSortValue(value);
        setPageNumber(0);
    }


    return (
        <div className='flex flex-col gap-3 px-[2rem]'>
            <div className='w-1/4 ml-1 flex gap-5'>
                <div className='w-2/3'>
                    <InputGroup>
                        <InputGroupInput type="text" placeholder="Filter by location..." value={filterText}
                                         onChange={handleFilterPosts}/>
                        {filterText && (
                            <InputGroupAddon>
                                <X className='hover:text-accent cursor-pointer' onClick={handleRemoveFilterText}/>
                            </InputGroupAddon>
                        )}

                    </InputGroup>
                    {/*</Field>*/}
                </div>
                <div className='w-1/3 flex gap-2'>
                    <Field>
                        <Select value={sortValue} onValueChange={handleSortPosts}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by..."/>
                            </SelectTrigger>
                            <SelectContent className=' bg-card'>
                                <SelectItem value="price ASC">Price <ArrowUp/> </SelectItem>
                                <SelectItem value="price DESC">Price <ArrowDown/> </SelectItem>
                                <SelectItem value="createdDate ASC">Date <ArrowUp/></SelectItem>
                                <SelectItem value="createdDate DESC">Date <ArrowDown/></SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                    {/*<X className=' hover:text-accent cursor-pointer' onClick={handleRemoveSortDetails}/>*/}
                </div>

            </div>
            {isLoading ? (<div className=' h-screen flex justify-center items-center'>
                <Spinner className="size-8"/>
            </div>) : (
                <>
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
                </>
            )}
        </div>
    )
}