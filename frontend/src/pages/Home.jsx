import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

function Home() {
    // All hooks must be called at the top level, in the same order every render
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const vehiclePanelRef = useRef(null)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const confirmRidePanelRef = useRef(null)
    const [vehicleFound, setVehicleFound] = useState(false)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [activeField, setActiveField] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [fare, setFare] = useState(null)
    const [vehicleType, setVehicleType] = useState(null)


    const fetchSuggestions = async (input) => {
        if (input.length < 3) {
            setSuggestions([])
            return
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setSuggestions(response.data.suggestions || [])
        } catch (error) {
            console.error('Error fetching suggestions:', error)
            setSuggestions([])
        }
    }

    const setLocation = (location) => {
        if (activeField === 'pickup') {
            setPickup(location.description)
        } else if (activeField === 'destination') {
            setDestination(location.description)
        }
        setSuggestions([])
    }

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



    useGSAP(function(){
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current,{
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            })
        }else{
            gsap.to(confirmRidePanelRef.current,{
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
        }
    }, [confirmRidePanel])

    useGSAP(function(){
        if(vehicleFoundRef.current){
            gsap.to(vehicleFoundRef.current,{
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            })
        }else{
            gsap.to(vehicleFoundRef.current,{
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
        }
    }, [vehicleFoundRef])

    useGSAP(function(){
        if(waitingForDriver.current){
            gsap.to(waitingForDriverRef.current,{
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            })
        }else{
            gsap.to(waitingForDriverRef.current,{
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
        }
    }, [waitingForDriver])

    async function findTrip(){
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params:{pickup, destination},
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setFare(response.data.fare)
    }

    async function createRide(){
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType

        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data)
    }








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
                <div className='h-[40%] p-6 bg-white relative'>
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
                            setActiveField('pickup')
                            setPanelOpen(true)
                        }}
                        value={pickup}
                        onChange={(e)=>{
                            setPickup(e.target.value)
                            fetchSuggestions(e.target.value)
                        }}
                        className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3 mb-2' 
                        type="text" 
                        placeholder='Enter Pickup Location' 
                        />
                        <input 
                        onClick={()=>{
                            setActiveField('destination')
                            setPanelOpen(true)
                        }}
                        value={destination}
                        onChange={(e)=>{
                            setDestination(e.target.value)
                            fetchSuggestions(e.target.value)
                        }}
                        className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-2' 
                        type="text" 
                        placeholder='Enter your destination' 
                        />
                    </form>
                    <button className='w-full mt-2' onClick={findTrip}>
                        <div className='w-full bg-black text-white rounded-2xl p-3 font-semibold text-center'>
                            Search Rides
                        </div>
                    </button>
                </div>
                <div ref={panelRef} className=' bg-white h-0'>
                        <LocationSearchPanel suggestions={suggestions} activeField={activeField} setLocation={setLocation} setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen} />
                </div>
            </div>
            <div ref={vehiclePanelRef} className={`fixed w-full z-30 bottom-0 bg-white px-3 rounded-t-3xl max-h-80 overflow-y-auto shadow-2xl transition-all duration-300 ease-in-out ${vehiclePanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                <VehiclePanel 
                selectVehicle={setVehicleType}
                fare={fare} 
                setConfirmRidePanel={setConfirmRidePanel} 
                setVehiclePanel={setVehiclePanel} />
            </div>
            <div ref={confirmRidePanelRef} className={`fixed w-full z-10 bottom-0 bg-white px-3 rounded-t-3xl shadow-2xl transition-all duration-300 ease-in-out ${confirmRidePanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                <ConfirmRide
                pickup={pickup} 
                destination={destination}
                createRide={createRide} 
                vehicleType={vehicleType} 
                fare={fare}
                setConfirmRidePanel={setConfirmRidePanel} 
                setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className={`fixed w-full z-10 bottom-0 bg-white px-3 rounded-t-3xl shadow-2xl transition-all duration-300 ease-in-out ${vehicleFound ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                <LookingForDriver 
                fare={fare}
                vehicleType={vehicleType} 
                pickup={pickup} 
                destination={destination}
                setVehicleFound={setVehicleFound}/>
            </div>
            <div ref={waitingForDriverRef} className={`fixed w-full z-10 bottom-0 bg-white px-3 rounded-t-3xl shadow-2xl transition-all duration-300 ease-in-out ${vehicleFound ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                <WaitingForDriver waitingForDriver={waitingForDriver} />
            </div>
                          

        </div>
    )
}

export default Home
