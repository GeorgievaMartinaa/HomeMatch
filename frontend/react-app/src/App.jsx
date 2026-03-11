import './App.css'
import LoginPage from "@/pages/auth/LoginPage";
import { Route, Routes} from 'react-router';
import {ProtectedRoute} from '@/ProtectedRoute.jsx'
import RegisterPage from '@/pages/auth/RegisterPage.jsx'
import RegistrationSuccess from "@/pages/auth/RegistrationSuccess";
import HomePage from "@/pages/HomePage";
import CreatePostPage from "@/pages/CreatePostPage";

function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoute/>}>
                <Route path={'profile'} element={<div>Profile page</div>}/>
            </Route>
            <Route path={'login'} element={<LoginPage/>}/>
            <Route path={'register'} element={<RegisterPage/>}/>
            <Route path={'/success_registration'} element={<RegistrationSuccess/>}/>
            <Route path={'/create_post'} element={<CreatePostPage/>}/>
            <Route path={'/'} element={<HomePage/>}/>
        </Routes>
    )
}

export default App
