import React, { useEffect, useState, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '../store/useThemeStore.js'
import { User,Clock,Calendar,Volleyball,CalendarCheck,Mail,Phone } from 'lucide-react'
import BallLoader from '../components/skeleton/BallLoader.jsx'
function Matches() {
  const { theme } = useThemeStore()
  const { authUser,getBookingInfo,bookingInfo,isGettingBookingInfo } = useAuthStore()
  const nav = useNavigate()
  const [user, setUser] = useState({ name: '', email: '', phone: '', currentPassword: '' });
  const [changeEdited, setChangeEdited] = useState(false)
  const phone = String(authUser?.phone).replace(/^88/, '');
  const [bg, setBg] = useState('')

  const images = ['https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-56-09_rerarm.svg',
    'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-57-39_m3xzue.svg',
    'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-59-37_a3gxk3.svg',
    'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-56-59_bu739x.svg',
    'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-59-01_zxklkz.svg',
    'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-58-03_kofuex.svg']

  useEffect(() => {
    getBookingInfo()
    if (!authUser) {
      scrollTo({ top: 0, behavior:'smooth' })
      nav('/')
    }
    else {
      setUser({ name: authUser.name, email: authUser.email, phone: authUser.phone });
      setBg(Math.floor(Math.random() * images.length))
    }
  }, [])

  
  if (isGettingBookingInfo) {
    return(<div className={`flex flex-col items-center justify-center gap-10 w-full relative h-fixed ${theme === 'light' ?
      'bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1745681240/bgdoolde_m0dfxy.png)]' : 'bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1745680945/bgdooldewhite_eapomc.png)]'
      }`}>
      <BallLoader />
    </div>)
  }
  return (
    <div className={`flex flex-col items-center justify-center gap-10 w-full relative h-fixed ${theme === 'light' ?
      'bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1745681240/bgdoolde_m0dfxy.png)]' : 'bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1745680945/bgdooldewhite_eapomc.png)]'
      }`}>
      <div className="custom-shape-divider-top-1745658344">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className={`${theme === 'light' ? 'fill-[rgba(0,0,0,0.8)]' : 'fill-white'}`}></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className={`${theme === 'light' ? 'fill-[rgba(0,0,0,0.8)]' : 'fill-white'}`}></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className={`${theme === 'light' ? 'fill-[rgba(0,0,0,0.8)]' : 'fill-white'}`}></path>
        </svg>
      </div>
      <div className="custom-shape-divider-bottom-1745687357">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={`${theme === 'light' ? 'fill-[rgba(0,0,0,0.8)]' : 'fill-white'} `}></path>
        </svg>
      </div>
      <div className='flex flex-col justify-center items-center w-[90%] mb-20'>
        <p className='text-5xl font-bold mt-20'>Matches</p>
        <div className='mt-10 w-full bg-[#75757581] rounded-xl'>
          <div className='relative rounded-2xl m-5 mb-25'>
            <img
              src={images[bg]}
              alt='Cover Image'
              className='h-83 w-full rounded-2xl'
            />
            <div className='absolute -bottom-20 w-full items-center flex justify-center'>
              <p className='border-20 border-[#757575bd] rounded-full'>
                <User size={120} className='h-50 w-50 p-5 rounded-full bg-white text-black' />
              </p>
            </div>
            
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-3xl font-bold'>{authUser?.name}</p>
            <div className='flex flex-col gap-2 text-lg justify-center items-center'>
              <p className='text-md flex flex-row gap-2 justify-center items-center'><Mail/>{authUser?.email}</p>
              <p className='text-md flex flex-row gap-2 justify-center items-center'><Phone/>{phone}</p>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center'>
            {bookingInfo.map((booking)=>{
                            const date = new Date(booking.placedOn).toLocaleDateString('en-CA')
                            const time = new Date(booking.placedOn).toLocaleTimeString('en-US')
                              return (
                                <div className='p-4 bg-base-200 flex flex-col items-center justify-center rounded-xl border-1 shadow-black shadow-md m-2 mb-5 w-[24rem] sm:w-[30rem] lg:w-[40rem]' >
                                  <div className='flex flex-col justify-center items-center gap-2 w-full'>
                                    <p className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10'><Calendar size={18}/>Date: {booking.date}</p>
                                    <p className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10'><Calendar size={18}/>Slot: {booking.slotName}</p>
                                    <p className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10'><Clock size={18}/>Time: {booking.slot}</p>
                                    <p className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10'><Volleyball size={18}/>Pitch: {booking.turf === 'xtraTime' ? 'Xtra Time':'Sky Turf'}</p>
                                    <p className='font-bold flex flex-row gap-2 items-center text-lg p-1 w-[70%]  transition-all pl-10'>Booked On:</p>
                                    <p className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10'><CalendarCheck size={18}/>Date: {date}</p>
                                    <p className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10'><Clock size={18}/>Time: {time}</p>
                                    <div>
                                      <div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
            })}
          </div>

        </div>
      </div>
      <div className={`fixed top-0 ${changeEdited ? 'scale-100' : 'scale-0'} transition-all w-full h-full flex items-center justify-center`}>
        <div className='absolute w-[70%] h-[80%] flex flex-col items-center justify-center z-20 border-2 rounded-2xl bg-[#000000bc]'>
          <div className='flex flex-col justify-center items-center mb-5 w-full'>

          </div>
          <div className='flex flex-row gap-10'>
            <button className='btn bg-red-300 text-black' onClick={() => {setChangeEdited(false)}}>Cancel</button>
          </div> 
        </div>
        <div className='absolute w-screen h-screen z-15 bg-[#0000009f]'  />
      </div>
    </div>
  )
}

export default Matches