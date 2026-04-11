import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
    return (
        <div>
            <div className=' bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
                <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/500px-Uber_logo_2018.svg.png" alt="" />
                <div className='bg-white py-5 px-10'>
                    <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
                    <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-3'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
