import React from 'react'

function VehiclePanel(props) {
    return (
        <div>
            <h5 onClick={()=>{
                    props.setVehiclePanel(false)
                }} className='p-3 text-center absolute top-0 right-0'><i className="ri-arrow-down-double-line"></i></h5>
                <h3 className='text-xl font-semibold mb-5 p-2'>Choose a Vehicle</h3>
                <div onClick={()=>{
                    props.setConfirmRidePanel(true)
                    props.setVehiclePanel(false)
                    props.selectVehicle('motorcycle')
                }} className=' flex active:border-2 border-black mb-2 rounded-xl p-2 w-full  items-center justify-between'>
                    <img className='h-11 px-4' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="" />
                    <div className=' text-xs'>
                        <h4 className='font-medium text-base'>Bike <span><i className="ri-user-fill"></i></span>2</h4>
                        <h5>5mins away</h5>
                        <p className='text-gray-600 font-medium'>fast motorcycle rides</p>
                </div>
                    <h2 className='font-semibold '>₹{props.fare?.motorcycle || '0.00'}</h2>
                </div>
                <div onClick={()=>{
                    props.setConfirmRidePanel(true)
                    props.setVehiclePanel(false)
                    props.selectVehicle('car')
                }} className='flex active:border-2 border-black mb-2 rounded-xl p-2 w-full  items-center justify-between'>
                    <img className='h-17' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iY2Q4ZmRmOC0yYjM0LTUyZGUtYmM3Zi1mNDFmMDgwNTliY2MucG5n" alt="" />
                    <div className=' text-xs'>
                        <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i></span>4</h4>
                        <h5>2mins away</h5>
                        <p className='text-gray-600 font-medium'>affordable,compact rides</p>
                    </div>
                    <h2 className='font-semibold '>₹{props.fare?.car || '0.00'}</h2>
                </div>
                <div onClick={()=>{
                    props.setConfirmRidePanel(true)
                    props.setVehiclePanel(false)
                    props.selectVehicle('auto')
                }} className='flex active:border-2 border-black mb-2 rounded-xl p-2 w-full  items-center justify-between'>
                    <img className='h-12' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
                    <div className=' text-xs'>
                        <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-fill"></i></span>4</h4>
                        <h5>2mins away</h5>
                        <p className='text-gray-600 font-medium'>cheap, reliable rides</p>
                    </div>
                    <h2 className='font-semibold '>₹{props.fare?.auto || '0.00'}</h2>
                </div>
        </div>
    )
}

export default VehiclePanel
