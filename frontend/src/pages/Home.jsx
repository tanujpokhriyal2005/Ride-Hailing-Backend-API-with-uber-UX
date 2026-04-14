import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'



function Home() {
    // All hooks must be called at the top level, in the same order every render
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)

    // useGSAP must be called at the top level before any conditional logic
    useGSAP(function(){
        if(panelOpen){
            gsap.to(panelRef.current,{
                height: '70%',
            })
            gsap.to(panelCloseRef.current,{
                rotate: '0deg',
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current,{
                height: '0%',
            })
            gsap.to(panelCloseRef.current,{
                rotate: '180deg',
                opacity: 0
            })
        }
    }, [panelOpen])

    const submitHandler = (e) => {
        e.preventDefault()
    }


    return (
        <div className='h-screen relative'>
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='h-screen w-screen'>
                {/* image for temporary use */}
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='bg-white flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-6 bg-white relative'>
                    <h5 ref={panelCloseRef} onClick={()=>{
                        setPanelOpen(false)
                    }} className='absolute opacity-0 top-3 right-2 text-xl'>
                        <i className="ri-arrow-down-double-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold px-2'>Find a Trip</h4>
                    <form onSubmit={(e)=>{
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-15 w-0.75 top-[39%] left-10 bg-gray-700 rounded-full"></div>
                        <input
                        onClick={()=>{
                            setPanelOpen(true)
                        }}
                        value={pickup}
                        onChange={(e)=>{
                            setPickup(e.target.value)
                        }}
                        className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3 mb-2' 
                        type="text" 
                        placeholder='Enter Pickup Location' 
                        />
                        <input 
                        onClick={()=>{
                            setPanelOpen(true)
                        }}
                        value={destination}
                        onChange={(e)=>{
                            setDestination(e.target.value)
                        }}
                        className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-2' 
                        type="text" 
                        placeholder='Enter your destination' 
                        />
                    </form>
                </div>
                <div ref={panelRef} className=' bg-red-500 h-0'>

                </div>
            </div>
        </div>
    )
}

export default Home
