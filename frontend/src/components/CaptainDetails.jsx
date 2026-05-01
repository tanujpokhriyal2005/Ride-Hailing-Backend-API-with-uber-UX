import React,{useContext} from 'react'


function CaptainDetails() {
   

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-4'>
                    <img className='h-20 w-20 rounded-full object-cover' src="https://m.economictimes.com/thumb/height-450,width-600,imgsize-52727,msid-53372757/most-women-like-men-with-good-taste-in-shoes-sidharth-malhotra.jpg" alt="" />
                    <h4 className='text-lg font-medium'>Captain </h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹296.48</h4>
                    <p className='text-sm text-gray-700'>Earned!</p>
                </div>
               </div>
                <div className='flex gap-12 justify-center items-start'>
                    <div className='text-center'>
                        <i className="text-2xl font-thin ri-time-line"></i>
                        <h5 className='text-lg font-medium'>10.2</h5>
                        <p className='text-sm text-gray-700'>Hours Online</p>
                    </div>
                    <div className='text-center'>
                        <i className="text-2xl font-thin ri-speed-up-line"></i>
                        <h5 className='text-lg font-medium'>45km/hr.2</h5>
                        <p className='text-sm text-gray-700'>Avg Speed</p>
                    </div>
                    <div className='text-center'>
                        <i className="ri-bard-line"></i>
                        <h5 className='text-lg font-medium'>4.9</h5>
                        <p className='text-sm text-gray-700'>Rating</p>
                    </div>
                </div>
        </div>
    )
}

export default CaptainDetails
