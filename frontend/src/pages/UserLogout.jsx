import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('token')
    navigate('/login')
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold mb-2">Logging out...</h1>
        <p className="text-gray-600">You are being redirected to login.</p>
      </div>
    </div>
  )
}

export default UserLogout
