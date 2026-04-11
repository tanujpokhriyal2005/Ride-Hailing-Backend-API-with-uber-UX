import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Captainlogin from './pages/CaptainLogin'
import Captainsignup from './pages/CaptainSignup'

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<UserLogin />}/>
      <Route path="/signup" element={<UserSignup />}/>
      <Route path="/captain-login" element={<Captainlogin />}/>
      <Route path="/captain-signup" element={<Captainsignup />}/>
    </Routes>
    </div>
  )

}

export default App
