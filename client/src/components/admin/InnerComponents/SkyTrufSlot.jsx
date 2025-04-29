import React, { useEffect, useState } from 'react'
import { useAdminStore } from '../../../store/useAdminStore.js'
import BallLoader from '../../skeleton/BallLoader.jsx'
import { Play, Pause, RotateCcw, UserCog, Clock, Bookmark, ClockFading, User, Mail, Phone } from 'lucide-react'
function XtraTimeSlot() {
  const { getBookings, bookings, isGettingBookings } = useAdminStore()
  const [cuurentTime, setCurrentTime] = useState()
  const [remainingTime, setRemainingTime] = useState([])
  const [remainingTimems, setRemainingTimems] = useState([])
  const [timerStart, setTimerStart] = useState(false)
  const [timer, setTimer] = useState('00:00')
  const [reset, setReset] = useState(false)
  const [timerinms, setTimerinms] = useState(0);

  const slots = ['5:00 A.M - 6:30 A.M', '6:30 A.M - 8:00 A.M', '8:00 A.M - 9:30 A.M', '9:30 A.M - 11:00 A.M', '11:00 A.M - 12:30 P.M',
    '12:30 P.M - 2:00 P.M', '2:00 P.M - 3:30 P.M', '3:30 P.M - 5:00 P.M', '5:00 P.M - 6:30 P.M', '6:30 P.M - 8:00 P.M', '8:00 P.M - 9:30 P.M',
    '9:30 P.M - 11:00 P.M', '11:00 P.M - 12:30 A.M', '12:30 A.M - 2:00 A.M'
  ]
  const times = ['5:00', '6:30', '8:00', '9:30', '11:00',
    '12:30', '14:00', '15:30', '17:00', '18:30', '20:00',
    '21:30', '23:00', '24:30'
  ]
  const dateback = new Date()
  const threehours = new Date(dateback.getTime() - (150 * 60 * 1000))
  const date = threehours.toLocaleDateString('en-CA')
  useEffect(() => {
    getBookings()
  }, [])
  const getcurrentTime = () => {
    const now = new Date().getTime()
    const parts2 = date.split('-')
    const midNight = new Date(parts2[0], parts2[1] - 1, parts2[2], 0, 0, 0).getTime()
   
    const timeset = times.map((time) => {
      const parts = time.split(':')
      const slotTime = (parts[0] * 60 * 60 * 1000) + (parts[1] * 60 * 1000) + midNight
      const remainingTimeinms = slotTime - now
      if (remainingTimeinms > 0) {
        const remainingTimehours = String(Math.floor(remainingTimeinms / (60 * 60 * 1000))).padStart(2, '0')
        const remainingTimeminutes = String(Math.floor((remainingTimeinms % (60 * 60 * 1000)) / (60 * 1000))).padStart(2, '0')
        const remainingTimeseconds = String(Math.floor((remainingTimeinms % (60 * 1000)) / (1000))).padStart(2, '0')
        return `${remainingTimehours}:${remainingTimeminutes}:${remainingTimeseconds}`
      }
      else if (remainingTimeinms < 0 && remainingTimeinms > -5400000) {
        const remainingTimeminutes = String(Math.floor(Math.abs((remainingTimeinms / (60 * 1000))))).padStart(2, '0')
        const remainingTimeseconds = String(Math.floor(Math.abs((remainingTimeinms % (60 * 1000))) / (1000))).padStart(2, '0')
        return `${remainingTimeminutes}:${remainingTimeseconds}`
      }
      else {
        return `00:00:00`
      }

    })
    const timeset2 = times.map((time) => {
      const parts = time.split(':')
      const slotTime = (parts[0] * 60 * 60 * 1000) + (parts[1] * 60 * 1000) + midNight
      const remainingTimeinms = slotTime - now
      return remainingTimeinms
    })
    if (reset) {
      setTimer('00:00');
      setTimerStart(false);
      setTimerinms(0)
      setReset(false)
    }
    else if (timerStart) {
      const timerminutes = String(Math.floor(Math.abs((timerinms / (60 * 1000))))).padStart(2, '0')
      const timerseconds = String(Math.floor(Math.abs((timerinms % (60 * 1000))) / (1000))).padStart(2, '0')
      setTimerinms(timerinms + 105)
      const timestring = `${timerminutes}:${timerseconds}`
      setTimer(timestring)
    }
    setRemainingTimems(timeset2)
    setRemainingTime(timeset)
    setCurrentTime(now)

  }
  useEffect(() => {
    const getTime = setInterval(getcurrentTime, 100)
    return () => clearTimeout(getTime)
  }, [cuurentTime])
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
      <div className='w-86 sm:w-[30rem] lg:w-[48rem] transition-all overflow-hidden text-clip flex flex-col gap-5 justify-center items-center'>
        <div className='w-[100%] p-2 rounded-xl flex flex-col items-center justify-center gap-5 mb-5'>
          <div className='text-8xl bg-base-300 w-70 sm:w-96 h-40 flex items-center justify-center rounded-3xl transition-all shadow-lg shadow-black'>{timer}</div>
          <div className='flex flex-row gap-2 items-center justify-center'>
            <button className='btn btn-success btn-circle w-8 h-8 shadow-md shadow-black' onClick={() => setTimerStart(true)}><Play size={18} /></button>
            <button className='btn btn-error btn-circle w-8 h-8 shadow-md shadow-black' onClick={() => setTimerStart(false)}><Pause size={18} /></button>
            <button className='btn btn-info btn-circle w-8 h-8 shadow-md shadow-black' onClick={() => setReset(true)}><RotateCcw size={18} /></button>
          </div>
        </div>
        {slots.map((slot, index) => {

          if (remainingTimems[index] < 0 && remainingTimems[index] > -5400000) {
            return (
              <div className='w-[90%] bg-[#23f1cfaf] text-black p-2 not-first:rounded-xl flex flex-col items-center justify-center shadow-black shadow-md pb-5' key={index}>
                <p className='w-48 text-center border-b-2 text-2xl'>Current Slot</p>
                <div className='flex flex-col w-full'>
                  <div className='flex flex-col gap-2 items-center justify-center text-4xl mt-5'>
                    <p className='flex flex-row gap-2 items-center text-lg p-1 w-[20%] transition-all justify-center'> <Clock size={40} /></p>
                    <p className={` font-bold text-white bg-[rgba(0,0,0,0.7)] w-30 h-14 flex justify-center items-center rounded-lg shadow-lg shadow-black mb-5`}>{remainingTime[index]}</p>
                  </div>
                  <div>
                    <div className='mb-2 flex flex-col gap-2 items-center justify-center'>
                      <p className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5'><Bookmark size={18} />Slot: S{index + 1}</p>
                      <p className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5'><Clock size={18} />Time: {slots[index]}</p>
                    </div>
                    <div>
                      {bookings.map((booking) => {
                        if (booking.date === date && booking.slotName === `S${index + 1}` && booking.turf === "skyTurf") {
                          const phone = booking.phone.replace(/^88/, '');
                          return (
                            <div className='w-[100%] flex flex-col justify-center items-center mb-5'>
                              <p className='font-bold text-xl mt-2'>Allotted to:</p>
                              <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5'> <User size={18} />Name: {booking.name}</p>
                              <a href={`mailto:${booking.email}`} className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5 text-blue-900 hover:underline'>
                                <Mail size={18} />Email: {booking.email}
                              </a>
                              <a href={`tel:${phone}`} className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5 text-green-900 hover:underline'>
                                <Phone size={18} />Phone: {phone}
                              </a>

                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          }

        })}
        {slots.map((slot, index) => {

          if (remainingTimems[index] > 0 && remainingTimems[index] < 5400000) {
            return (
              <div className='w-[90%] bg-[#7dd9f0dc]  text-black p-2 rounded-xl flex flex-col items-center justify-center shadow-black shadow-md pb-5' key={index}>
                <p className='w-48 text-center border-b-2 text-2xl'>Next Slot</p>
                <div className='flex flex-col w-full '>
                  <div className='mb-2 flex flex-col gap-2 items-center justify-center'>
                    <p className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5'><Bookmark size={18} />Slot: S{index + 1}</p>
                    <p className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5'><Clock size={18} />Time: {slots[index]}</p>
                  </div>
                  <div>
                    <div className='flex flex-row gap-2 items-center justify-center'>
                      <p className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5'><ClockFading size={18} />Starts In :
                        <label className={`${remainingTimems[index] < 300000 ? 'animate-pulse text-red-600' : 'text-green-800'} font-bold `}>{remainingTime[index]}</label> </p>
                    </div>

                    <div>
                      {bookings.map((booking) => {
                        if (booking.date === date && booking.slotName === `S${index + 1}` && booking.turf === "skyTurf") {

                          const phone = booking.phone.replace(/^88/, '');
                          return (
                            <div className='w-[100%] flex flex-col justify-center items-center mb-5'>
                              <p className='font-bold text-xl mt-2'>Allotted to:</p>
                              <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5'> <User size={18} />Name: {booking.name}</p>
                              <a href={`mailto:${booking.email}`} className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5 text-blue-900 hover:underline'>
                                <Mail size={18} />Email: {booking.email}
                              </a>
                              <a href={`tel:${phone}`} className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all pl-5 text-green-900 hover:underline'>
                                <Phone size={18} />Phone: {phone}
                              </a>

                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          }

        })}
        <div className='w-[90%] p-2 rounded-xl flex flex-col items-center justify-center bg-base-100 gap-5 mb-5 shadow-black shadow-md pb-5'>
          <p className='w-44 text-center border-b-2'>Upcoming Slot</p>
          <div className='grid grid-cols-1 lg:grid-cols-2 mb-2 transition-all'>
            {slots.map((slot, index) => {

              if (remainingTime[index] !== '00:00:00' && remainingTimems[index] > 5400000) {
                return (
                  <div className=' p-2 bg-base-300 flex flex-col items-center justify-center rounded-xl border-1 shadow-black shadow-md m-2' key={index}>

                    <div className='flex flex-col p-2'>
                      <p>Slot: S{index + 1}</p>
                      <p>Time: {slots[index]}</p>
                      <div>
                        <p>Time Remaining: {remainingTime[index]}</p>
                        <div>
                          {bookings.map((booking) => {
                            if (booking.date === date && booking.slotName === `S${index + 1} ` && booking.turf === "skyTurf") {
                              const phone = booking.phone.split('88')[1]
                              return (
                                <div>
                                  <p className='font-bold'>Allotted to:</p>
                                  <p>Name: {booking.name}</p>
                                  <p>Email: {booking.email}</p>
                                  <p>Phone: {booking.phone}</p>
                                </div>
                              )
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

            })}
          </div>

        </div>

        <div className='w-[90%] p-2 rounded-xl flex flex-col items-center justify-center bg-base-100 gap-5 mb-5 shadow-black shadow-md pb-5'>
          <p className='w-44 text-center border-b-2'>Completed Slot</p>
          <div className='grid grid-cols-1 lg:grid-cols-2 mb-2 transition-all'>
            {slots.map((slot, index) => {

              if (remainingTime[index] === '00:00:00' && remainingTimems[index] < -5400000) {
                return (
                  <div className='p-2 bg-base-300 flex flex-col items-center justify-center rounded-xl border-1 shadow-black shadow-md m-2' key={index}>

                    <div className='flex flex-col P-2'>
                      <p>Slot: S{index + 1}</p>
                      <p>Time: {slots[index]}</p>
                      <div>
                        <div>
                          {bookings.map((booking) => {
                            if (booking.date === date && booking.slotName === `S${index + 1}` && booking.turf === "skyTurf") {
                              const phone = booking.phone.split('88')[1]
                              return (
                                <div>
                                  <p className='font-bold'>Allotted to:</p>
                                  <p>Name: {booking.name}</p>
                                  <p>Email: {booking.email}</p>
                                  <p>Phone: {booking.phone}</p>
                                </div>
                              )
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default XtraTimeSlot