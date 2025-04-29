import React from 'react'

function BallLoader() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className=' fixed flex flex-row justify-center items-start h-[100%] w-[100%] shadow-2xl'>
        <div className=' h-[50%] flex flex-col items-center justify-end'>
        <div className='animate-bounce h-[60%] flex items-end'>
        <img
        src='https://res.cloudinary.com/ddvwykjjv/image/upload/v1744993708/loader_ymeym6.png'
        alt='loader'
        className='w-20 animate-spin'
        />
        </div>
        <div className='text-center felx items-start justify-center text-black font-bold blur-xs text-4xl'>___</div>
        </div>
        
        </div>
    </div>
  )
}

export default BallLoader