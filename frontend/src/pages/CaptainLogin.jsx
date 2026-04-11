import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'


function Captainlogin() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [captainData,setCaptainData] = useState({})

    
    
        const submitHandler = (e)=>{
            e.preventDefault();
            setCaptainData({
                email: email,
                password: password
            })
            setEmail('')
            setPassword('')
        }

    return (
        <div
            className='relative min-h-screen flex flex-col bg-center bg-no-repeat'
            style={{
                backgroundImage: "url('https://media.istockphoto.com/id/1691014600/vector/seamless-luxury-foliate-vector-pattern.jpg?s=612x612&w=0&k=20&c=RbDkzC56enDH89tNhw8W_j8dZDK9GkjUia6Vp1czbM0=')",
                backgroundSize: 'auto 100%',
            }}
        >
            <div className='absolute inset-0 bg-white/90' />
            <div className='relative px-7'>
                <div className='max-w-md w-full mx-auto'>
                    <img className='w-16 mb-10 mt-6' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s" alt="Uber logo" />
                    <form onSubmit={submitHandler}>
                        <h3 className='text-lg font-medium mb-2'>Heyy Captain! What's your Email?</h3>
                        <input 
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                            required 
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            type="email" 
                            placeholder='tanuj@email.com'
                         />
                        
                        <h3 className='text-lg font-medium mb-2'>Password?</h3>
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

                        <p className='text-center mt-4'>Want to join a fleet? <Link className='text-blue-600' to="/captain-signup">Register as captain</Link></p>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Captainlogin
