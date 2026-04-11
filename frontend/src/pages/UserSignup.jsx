import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import UserContext from '../context/UserContext'

function UserSignup() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [userData,setUserData] = useState({})

    const submitHandler = (e)=>{
        e.preventDefault();
        setUserData({
            fullName:{
                firstName: firstname,
                lastName: lastname
            },
            email: email,
            password: password
        })
        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
    }


    return (
        <div className='min-h-screen flex flex-col justify-between p-7'>
            <div>
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/500px-Uber_logo_2018.svg.png" alt="" />
                <form onSubmit={(e)=>submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>What's your Name?</h3>
                    <div className='flex gap-2'>
                        <input 
                        className='bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 text-lg placeholder:text-base'
                        required
                        type="text" 
                        placeholder='First name'
                        value={firstname}
                        onChange={(e)=>{
                            setFirstname(e.target.value)
                        }}
                        />
                        <input 
                        className='bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 text-lg placeholder:text-base'
                        required
                        type="text" 
                        placeholder='Last name'
                        value={lastname}
                        onChange={(e)=>{
                            setLastname(e.target.value)
                        }}
                        />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>Your Email?</h3>
                    <input 
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                    required
                    type="email" 
                    placeholder='tanuj@email.com'
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                     />
                    
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    
                    <input
                    className='bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base'
                    required
                    
                    type="password" 
                    placeholder='password' 
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    />

                    <div className="flex justify-center">
                      <button className="bg-black text-white py-2 px-4 rounded mt-5">
                        SignUp
                      </button>
                    </div>

                </form>
            </div>

            <p className='text-xs text-center'>You may see ads while you use your <span className='underline'>Uber app</span> , such as after requesting a trip or when considering your next delivery. Uber also displays ads on non-Uber sites, apps, and platforms, either for itself or its advertising clients.</p>
        </div>

    )
}

export default UserSignup
