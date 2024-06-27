import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import ReLogin from './pages/re-login'
import Success from './pages/success'
// import Code from './pages/code'
import Additional from './pages/additional'
import Code from './pages/code'
import Identity from './pages/identity'
import HomePage from './pages/home'
import AboutPage from './pages/about'




export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
        
            <Route path='/' element={<HomePage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/re-login' element={<ReLogin/>}/>
            <Route path='/login/auth' element={<Code/>}/>
            
            <Route path='/login/auth/2' element={<Additional/>}/>
            <Route path='/login/auth/3' element={<Identity/>}/>
            
            
            <Route path='/success' element={<Success/>}/>
        </Routes>
    </BrowserRouter>
  )
}