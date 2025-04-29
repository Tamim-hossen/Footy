import React, { useEffect, useState } from 'react'
import SkyTrufSlot from './InnerComponents/SkyTrufSlot.jsx'
import XtratTmeSlot from './InnerComponents/XtratTmeSlot.jsx'
function Slots() {
const [selectedTurf,setSelectedTurf] = useState('skyTurf')
  return (
    <div className='flex flex-col gap-10 h-full w-full overflow-x-hidden'>
     
      <div className='w-full max-w-5xl px-4 h-full flex flex-row justify-center items-start gap-5 '>
       <div className='w-[100%] flex flex-col max-w-full relative justify-center items-center'>
       <div className='flex flex-row w-[90%] items-end  justify-center mb-5 bg-base-100 rounded-lg shadow-lg shadow-black mt-5'>
          <div className='flex flex-row  relative justify-between z-10 '>
          <p className={`py-3 w-25  text-center overflow-hidden cursor-pointer `} onClick={()=>{setSelectedTurf('skyTurf')}}>Sky Turf</p>
          <p className={` py-3 w-25  overflow-hidden cursor-pointer text-center `} onClick={()=>{setSelectedTurf('xtraTime')}}>Xtra Time</p>
          <p className={`bg-[rgba(0,0,0,0.25)] w-25 h-12 absolute rounded-lg ${selectedTurf === 'xtraTime' ? 'left-25':'left-0'} -z-10 transition-all`}/>
          </div>
        </div>
        <div>
          {selectedTurf === 'skyTurf' && <SkyTrufSlot />}
          {selectedTurf === 'xtraTime' && <XtratTmeSlot />}
        </div>
       </div>
      </div>
    </div>
  )
}

export default Slots
