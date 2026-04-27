import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectorWrapper from './pages/UserProtectorWrapper'
import UserContext from './context/UserContext'
import CaptainContext from './context/CaptainContext'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import LookingForDriver from './components/LookingForDriver'
import WaitingForDriver from './components/WaitingForDriver'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'


function App() {
  return (
    <UserContext>
      <CaptainContext>
        <div>
          <Routes>
          <Route path="/" element={<Start />}/>
          <Route path="/login" element={<UserLogin />}/>
          <Route path="/riding" element={<Riding />}/>
          <Route path="/signup" element={<UserSignup />}/>
          <Route path="/captain-login" element={<CaptainLogin />}/>
          <Route path="/captain-signup" element={<CaptainSignup />}/>
          <Route path="/home" element={<UserProtectorWrapper><Home /></UserProtectorWrapper>}/>
          <Route path="/logout" element={<UserLogout />}/>
          <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>} />
          <Route path='/captain-riding' element={<CaptainProtectWrapper><CaptainRiding /></CaptainProtectWrapper>} />
          </Routes>
        </div>
      </CaptainContext>
    </UserContext>
  )

}

export default App
