import Header from '../components/Header.jsx'
import PostList from '../components/PostList.jsx'

export default function HomePage() {
    return (<div className='flex flex-col gap-5'>
        <Header page='home'/>
        <PostList/>
    </div>)
}