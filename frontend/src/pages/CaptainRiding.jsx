import React from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'

function CaptainRiding() {

    const [finishRidePanel, setFinishRidePanel] = React.useState(false)
    const finishRidePanelRef = React.useRef(null)


    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen overflow-hidden'>

            <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to="/captain-home" className='p-6 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="ri-logout-box-line"></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-1/5 flex items-center justify-between'>
                 <h3 className='text-2xl font-semibold px-1 mb-5'>Riding to Destination </h3>
                 <button className=' w-full bg-green-700 text-white font-semibold p-3 rounded-lg mt-4' onClick={() => setFinishRidePanel(true)}>Ride Complete</button>
            </div>
            <div ref={finishRidePanelRef}
                className={`fixed w-full z-40 bottom-0 bg-white px-3 h-screen rounded-t-3xl max-h-150 shadow-2xl transition-all duration-300 ease-in-out ${finishRidePanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                <FinishRide />
            </div>
        </div>
    )
}

export default CaptainRiding
