import {useContext, useEffect, useRef, useState} from "react";
import Header from "@/components/Header.jsx";
import PostList from "@/components/PostList.jsx";
import {AuthContext} from "@/context/authContext.jsx";
import UserDetails from "@/components/UserDetails.jsx";

export default function ProfilePage(){
    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const pageCache = useRef({});

    const {token} = useContext(AuthContext)

    useEffect(() => {
        const cacheKey = `${pageNumber}`;

        if (pageCache.current[cacheKey]) {
            setPosts(pageCache.current[cacheKey].posts);
            setTotalPages(pageCache.current[cacheKey].totalPages);
            return;
        }

        const baseUrl = 'http://localhost:8080/api/v1/post/my';
        const params = new URLSearchParams({
            pageNumber: pageNumber,
            pageSize: 12,
        });

        const fetchPosts = async () => {
            setIsLoading(true);

            const response = await fetch(`${baseUrl}?${params.toString()}`, {
                method: "GET",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })

            if (!response.ok) {
                console.log("Error fetch posts TEXT: ", response.text())
                console.log("Error fetch posts JSON: ", response.json())
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

    }, [pageNumber])

    useEffect(() => {
        const fetchUserDetails  = async () => {
            setIsLoadingUserDetails(true)
            console.log("TOKEN:: ",token)

            const response = await fetch('http://localhost:8080/api/v1/user', {
                method: "GET",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })

            if (!response.ok) {
                console.log("Error fetch posts TEXT: ", response.text())
                console.log("Error fetch posts JSON: ", response.json())
                return;
            }
            const data = await response.json();
            console.log("DATA USER: " , data)
            setUserDetails(data)

            setIsLoadingUserDetails(false)
        }

        fetchUserDetails()
    }, [token]);
    console.log("USER DETAILS: ",userDetails)

    return (
        <div className='flex flex-col gap-5'>
            <Header page='home'/>
            <div className='px-8'>
                <UserDetails data={userDetails}/>
                <PostList pageNumber={pageNumber} setPageNumber={setPageNumber} posts={posts}
                          isLoading={isLoading} totalPages={totalPages}/>
            </div>
        </div>
    )
}