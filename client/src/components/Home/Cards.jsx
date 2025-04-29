import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Cards.css'
function Cards() {
  const nav = useNavigate()
  return (
    <div className='flex flex-col gap-10 mb-10 relative '>
      <p className=' text-center text-4xl font-bold'>Pick Your Playground</p>
      <div className='flex justify-center gap-10 flex-col lg:flex-row items-center mb-10 relative z-5 '>
      <div className="card w-[70%] lg:w-[35%] h-86 cursor-pointer" onClick={() => { nav('/xtra-time'); scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <div className="content w-full h-full ">
          <div class="back">
            <div className="back-content bg-base-300">
              <img
                src={'https://res.cloudinary.com/ddvwykjjv/image/upload/v1744993708/loader_ymeym6.png'}
                className='w-35 animate-pulse'
                alt='Football'
              />
              <p className='text-3xl font-bold'>Xtra Time</p>
            </div>
            <div className="img flex flex-row w-full justify-between">
              <div class="circle2">
              </div>
              <div class="circle2" id="right">
              </div>
              <div class="circle2" id="bottom">
              </div>
            </div>
          </div>
          <div class="front">
            <div class="front-content bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1744888319/bg1_kg9vh1.jpg)]">
              <small className="badge text-white">Ground</small>
              <div class="description">
                <div class="title">
                  <p class="title">
                    <strong className='text-2xl'>Xtra Time</strong>
                  </p>
                </div>
                <p class="card-footer">
                  Hasnabad &nbsp; | &nbsp; View Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card w-[70%] lg:w-[35%] h-86 cursor-pointer" onClick={() => { nav('/sky-turf'); scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <div className="content w-full h-full ">
          <div class="back">
            <div className="back-content bg-base-300">
              <img
                src={'https://res.cloudinary.com/ddvwykjjv/image/upload/v1744993708/loader_ymeym6.png'}
                className='w-35 animate-pulse'
                alt='Football'
              />
              <p className='text-3xl font-bold'>Sky Turf</p>
            </div>
            <div className="img  flex flex-row w-full justify-between">
              <div className="circle2">
              </div>
              <div className="circle2" id="right">
              </div>
              <div className="circle2" id="bottom">
              </div>
            </div>
          </div>
          <div class="front">
            <div class="front-content bg-cover bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1744888319/bg2_xsirve.webp)]">
              <small className="badge text-white">Roof-top</small>
              <div class="description">
                <div class="title">
                  <p class="title">
                    <strong className='text-2xl'>Sky Turf</strong>
                  </p>
                </div>
                <p class="card-footer">
                  Shonir-Akhra &nbsp; | &nbsp; View Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Cards