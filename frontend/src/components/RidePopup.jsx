import React from 'react'


function RidePopup(props) {
    return (
        <div className='overflow-hidden'>
            <h5 onClick={()=>{
                    props.setRidePopupPanel(false)
                }} className='p-3 text-center absolute top-0 right-0'><i className="ri-arrow-down-double-line"></i></h5>
                <h3 className='text-xl font-semibold mb-5 p-2'>New Ride Request!</h3>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <img className='h-20 w-20 rounded-full object-cover' src="https://object.pixocial.com/pixocial/dmxffni837f1xrj8pki9xgrl.jpg" alt="" />
                        <div>
                            <div>
                                <h2 className='text-xl font-medium'>Ms. Anita</h2>
                            </div>
                            <h5>2.2KM away</h5>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full'>
                        <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                            <i className="text-lg ri-map-pin-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Near kaali Mandir,Noida</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                            <i className="ri-navigation-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>Boys Hostel</h3>
                                <p className='text-sm -mt-1 text-gray-600'>GGSIPU-edc,Near Leela Palace,Delhi</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-2'>
                            <i className="ri-money-rupee-circle-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹193.20</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash or UPI</p>
                            </div>
                        </div>
                    </div>
                    <div className='mb-10 flex w-full items-center justify-between'>
                        <button onClick={()=>{
                        props.setConfirmRidePopupPanel(true)
                    }}
                     className=' bg-green-700 text-white font-semibold px-8 p-3 rounded-lg mt-4'>Accept Ride</button>
                    <button onClick={()=>{
                        props.setRidePopupPanel(false)
                    }} className=' bg-gray-400 text-gray-800 font-semibold px-8 p-3 rounded-lg mt-4'>Ignore Request</button>
                    </div>
                </div>
        </div>
    )
}

export default RidePopup
