import React from 'react'
import { ArrowDown } from 'lucide-react'
function Poster() {
  return (
    <div className='relative z-5 '>
        <img
        src='https://res.cloudinary.com/ddvwykjjv/image/upload/v1744844396/bg5_gz3r16.png'
        alt='background'
        className='absolute -z-5  '
        />
        
        <div>
          <div className='pt-2 font-bold  transition-all bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent gradient-animate'>
          <p className=' text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-9xl transition-all'>PLAY</p>
        <p className='text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-9xl transition-all'>YOUR</p>
        <p className=' text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-9xl transition-all'>GAME!</p>
        <div className='flex gap-2  flex-row justify-center items-center text-center text-sm sm:text-md md:text-lg lg:text-xl transition-all'>
        <p className='font-bold mt-4'>Scroll Down</p>
        <ArrowDown className='text-black animate-bounce mt-4 w-3 sm:w-4 md:w-5 lg:w-6 xl:w-7'/>
        </div>
          </div>
        </div>
        
        </div>
  )
}

export default Poster