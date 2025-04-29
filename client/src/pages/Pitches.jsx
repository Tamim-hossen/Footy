import React, { useEffect, useState, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '../store/useThemeStore.js'
import { User, Clock, Calendar, Volleyball, CalendarCheck, Mail, Phone } from 'lucide-react'
import BallLoader from '../components/skeleton/BallLoader.jsx'
function Pitches() {
  const { theme } = useThemeStore()
  const { authUser, getBookingInfo, bookingInfo, isGettingBookingInfo } = useAuthStore()
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
      scrollTo({ top: 0, behavior: 'smooth' })
      nav('/')
    }
    else {
      setUser({ name: authUser.name, email: authUser.email, phone: authUser.phone });
      setBg(Math.floor(Math.random() * images.length))
    }
  }, [])


  if (isGettingBookingInfo) {
    return (<div className={`flex flex-col items-center justify-center gap-10 w-full relative h-fixed ${theme === 'light' ?
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
      <div className='flex flex-col my-20 justify-center items-center gap-10 w-[80%] '>
        <div className='text-4xl font-bold'>Pitches</div>
        {/*sky */}
        <div className='flex flex-col mt-10 justify-center items-center w-full gap-5 bg-[#00000083] rounded-xl'>
        <div className='text-3xl mt-10 font-bold'>Sky Turf</div>
          <div className='flex flex-col xl:flex-row gap-5 p-6 rounded-xl w-full justify-center items-center '>
            <div className=' rounded-2xl w-full xl:w-[43%]'>
              <img
              src={'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745382080/sk1_b46olz.png'}
              alt='Image'
              className='w-full rounded-2xl'
              />
            </div>
            <div className='flex flex-col w-full xl:w-[50%]'>
            <div className='p-4 flex flex-col justify-start items-start gap-4'>
              <p className=' text-3xl font-bold'>Details:</p>
              <div className='flex flex-row gap-5 px-2 justify-center items-center'>
                <label className='font-bold text-xl'>Name:</label>
                <p>Sky Turf</p>
              </div>
              <div className='flex flex-row gap-5 px-2 justify-center items-start'>
                <label className='font-bold text-xl'>Details:</label>
                <p>
                Play above the city at Sky Turf, Shonir Akhra's premier rooftop ground. Enjoy a stunning skyline view, fresh breezes, and top-quality turf for football, cricket, and more. Book your game and experience Dhaka from a whole new level!
                </p>
              </div>
              <div className='flex flex-row gap-5 px-2 justify-center items-center'>
                <label className='font-bold text-xl'>Open:</label>
                <p>5 AM - 2 PM</p>
              </div>
              <div className='flex flex-row gap-5 px-2 justify-center items-center'>
                <label className='font-bold text-xl'>Dimention:</label>
                <p>20m * 15m</p>
              </div>
            </div>
            </div>
          </div>
          <div className='flex flex-col xl:flex-row gap-5 p-6 rounded-xl w-full justify-center items-center'>
            <div className='xl:max-w-[50%]'>
            <div className='p-4 flex flex-col justify-start items-start gap-5 '>
       
              <div className='flex flex-row gap-5 px-2 justify-center items-center '>
                <label className='font-bold text-xl'>Address:</label>
                <p>1/1, Meghna Tower, Rafiqul Islam Road, Shonir Akhra, Dhaka</p>
              </div>
              <div className='flex flex-row gap-5 px-2 justify-center items-center'>
                <label className='font-bold text-xl'>Dereiction:</label>
                <p>On the left side towards SignBoard, 2 minutes from shonir akhra foot-over bridge</p>
              </div>

            </div>
            </div>
            <div>
            <div className='w-96 h-96 flex justify-center items-center transition-all'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1826.629237923718!2d90.451487!3d23.
          702462!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b7001a0b7ce7%3A0xd02f7ade7b746510!2sSky%20Turf
          !5e0!3m2!1sen!2sbd!4v1745113056259!5m2!1sen!2sbd"
                className='w-86 h-86 sm:w-96 sm:h-96 border-0 rounded-2xl shadow-2xl shadow-black'
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            </div>
          </div>
          <div> <button className='btn bg-green-300 text-black mb-10 shadow-md shadow-black' onClick={()=>{nav('/sky-turf'); scrollTo({top:0,behavior:'smooth'})}}>Book a Slot</button></div>
        </div>
        {/*xtra */}
        <div className='flex flex-col mt-10 justify-center items-center w-full gap-5 bg-[#00000083] rounded-xl'>
        <div className='text-3xl mt-10 font-bold'>Xtra Time</div>
          <div className='flex flex-col xl:flex-row gap-5 p-6 rounded-xl w-full justify-center items-center '>
            <div className=' rounded-2xl w-full xl:w-[43%]'>
            <img
              src={'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745841048/xt1_earrki.jpg'}
              alt='Image'
              className='w-full rounded-2xl'
              />
            </div>
            <div className='flex flex-col w-full xl:w-[50%]'>
            <div className='p-4 flex flex-col justify-start items-start gap-4'>
              <p className=' text-3xl font-bold'>Details:</p>
              <div className='flex flex-row gap-5 px-2 justify-center items-start'>
                <label className='font-bold text-xl'>Descroption:</label>
                <p>
                Get in the game at Xtra Time, Hasnabad’s go-to spot for fast-paced futsal action. With a well-maintained ground-level turf and a friendly atmosphere, it's the perfect place to play, train, and enjoy the game. Book your match today!
                </p>
              </div>
              <div className='flex flex-row gap-5 px-2 justify-center items-center'>
                <label className='font-bold text-xl'>Open:</label>
                <p>5 AM - 2 PM</p>
              </div>
              <div className='flex flex-row gap-5 px-2 justify-center items-center'>
                <label className='font-bold text-xl'>Dimention:</label>
                <p>20m * 15m</p>
              </div>
            </div>
            </div>
          </div>
          <div className='flex flex-col xl:flex-row gap-5 p-6 rounded-xl w-full justify-center items-center'>
            <div>
            <div className='p-4 flex flex-col justify-start items-start gap-5 '>
       
              <div className='flex flex-row gap-5 px-2 justify-center items-center'>
                <label className='font-bold text-xl'>Address:</label>
                <p>Hasnabad Footover Bridge, Hasnabad, Dhaka</p>
              </div>
              <div className='flex flex-row gap-5 px-2 justify-center items-center'>
                <label className='font-bold text-xl'>Direction:</label>
                <p>2 min from Hasnabad foot-over bridge on the left side towards Mawa</p>
              </div>
            </div>
            </div>
            <div>
            <div className='w-96 h-96 flex justify-center items-center transition-all'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2172.571227206412!
                2d90.42115186390535!3d23.68258322821994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!
                4f13.1!3m3!1m2!1s0x3755b9003704e96d%3A0xd4bb29e7cb8b8f90!2sXtra%20Time%
                20Futsal%20Ground!5e0!3m2!1sen!2sbd!4v1745900888427!5m2!1sen!2sbd"
                className='w-86 h-86 sm:w-96 sm:h-96 border-0 rounded-2xl shadow-2xl shadow-black'
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            </div>
          </div>
          <div> <button className='btn bg-green-300 text-black mb-10 shadow-md shadow-black' onClick={()=>{nav('/xtra-time'); scrollTo({top:0,behavior:'smooth'})}}>Book a Slot</button></div>
        </div>
      </div>
    </div>
  )
}

export default Pitches