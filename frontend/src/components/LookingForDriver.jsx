import React from 'react'

function LookingForDriver(props) {
    return (
        <div className='overflow-hidden'>
            <h5 onClick={()=>{
                    props.setVehicleFound(false)
                }} className='p-3 text-center absolute top-0 right-0'><i className="ri-arrow-down-double-line"></i></h5>
                <h3 className='text-xl font-semibold mb-5 p-2'>Looking for a Driver</h3>
                <div className='flex gap-2 justify-between flex-col items-center'>
                    <img className='h-30' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iY2Q4ZmRmOC0yYjM0LTUyZGUtYmM3Zi1mNDFmMDgwNTliY2MucG5n" alt="" />
                    <div className='w-full'>
                        <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                            <i className="text-lg ri-map-pin-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>Pickup</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                            <i className="ri-navigation-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>Destination</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-2'>
                            <i className="ri-money-rupee-circle-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{props.fare?.[props.vehicleType] || '0.00'}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash or UPI</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
        </div>
    )
}

export default LookingForDriver
