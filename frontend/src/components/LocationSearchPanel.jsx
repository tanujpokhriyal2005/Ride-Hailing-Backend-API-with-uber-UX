import React from 'react'

function LocationSearchPanel(props) {

    // sample array for location
    const locations = [
        "Boys Hostel,GGSIPU-EDC,near leela Palace,New Delhi",
        "D-II 272,Near Nehru park, Chanakyapuri,New Delhi",
        "Rajiv chowk , metro station, Connaught Place,New Delhi",
        "Near Tulip farm, Swastikpuram,Badripur,Dehradun"
    ];

    return (
        <div>
            {/* This is just sample data */}
            {
                locations.map(function(elem, idx){
                    return (<div key={idx} onClick={()=>{
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className='flex mb-4 rounded-xl items-center active:border-2 justify-start px-4'>
                <h2 className=' h-10 w-10 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
                <h4 className=''>{elem}</h4>
            </div>)
                })
            }

            


        </div>
         
    )
}

export default LocationSearchPanel
