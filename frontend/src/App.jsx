import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from '../src/pages/Start'
import UserSignup from '../../../../Uber/frontend/src/pages/UserSignup'
import UserLogin from '../../../../Uber/frontend/src/pages/UserLogin'
import CaptainLogin from '../../../../Uber/frontend/src/pages/CaptainLogin'
import CaptainSignup from '../../../../Uber/frontend/src/pages/CaptainSignup'
import Home from '../src/pages/Home'
import UserProtectWrapper from '../../../../Uber/frontend/src/pages/UserProtectWrapper'
import UserContext from '../../../../Uber/frontend/src/context/UserContext'
import CaptainContext from '../../../../Uber/frontend/src/context/CaptainContext'

import UserLogout from '../../../../Uber/frontend/src/pages/UserLogout'
import CaptainHome from '../../../../Uber/frontend/src/pages/CaptainHome'


function App() {
  return (
    <UserContext>
      <CaptainContext>
        <div>
          <Routes>
          <Route path="/" element={<Start />}/>
          <Route path="/login" element={<UserLogin />}/>
          <Route path="/signup" element={<UserSignup />}/>
          <Route path="/captain-login" element={<CaptainLogin />}/>
          <Route path="/captain-signup" element={<CaptainSignup />}/>
          <Route path="/home" element={<UserProtectWrapper><Home /></UserProtectWrapper>}/>
          <Route path="/logout" element={<UserLogout />}/>
          <Route path='/captain-home' element={<CaptainHome />} />
          </Routes>
        </div>
      </CaptainContext>
    </UserContext>
  )

}

export default App
