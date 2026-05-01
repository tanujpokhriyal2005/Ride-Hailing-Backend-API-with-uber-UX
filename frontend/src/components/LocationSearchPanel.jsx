import React from 'react'

function LocationSearchPanel({ suggestions, activeField, setLocation, setVehiclePanel, setPanelOpen }) {

    return (
        <div>
            {/* Display suggestions */}
            {
                suggestions.map(function(elem, idx){
                    return (<div key={idx} onClick={()=>{
                        setLocation(elem)
                    }} className='flex mb-4 rounded-xl items-center active:border-2 justify-start px-4'>
                <h2 className=' h-10 w-10 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
                <h4 className=''>{elem.description}</h4>
            </div>)
                })
            }
        </div>
         
    )
}

export default LocationSearchPanel
