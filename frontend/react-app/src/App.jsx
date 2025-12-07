import './App.css'
import LoginPage from "@/pages/auth/LoginPage";
import {Navigate, Route, Routes} from 'react-router';
import {ProtectedRoute} from '@/ProtectedRoute.jsx'
import RegisterPage from '@/pages/auth/RegisterPage.jsx'
import RegistrationSuccess from "@/pages/auth/RegistrationSuccess";

function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoute/>}>
                <Route path={'/'} element={<h1>Hello user</h1>}/>
            </Route>
            <Route path={'login'} element={<LoginPage/>}/>
            <Route path={'register'} element={<RegisterPage/>}/>
            <Route path={'/success_registration'} element={<RegistrationSuccess/>}/>
        </Routes>
    )
}

export default App
