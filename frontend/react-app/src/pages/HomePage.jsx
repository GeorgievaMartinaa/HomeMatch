import Header from '../components/Header.jsx'
import PostList from '../components/PostList.jsx'

export default function HomePage() {
    return (<div className='shadow-xl bg-gradient-to-b from-black/10 to-black/30 h-full  max-w-3/4 mx-auto text-center'>
        <Header/>
        <PostList/>
    </div>)
}