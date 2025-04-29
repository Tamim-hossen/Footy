import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745382445/sk2_whsylw.png',
  'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745383170/sk3_fjxjns.png',
  'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745382080/sk1_b46olz.png',
]

const Carousel = () => {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)

  const nextSlide = () => {
    setPrev(current)
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setPrev((prev) => (prev - 1 + images.length) % images.length)
    setCurrent(prev)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [current])

  return (
    <div className='relative w-full flex flex-col justify-center items-center'>
      <div className='relative w-full h-[60vh] overflow-hidden rounded-3xl '>
        {images.map((img, index) => {
          let position = 'translate-x-full opacity-0' 
          if (index === current) position = 'translate-x-0 opacity-100 '
          else if (index === prev) position = '-translate-x-full opacity-0 ' 

          return (
            <img
              key={index}
              src={img}
              alt='carousel'
              className={`absolute top-0 left-0 w-full h-full rounded-3xl object-cover transition-all duration-700 ease-in-out p-2 ${position}`}
            />
          )
        })}

        {/* Controls */}
        <button
          onClick={prevSlide}
          className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10'
        >
          <ChevronLeft size={25} />
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10'
        >
          <ChevronRight size={25} />
        </button>
        
      </div>
      {/*bottom dots*/}
      <div className='relative overflow-hidden rounded-2xl flex items-center justify-center gap-5'>
      {images.map((_,index)=>{
          return(
            <div key={index}>
              <div className={` text-7xl ${index === current ? 'text-accent':'text-gray-500 '} transition-all`} >
                <button onClick={()=>{setPrev(current);setCurrent(index)}} className='cursor-pointer'>.</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
