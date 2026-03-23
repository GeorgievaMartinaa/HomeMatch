import {useCallback, useContext, useEffect, useRef, useState} from "react";
import Header from "@/components/Header.jsx";
import PostList from "@/components/PostList.jsx";
import {AuthContext} from "@/context/authContext.jsx";
import UserDetails from '@/components/UserDetails.jsx'
import {getMyPosts} from "@/repository/PostRepository";
import {getCurrentUser} from "@/repository/UserRepository";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Field} from "@/components/ui/field";

export default function ProfilePage() {
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const pageCache = useRef({});
    const [postsVersion, setPostsVersion] = useState(0);
    const [categoryFilter, setCategoryFilter] = useState('');

    const {token} = useContext(AuthContext)

    useEffect(() => {
        const cacheKey = `${pageNumber}-${categoryFilter}`;

        if (pageCache.current[cacheKey]) {
            setPosts(pageCache.current[cacheKey].posts);
            setTotalPages(pageCache.current[cacheKey].totalPages);
            return;
        }

        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const data = await getMyPosts({pageNumber, pageSize: 12, category: categoryFilter}, token);
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

    }, [pageNumber, token, postsVersion, categoryFilter])

    useEffect(() => {
        const fetchUserDetails = async () => {
            setIsLoadingUserDetails(true)
            try {
                const data = await getCurrentUser(token);
                setUserDetails(data)
            } catch (error) {
                console.error(error.message)
            }
            setIsLoadingUserDetails(false)
        }

        fetchUserDetails()
    }, [token]);

    const refetchUserDetails = useCallback(async () => {
        try {
            const data = await getCurrentUser(token);
            setUserDetails(data)
        } catch (error) {
            console.error(error.message)
        }
    }, [token]);

    const changePageNumber = useCallback((newPageNumber) => {
        setPageNumber(newPageNumber)
    }, [])

  const postChanged = useCallback(() => {
    pageCache.current = {};
    setPostsVersion(v => v + 1)
  },[])

    return (
        <div className='flex flex-col gap-5'>
            <Header page='home'/>
            <div className='px-8 flex text-start flex-col gap-4'>
                <UserDetails data={userDetails} isLoading={isLoadingUserDetails} onUserUpdated={refetchUserDetails} canEdit={true} title="Податоци за тебе"/>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pl-5 w-full">
                    <h3 className="font-bold text-xl text-accent w-full lg:w-1/4">Твои постови</h3>
                    <Field className="w-full lg:w-1/6 pr-5">
                        <Select value={categoryFilter || "ALL"} onValueChange={(value) => {
                            setCategoryFilter(value === "ALL" ? "" : value);
                            setPageNumber(0);
                            pageCache.current = {};
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Категорија..."/>
                            </SelectTrigger>
                            <SelectContent position="popper" className="bg-card">
                                <SelectItem value="ALL">Сите</SelectItem>
                                <SelectItem value="RENT">Издавање</SelectItem>
                                <SelectItem value="SELL">Продажба</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
                <PostList pageNumber={pageNumber} setPageNumber={changePageNumber} posts={posts}
                          isLoading={isLoading} totalPages={totalPages} isOwner onPostChanged={postChanged}/>
            </div>
        </div>
    )
}