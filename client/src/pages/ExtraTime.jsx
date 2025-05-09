import React, { useState, useEffect } from 'react'
import Carousel from '../components/Turf/Sky/carasoul.jsx'
import { ArrowRight, X } from 'lucide-react'
import BallLoader from '../components/skeleton/BallLoader.jsx'
import toast from 'react-hot-toast'
import { useBookingStore } from '../store/useBookingStore.js'
import { useAuthStore } from '../store/useAuthStore.js'
function SkyTurf() {
  const { cart, setCart, placeBooking, isbookingslot, dateInfo, getDateInfo, isgettingDateInfo, setDateInfo } = useBookingStore()
  const { authUser } = useAuthStore()
  const today = new Date().toLocaleDateString('en-CA')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [selectedSlotName, setSelectedSlotName] = useState('')
  const [selected, setSelected] = useState(false)
  const [cartAdded, setCartAdded] = useState(false)
  const [date, setDate] = useState('')
  const [selectedindex, setselectedIndex] = useState('')
  const [selectableIndex, setSelectableIndex] = useState('')
  const slots = ['5:00 A.M - 6:30 A.M', '6:30 A.M - 8:00 A.M', '8:00 A.M - 9:30 A.M', '9:30 A.M - 11:00 A.M', '11:00 A.M - 12:30 P.M',
    '12:30 P.M - 2:00 P.M', '2:00 P.M - 3:30 P.M', '3:30 P.M - 5:00 P.M', '5:00 P.M - 6:30 P.M', '6:30 P.M - 8:00 P.M', '8:00 P.M - 9:30 P.M',
    '9:30 P.M - 11:00 P.M', '11:00 P.M - 12:30 A.M', '12:30 A.M - 2:00 A.M'
  ]
  const times = ['5:00', '6:30', '8:00', '9:30', '11:00',
    '12:30', '14:00', '15:30', '17:00', '18:30', '20:00',
    '21:30', '23:00', '24:30'
  ]
  useEffect(() => {
    setDateInfo()
  }, [])

  const handleSetIndex = () => {

    const parts = date.split("-");
    const localMidnight = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0).getTime();
    const now = new Date().getTime();
    for (let i = 0; i < times.length - 1; i++) {
      const [startHour, startMin] = times[i].split(':').map(Number);
      const [endHour, endMin] = times[i + 1].split(':').map(Number);

      const startTimeStamp = localMidnight + startHour * 3600000 + startMin * 60000;
      const endTimeStamp = localMidnight + endHour * 3600000 + endMin * 60000;

      if (now >= startTimeStamp && now < endTimeStamp) {
        return setSelectableIndex(i + 1);
      }
    }
    setSelectableIndex(0);
  };



  useEffect(() => {
    if (date) {
      handleSetIndex();
    }
  }, [date]);

  const handleCart = async () => {
    const placedOn = new Date().getTime()
    const { _id, name, email, phone } = authUser
    const cart = {
      userId: _id,
      name: name,
      email: email,
      phone: phone,
      date: date,
      slot: selectedSlot,
      slotName: selectedSlotName,
      placedOn: placedOn
    }
    if (!selected) {
      toast.error('No Selected Slot')
    }
    else {
      const response = await setCart(cart)
      if (response === 200) {
        setCartAdded(true)
      }
    }
  }
  const dateInformation = async (e) => {
    const turfInfo = {
      date: e,
      turf: 'xtraTime'
    }
    const response = await getDateInfo(turfInfo)
    if (response === 200) {
      setDate(e)
    }
  }

  const handleBook = async () => {
    const now = new Date().getTime();
    const parts = date.split("-");
    const localMidnight = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0).getTime();
    const startTime = times[selectedindex].split(':')
    const hour = startTime[0] * 60 * 60 * 1000
    const minute = startTime[1] * 60 * 1000
    const timeStamp = localMidnight + hour + minute
    const { _id, name, email, phone, } = authUser
    const cart = {
      userId: _id,
      name: name,
      email: email,
      phone: phone,
      date: date,
      slot: selectedSlot,
      slotName: selectedSlotName,
      turf: 'xtraTime',
      timeStamp: timeStamp,
      placedOn: now,
    }

    if(timeStamp<=now){
      toast.error('Slot time Already Passed')
    }
    else{
      const response = await placeBooking(cart)
    if (response === 200) {
      setCartAdded(false)
      setSelectedSlotName('')
      setSelectedSlot('')
      setSelected('')
      setselectedIndex('')
    }

  }
    }
  return (
    <div className='flex flex-col items-center justify-center gap-10 w-full h-full'>
      <div className='w-[80%] h-full flex flex-col justify-center items-center gap-10'>
        <p className='text-6xl overflow-hidden font-bold mt-5 h-20 gradient-animate bg-clip-text  transition-all bg-gradient-to-r from-red-600 to-blue-600 text-transparent gradient-animate'>
          XTRA Time</p>
        <div className='w-full overflow-hidden flex flex-col justify-center items-center gap-10'>
          <Carousel />
        </div>
        <p className='text-2xl font-bold tetx-center'>Find us on google maps:</p>
        <div>
          <div className='flex flex-col lg:flex-row items-center lg:items-start  justify-center gap-10 w-full mb-20'>
            <div className='w-96 h-96'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1826.629237923718!2d90.451487!3d23.
          702462!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b7001a0b7ce7%3A0xd02f7ade7b746510!2sSky%20Turf
          !5e0!3m2!1sen!2sbd!4v1745113056259!5m2!1sen!2sbd"
                className='w-96 h-96 border-0 rounded-2xl shadow-2xl shadow-black'
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div className='p-2 flex flex-col justify-start items-start gap-5'>
              <p className=' text-3xl font-bold'>Details:</p>
              <div className='flex flex-row gap-5 px-2 justify-center items-center'>
                <label className='font-bold text-xl'>Address:</label>
                <p>1/1, Meghna Tower, Rafiqul Islam Road, Shonir Akhra, Dhaka</p>
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
          <div className='flex flex-col gap-5 px-2 justify-center items-center'>
            <label className='font-bold text-xl'>Slot Price:</label>
            <label className=''>*Note: An addtional fee of BDT 499 will be added for weekends and holidays</label>
            <table className='border-2 w-full shadow-black shadow-2xl mb-10'>
              <thead className='border-2'>
                <tr><th className='border-2 w-[33%]'></th>
                  <th className='border-2 w-[33%] p-3'>Time</th>
                  <th className='border-2 w-[33%] p-3'>Weekdays Price</th></tr>
              </thead>
              <tbody>
                <tr className='border-2 text-center'>
                  <td rowSpan={3} className='bg-amber-200 text-black'>Morning Slot</td>
                  <td className='border-2 p-2'>5:00 A.M - 6:30 A.M</td>
                  <td className='border-2 p-2'>BDT 2,595</td>
                </tr>
                <tr className='border-2 text-center '>
                  <td className='border-2 p-2'>6:30 A.M - 8:00 A.M</td>
                  <td className='border-2 p-2'>BDT 2,595</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td className='border-2 p-2'>8:00 A.M - 9:30 A.M</td>
                  <td className='border-2 p-2'>BDT 2,595</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td rowSpan={5} className='bg-amber-50 text-black'>Day Slot</td>
                  <td className='border-2 p-2'>9:30 A.M - 11:00 A.M</td>
                  <td className='border-2 p-2'>BDT 2,299</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td className='border-2 p-2'>11:00 A.M - 12:30 P.M</td>
                  <td className='border-2 p-2'>BDT 2,299</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td className='border-2 p-2'>12:30 P.M - 2:00 P.M</td>
                  <td className='border-2 p-2'>BDT 2,299</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td className='border-2 p-2'>2:00 P.M - 3:30 P.M</td>
                  <td className='border-2 p-2'>BDT 2,299</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td className='border-2 p-2'>3:30 P.M - 5:00 P.M</td>
                  <td className='border-2 p-2'>BDT 2,299</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td rowSpan={6} className='bg-gray-950 text-white'>Night Slot</td>
                  <td className='border-2 p-2'>5:00 P.M - 6:30 P.M</td>
                  <td className='border-2 p-2'>BDT 3,499</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td className='border-2 p-2'>6:30 P.M - 8:00 P.M</td>
                  <td className='border-2 p-2'>BDT 3,499</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td className='border-2 p-2'>8:00 P.M - 9:30 P.M</td>
                  <td className='border-2 p-2'>BDT 3,499</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td className='border-2 p-2'>9:30 P.M - 11:00 P.M</td>
                  <td className='border-2 p-2'>BDT 3,499</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td className='border-2 p-2'>11:00 P.M - 12:30 A.M</td>
                  <td className='border-2 p-2'>BDT 3,499</td>
                </tr>
                <tr className='border-2 text-center'>
                  <td className='border-2 p-2'>12:30 A.M - 2:00 A.M</td>
                  <td className='border-2 p-2'>BDT 3,499</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex flex-col gap-5 px-2 py-2 justify-center items-center'>
            <label className='font-bold text-xl'>Pick a slot:</label>
            <div className='flex flex-row gap-5 px-2 justify-center items-center'>
              <label className='font-bold text-xl'>Date:</label>
              <input type='date' className='input w-70' min={today} onChange={(e) => { dateInformation(e.target.value) }} value={date} />
            </div>
            <div className={`flex flex-col gap-5 px-2 justify-center items-center mb-10`}>
              <label className='font-bold text-xl'>Available slots:</label>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-5 text-center'>
                {slots.map((slot, index) => (
                  <p key={index} className={` p-2 border-1 rounded-md  
                                            ${dateInfo[`S${index + 1}`] ? 'cursor-not-allowed bg-red-400' : index < selectableIndex ? 'cursor-not-allowed bg-base-100' : date ? 'cursor-pointer hover:scale-[1.02] active:scale-[1] bg-base-300 shadow-md shadow-black ' : 'cursor-not-allowed '} 
                                            ${selectedSlot === slots[index] ? 'bg-green-300 text-black ' : ''} transition-all `}
                    onClick={() => {
                      if (date && !dateInfo[`S${index + 1}`] && index >= selectableIndex) {
                        if (selectedSlot === slots[index]) {
                          setSelectedSlotName('')
                          setSelectedSlot('');
                          setSelected(false)
                          setselectedIndex('')
                        }
                        else {
                          setSelectedSlotName(`S${index + 1}`)
                          setSelectedSlot(slots[index]);
                          setSelected(true)
                          setselectedIndex(index)
                        }
                      }
                      if (dateInfo[`S${index + 1}`]) {
                        toast.error("Slot not available")
                      }

                    }}>{slot}</p>
                ))}
              </div>
            </div>
            {authUser ?  <button className={`mb-20 p-2 px-6 flex flex-row gap-2 items-center rounded-lg shadow-lg shadow-black  
                                            ${selected ? 'bg-green-300 text-black btn btn-md cursor-pointer' :
                            ' bg-gray-500 cursor-not-allowed'}`}
                          onClick={handleCart}
                        >
                          Continue<ArrowRight size={18} className='animate-pulse' /></button> :
                           <button className={`mb-20 p-2 px-6 flex flex-row gap-2 items-center rounded-lg shadow-lg shadow-black
                            ' bg-gray-500 cursor-not-allowed`}
                          onClick={()=>{toast.error('Please Log In')}}
                        >
                          Continue<ArrowRight size={18} className='animate-pulse' /></button>}
          </div>
        </div>
        <div className={`fixed top-0 left-0 z-100 ${cartAdded ? 'scale-100' : 'scale-0'} transition-all w-screen h-screen flex items-center justify-center`}>
          <div className='fixed flex flex-col items-start w-[70%] justify-center border-1 rounded-2xl bg-base-300 p-5 px-10'>
            <div className='flex flex-col justify-center items-center gap-5 w-full'>
              <div className='flex w-full justify-end'><X size={18} onClick={() => setCartAdded(false)} /></div>
              <div className='w-full flex flex-col gap-2'>
                <p className='bg-base-100 w-full rounded-md px-4 p-4 hover:scale-[1.01] transition-all'>Name: {cart.name}</p>
                <p className='bg-base-100 w-full rounded-md px-4 p-4 hover:scale-[1.01] transition-all'>Email: {cart.email}</p>
                <p className='bg-base-100 w-full rounded-md px-4 p-4 hover:scale-[1.01] transition-all'>Phone Number: +{cart.phone}</p>
                <p className='bg-base-100 w-full rounded-md px-4 p-4 hover:scale-[1.01] transition-all'>Date: {cart.date}</p>
                <p className='bg-base-100 w-full rounded-md px-4 p-4 hover:scale-[1.01] transition-all'>Slot: {cart.slot}</p>
                <p className='bg-base-100 w-full rounded-md px-4 p-4 hover:scale-[1.01] transition-all'>Slot Name: {cart.slotName}</p>
              </div>
              <button className='btn mt-5 btn-success w-30 rounded-md' onClick={handleBook}>Book Slot</button>
            </div>

          </div>
          <div className='bg-[rgba(0,0,0,0.5)] w-screen h-screen top-0 left-0 transition-all' onClick={() => setCartAdded(false)}></div>
        </div>
        {isbookingslot && <div className={`fixed top-0 left-0 z-100 transition-all w-screen h-screen flex items-center justify-center`}>
          <div className='fixed flex flex-col items-center w-[70%] justify-center p-5 px-10'>
            <BallLoader />
          </div>
          <div className='bg-[rgba(0,0,0,0.5)] w-screen h-screen top-0 left-0 transition-all'></div>
        </div>}
      </div>
    </div>
  )
}

export default SkyTurf

