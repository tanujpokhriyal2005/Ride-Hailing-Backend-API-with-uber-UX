import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup.jsx'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopup.jsx'

function CaptainHome() {
    const [ridePopupPanel, setRidePopupPanel] = useState(true)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
    const ridePopupPanelRef = React.useRef(null)
    const confirmRidePopupPanelRef = React.useRef(null)


    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
        }
    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
        }
    }, [confirmRidePopupPanel])

    return (
        <div className='h-screen overflow-hidden'>

            <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to="/home" className='p-6 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="ri-logout-box-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-1/2 p-4'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className={`fixed w-full z-30 bottom-0 bg-white px-3 rounded-t-3xl max-h-150 shadow-2xl transition-all duration-300 ease-in-out ${ridePopupPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                <RidePopup 
                setRidePopupPanel={setRidePopupPanel} 
                setConfirmRidePopupPanel = {setConfirmRidePopupPanel}/>
            </div>
            <div ref={confirmRidePopupPanelRef} className={`fixed w-full z-40 bottom-0 bg-white px-3 rounded-t-3xl max-h-150 shadow-2xl transition-all duration-300 ease-in-out ${confirmRidePopupPanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
               <ConfirmRidePopUp 
               setConfirmRidePopupPanel = {setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} /> 
            </div>
        </div>
    )
}

export default CaptainHome
