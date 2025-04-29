import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
import GetUsers from '../components/admin/Getusers.jsx'
import Bookings from '../components/admin/Bookings.jsx'
import Slots from '../components/admin/Slots.jsx'
import { useThemeStore } from '../store/useThemeStore.js'
function SkyTurf() {
  const { theme } = useThemeStore()
  const { authUser, isAdmin } = useAuthStore()
  const [selected, setSelected] = useState('slots')
  const nav = useNavigate()
  useEffect(() => {
    if (!authUser || !isAdmin) {
      nav('/')
    }
  }, [])

  return (
    <div className={`flex flex-col items-center justify-center gap-10 w-full relative h-fixed ${theme === 'light' ?
      'bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1745681240/bgdoolde_m0dfxy.png)]' : 'bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1745680945/bgdooldewhite_eapomc.png)]'
      }`}>
      {/* <img
        src={theme === 'light' ? 'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745572191/bgdooldeblack_ccwoh6.png' : 'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745572350/bgdoolde2_gmshbb.png'}
        alt='background'
        className='fixed -z-10  w-screen top-0'
      /> */}
      <div class="custom-shape-divider-top-1745658344">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className={`${theme === 'light' ? 'fill-[rgba(0,0,0,0.8)]' : 'fill-white'}`}></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className={`${theme === 'light' ? 'fill-[rgba(0,0,0,0.8)]' : 'fill-white'}`}></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className={`${theme === 'light' ? 'fill-[rgba(0,0,0,0.8)]' : 'fill-white'}`}></path>
        </svg>
      </div><div class="custom-shape-divider-bottom-1745687357">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className={`${theme === 'light' ? 'fill-[rgba(0,0,0,0.8)]' : 'fill-white'} `}></path>
          </svg>
        </div>

      <div className='w-[90%] h-full flex flex-col justify-center items-center gap-5  rounded-2xl my-10 '>
        <div className='flex flex-col justify-center items-center w-full'>
          <p className='text-5xl overflow-hidden font-bold mt-5 h-20 gradient-animate bg-clip-text pt-2  transition-all '>
            Admin Panel
          </p>
          <div className='flex flex-row  text-xl w-[70%] items-center justify-center rounded-lg  relative bg-base-100 shadow-lg shadow-black'>
            <div className='flex flex-row  items-center justify-center relative z-10'>
              <p className={` p-2 cursor-pointer w-30 text-center px-5 `} onClick={() => setSelected('slots')}>Slots</p>
              <p className={` p-2 cursor-pointer w-30 text-center px-5 `} onClick={() => setSelected('users')}>Users</p>
              <p className={` p-2 cursor-pointer w-30 text-center px-5 `} onClick={() => setSelected('bookings')}>Bookings</p>
              <p className={`absolute bg-[rgba(0,0,0,0.25)]  h-11 rounded-xl top-0 -z-10 
              ${selected === 'slots' ? 'left-2 w-25' : selected === 'users' ? 'left-31 w-27' : 'left-60 w-30'} transition-all`} />
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          {selected === 'slots' && <Slots />}
          {selected === 'users' && <GetUsers />}
          {selected === 'bookings' && <Bookings />}
        </div>
        <div>

        </div>


      </div>

    </div>
  )
}

export default SkyTurf