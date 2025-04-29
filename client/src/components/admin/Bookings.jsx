import React, { useEffect, useState } from 'react'
import { useAdminStore } from '../../store/useAdminStore.js'
import BallLoader from '../../components/skeleton/BallLoader.jsx'
import { User, Mail,Phone, Calendar,CalendarCheck,Clock,Bookmark,Volleyball } from 'lucide-react'
function Boookings() {
  const { getBookings, bookings, isGettingBookings } = useAdminStore()

  useEffect(() => {
    getBookings()
  }, [])
  if (isGettingBookings) {
    return (
      <div className='w-full flex justify-center items-center'>
        <div className='w-86 sm:w-[30rem] lg:w-[48rem] transition-all overflow-hidden text-clip flex flex-col gap-5 justify-center items-center'>
          <BallLoader />
        </div>
      </div>
    )
  }
  return (
    <div className='w-full flex justify-center items-center'>
      
      <div className='w-[30rem] sm:w-[40rem] lg:w-[60rem] transition-all overflow-hidden text-clip flex flex-col gap-5 justify-center items-center'>
        <div className='w-[90%] p-2 rounded-xl flex flex-col items-center justify-center bg-[#75757581] gap-5 mb-5 shadow-black shadow-md'>
          <p className='w-60 text-center border-b-2 p-2 text-xl font-bold'>Recently Booked</p>
          <div className='grid grid-cols-1  mb-2 transition-all'>
            {bookings.map((booking) => {
              const date = new Date(booking.placedOn).toLocaleDateString('en-CA')
              const time = new Date(booking.placedOn).toLocaleTimeString('en-US')
              const phone = String(booking.phone).replace(/^88/,'')
                return (
                  <div className='p-4 bg-base-200 flex flex-col items-center justify-center rounded-xl border-1 shadow-black shadow-md m-2 mb-5 w-[24rem] sm:w-[30rem] lg:w-[40rem]' >
                    <div className='flex flex-col justify-center items-center gap-2 w-full'>
                      <p className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10'> <User size={18}/>Name: {booking.name}</p>
                      <a href={`mailto:${booking.email}`} className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10 text-green-600'><Mail size={18}/>Email: {booking.email}</a>
                      <a href={`tel:${phone}`} className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10 text-blue-600'><Phone size={18}/>Phone: {phone}</a>
                      <p className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10'><Calendar size={18}/>Date: {booking.date}</p>
                      <p className='flex flex-row gap-2 items-center text-lg p-1 w-[70%] border-b-1 transition-all pl-10'><Bookmark size={18}/>Slot: {booking.slotName}</p>
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
                )})}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Boookings