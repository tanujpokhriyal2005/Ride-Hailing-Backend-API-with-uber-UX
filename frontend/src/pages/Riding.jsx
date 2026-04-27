import React from 'react'
import { Link } from 'react-router-dom'

function Riding() {
    return (
        <div className='h-screen'>

            <Link to="/home" className='p-6 right-2 top-2 fixed h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="ri-home-3-fill"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-20' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iY2Q4ZmRmOC0yYjM0LTUyZGUtYmM3Zi1mNDFmMDgwNTliY2MucG5n" alt="" />

                    <div className='text-right'>
                        <h2 className='text-2xl font-medium'>Dharmpal</h2>
                        <h4 className='text-md font-semibold ml-3'>HR 26 0001</h4>
                        <p className='text-sm ml-3'>Maruti Ertiga</p>
                    </div>
                </div>


                
                <div className='flex gap-2 justify-between flex-col items-center'>
                    
                    <div className='w-full'>
                    
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
                    
                </div>
                <button className='w-full bg-green-700 mt-4 text-white rounded-lg font-semibold p-2'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding
