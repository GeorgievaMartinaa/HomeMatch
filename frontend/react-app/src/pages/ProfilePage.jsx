import {useCallback, useContext, useEffect, useRef, useState} from "react";
import Header from "@/components/Header.jsx";
import PostList from "@/components/PostList.jsx";
import {AuthContext} from "@/context/authContext.jsx";
import UserDetails from '@/components/UserDetails.jsx'
import {getMyPosts} from "@/repository/PostRepository";
import {getCurrentUser} from "@/repository/UserRepository";

export default function ProfilePage() {
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const pageCache = useRef({});
    const [postsVersion, setPostsVersion] = useState(0);

    const {token} = useContext(AuthContext)

    useEffect(() => {
        const cacheKey = `${pageNumber}`;

        if (pageCache.current[cacheKey]) {
            setPosts(pageCache.current[cacheKey].posts);
            setTotalPages(pageCache.current[cacheKey].totalPages);
            return;
        }

        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const data = await getMyPosts({pageNumber, pageSize: 12}, token);
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

    }, [pageNumber, token, postsVersion])

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
                <UserDetails data={userDetails} isLoading={isLoadingUserDetails} onUserUpdated={refetchUserDetails} canEdit={true}/>
                <h3 className="font-bold text-xl text-accent pl-5">Мои постови</h3>
                <PostList pageNumber={pageNumber} setPageNumber={changePageNumber} posts={posts}
                          isLoading={isLoading} totalPages={totalPages} isOwner onPostChanged={postChanged}/>
            </div>
        </div>
    )
}