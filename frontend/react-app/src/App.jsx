import './App.css'
import LoginPage from "@/pages/auth/LoginPage";
import { Navigate, Route, Routes } from 'react-router';
import { ProtectedRoute } from '@/ProtectedRoute.jsx'
import RegisterPage from '@/pages/auth/RegisterPage.jsx'

function App() {
 return (
   <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path={'/'}><h1>Hello user</h1></Route>
    </Route>
    <Route path={'login'} element={<LoginPage />} />
    <Route path={'register'} element={<RegisterPage />} />
   </Routes>
  )
}

export default App
