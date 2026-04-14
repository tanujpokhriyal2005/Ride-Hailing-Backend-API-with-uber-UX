import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'


function UserLogin() {
    const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      alert(error.response?.data?.error || 'Login failed')
    }

    setEmail('')
    setPassword('')
  }

    return (
        <div className='min-h-screen flex flex-col bg-white'>
            <div className='px-7'>
                <div className='max-w-md w-full mx-auto'>
                    <img className='w-16 mb-10 mt-7' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/500px-Uber_logo_2018.svg.png" alt="Uber logo" />
                    <form onSubmit={submitHandler}>
                        <h3 className='text-lg font-medium mb-2'>What's your Email Ladle?</h3>
                        <input 
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                            required 
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            type="email" 
                            placeholder='tanuj@email.com'
                        />
                        
                        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                        <input
                            className='bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base'
                            required
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            type="password" 
                            placeholder='password' />

                        <div className="flex justify-center">
                            <button className="bg-black text-white py-2 px-4 rounded mt-5">
                                Login
                            </button>
                        </div>

                        <p className='text-center mt-4'>New here? <Link className='text-blue-600' to="/signup">Sign up</Link></p>
                    </form>

                    <Link to='/captain-login'
                        className='flex items-center justify-center bg-[#aba4a4] font-medium text-black py-2 px-4 rounded mt-5 w-full'>
                        Sign in as Captain
                    </Link>
                </div>
            </div>

            <div className='relative w-full h-48 mt-24 overflow-hidden'>
                <div
                    className='absolute inset-0 bg-cover bg-center'
                    style={{
                        backgroundImage: "url('https://www.shutterstock.com/image-vector/seamless-pattern-abstract-geometric-shapes-600nw-2302432117.jpg')"
                    }}
                />
                <div className='absolute inset-0 bg-white/20' />
            </div>
        </div>
    )
}

export default UserLogin
