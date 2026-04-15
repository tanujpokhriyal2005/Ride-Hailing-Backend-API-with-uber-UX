import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'


function Home() {
    // All hooks must be called at the top level, in the same order every render
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const vehiclePanelRef = useRef(null)

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

    useGSAP(function(){
        if(vehiclePanel){
            gsap.to(vehiclePanelRef.current,{
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            })
        }else{
            gsap.to(vehiclePanelRef.current,{
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
        }
    }, [vehiclePanel])


    const submitHandler = (e) => {
        e.preventDefault()
    }


    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='h-screen w-screen'>
                {/* image for temporary use */}
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
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
                <div ref={panelRef} className=' bg-white h-0'>
                        <LocationSearchPanel setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen} />
                </div>
            </div>
            <div ref={vehiclePanelRef} className={`fixed w-full z-30 bottom-0 bg-white px-3 rounded-t-3xl max-h-80 overflow-y-auto shadow-2xl transition-all duration-300 ease-in-out ${vehiclePanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                <h5 onClick={()=>{
                    setVehiclePanel(false)
                }} className='p-3 text-center absolute top-0 right-0'><i className="ri-arrow-down-double-line"></i></h5>
                <h3 className='text-xl font-semibold mb-5 p-2'>Choose a Vehicle</h3>
                <div className=' flex active:border-2 border-black mb-2 rounded-xl p-2 w-full  items-center justify-between'>
                    <img className='h-11 px-4' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="" />
                    <div className=' text-xs'>
                        <h4 className='font-medium text-base'>Bike <span><i className="ri-user-fill"></i></span>2</h4>
                        <h5>5mins away</h5>
                        <p className='text-gray-600 font-medium'>fast motorcycle rides</p>
                    </div>
                    <h2 className='font-semibold '>₹78.45</h2>
                </div>
                <div className='flex active:border-2 border-black mb-2 rounded-xl p-2 w-full  items-center justify-between'>
                    <img className='h-17' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iY2Q4ZmRmOC0yYjM0LTUyZGUtYmM3Zi1mNDFmMDgwNTliY2MucG5n" alt="" />
                    <div className=' text-xs'>
                        <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i></span>4</h4>
                        <h5>2mins away</h5>
                        <p className='text-gray-600 font-medium'>affordable,compact rides</p>
                    </div>
                    <h2 className='font-semibold '>₹193.20</h2>
                </div>
                <div className='flex active:border-2 border-black mb-2 rounded-xl p-2 w-full  items-center justify-between'>
                    <img className='h-12' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
                    <div className=' text-xs'>
                        <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-fill"></i></span>4</h4>
                        <h5>2mins away</h5>
                        <p className='text-gray-600 font-medium'>cheap, reliable rides</p>
                    </div>
                    <h2 className='font-semibold '>₹128.47</h2>
                </div>
            </div>
                          

        </div>
    )
}

export default Home
