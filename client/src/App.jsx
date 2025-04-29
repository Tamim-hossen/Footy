import React, { useEffect } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import Pitches from './pages/Pitches.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import Matches from './pages/Matches.jsx'
import ExtraTime from './pages/ExtraTime.jsx'
import SkyTurf from './pages/SkyTurf.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { useThemeStore } from './store/useThemeStore.js'
import { useAuthStore } from './store/useAuthStore.js'
function App() {
  const{theme} = useThemeStore()
  const{authUser,checkAuth} = useAuthStore()
  useEffect( ()=>{
    checkAuth()
  },[])
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',theme)
  },[theme])
  return(
    <div>
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/pitches' element={<Pitches/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/matches' element={<Matches/>}/>
        <Route path='/sky-turf' element={<SkyTurf/>}/>
        <Route path='/xtra-time' element={<ExtraTime/>}/>
        <Route path='/admin' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App