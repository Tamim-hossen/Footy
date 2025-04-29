import React, { useEffect, useState } from 'react'
import { ExternalLink, Mail, User, Phone, Ban, Loader2,Clock,Calendar,Bookmark,Boxes } from 'lucide-react'
import { useAdminStore } from '../../../store/useAdminStore'
import BallLoader from '../../skeleton/BallLoader.jsx'
function UserDetails({ props }) {
    const { users, suspendUser, unSuspendUser, removeadmin, isRemovingAdmin, isbanningOrUnbaning,getUSerDetails,isGettinginddividualDetails,individualDetails } = useAdminStore()
    const [windowed, setWindowed] = useState(false)
    const received = { props }
    const user = received.props.user
    const images = ['https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-56-09_rerarm.svg',
        'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-57-39_m3xzue.svg',
        'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-59-37_a3gxk3.svg',
        'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-56-59_bu739x.svg',
        'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-59-01_zxklkz.svg',
        'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-58-03_kofuex.svg']
    const bg = Math.floor(Math.random() * images.length)
    const phone = String(user.phone).replace(/^88/, '')

    useEffect(()=>{
        getUSerDetails(user._id)
    },[windowed])

    const handleRemoveAdmin = async () => {
        if (window.confirm(`Are you sure you want to remove ${user.name} from admin list?`)) {
            try {
                users.map((currentuser) => {
                    if (currentuser.email === user.email) {
                        currentuser.role = 'user'
                    }
                })
                await removeadmin(users, user.email)

            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleBanUnban = async () => {
        if (user.status === 'active') {
            try {
                if (window.confirm(`Are you sure You want to ban ${user.name} ?`)) {
                    users.map((currentUser) => {
                        if (currentUser.email === user.email) {
                            currentUser.status = 'suspended'
                        }
                    })
                    suspendUser(users, user._id)
                }

            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                if (window.confirm(`Are you sure You want to unban ${user.name} ?`)) {
                    users.map((currentUser) => {
                        if (currentUser.email === user.email) {
                            currentUser.status = 'active'
                        }
                    })
                    unSuspendUser(users, user._id)
                }

            } catch (error) {
                console.log(error)
            }

        }
    }
    return (
        <div className=''>
            <button className='btn flex flex-row btn-info shadow-md shadow-black' onClick={() => { setWindowed(true) }}><ExternalLink size={18} />View</button>
            <div className={`fixed top-0 left-0 z-100 ${windowed ? 'scale-100' : 'scale-0'} transition-all w-screen h-screen flex items-center justify-center `}>
                <div className='fixed flex flex-col items-center w-[70%] max-h-full h-[90%] justify-start border-2 rounded-xl overflow-y-scroll overflow-x-hidden no-scrollbar bg-base-300'>
                    <div style={{ backgroundImage: `url(${images[bg]})` }} className={`bg-cover w-[90%] mt-[5%] h-75 rounded-2xl relative items-center flex justify-center mb-15`}>
                        <div className=' text-black absolute -bottom-20 '>
                            <p className={`w-8 h-8  absolute bottom-6 right-6 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <p className='border-20 border-base-300 rounded-full'><User size={150} className='p-4 bg-white rounded-full' /></p>
                        </div>
                        <div className=' absolute -bottom-30 right-0'>
                            {user.role === 'admin' ? isRemovingAdmin ?
                                <p className={`btn h-12 w-20 lg:w-42 absolute bottom-3 right-3 shadow-md shadow-black btn-error`}>
                                    <Loader2 size={25} className='animate-spin' />
                                </p> :
                                <p className={`btn h-12 w-20 -z-5 lg:w-42 absolute bottom-3 right-3 shadow-md shadow-black btn-error text-md`} onClick={handleRemoveAdmin}>
                                    <Ban className='hidden lg:flex' />Remove admin
                                </p> :
                                isbanningOrUnbaning ? <p className={`btn h-12 w-20 absolute bottom-3 right-3 shadow-md shadow-black btn-success`}
                                    
                                >
                                    <Loader2 size={25} className='animate-spin' />
                                </p> :
                                    <p className={`btn h-12 w-20 absolute bottom-3 right-3 shadow-md shadow-black ${user.status === 'active' ? 'btn-error' : 'btn-success'} text-md`}
                                        onClick={handleBanUnban}
                                    >
                                        <Ban size={28} />{user.status === 'active' ? 'Ban' : 'Unban'}
                                    </p>}
                        </div>
                        <div className=' absolute top-100 flex flex-col justify-center items-center gap-2 w-[80%]'>
                            <p className='text-4xl font-bold'>{user.name}</p>
                            <div className='flex flex-row gap-5'>
                                <a href={`mailto:${user.email}`} className='flex flex-row gap-2 justify-center items-center hover:underline text-blue-600 text-xl'><Mail />{user.email}</a>
                                <a href={`tel:${phone}`} className='flex flex-row gap-2 justify-center items-center hover:underline text-green-600 text-xl'><Phone />{phone}</a>
                            </div>
                            <p className='text-center text-2xl font-bold my-5'>History</p>
                            <div className='w-full flex flex-col justify-center bg-[#75757581] rounded-xl transition-all items-center mb-5'>
                            <div className='w-[90%] my-2 rounded-xl bg-base-300'>
                            {individualDetails.length > 0 ? <p className='text-center text-3xl font-bold my-5'>Current Game</p>:''}
                            {isGettinginddividualDetails ? <div className='flex justify-center items-center'><BallLoader/></div>:individualDetails.length > 0 ? individualDetails.map((data,index)=>{
                                const now = new Date().getTime()
                                const playTime  =new Date(data.timeStamp).toLocaleTimeString('en-US')
                                const timeLeft = data.timeStamp - now
                                return(
                                <div key={index}>
                                    {timeLeft < 0 && timeLeft > -5400000 ?
                                    <div className='bg-base-100 mx-5 my-3 rounded-2xl p-4 flex flex-col justify-center items-center'>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Calendar size={18}/>{data.date}</p>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Clock size={18}/>{playTime}</p>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Bookmark size={18}/>{data.slotName}</p>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Boxes size={18}/>{data.turf}</p>
                                    </div>:<p></p>
                                    } 
                                </div>
                            )}):<p></p>}
                            </div>
                            <div className='w-[90%] my-2 rounded-xl bg-base-300'>
                            {individualDetails.length > 0 ? <p className='text-center text-3xl font-bold my-5'>Upcoming Games</p>:''}
                            {isGettinginddividualDetails ? <div className='flex justify-center items-center'><BallLoader/></div>:individualDetails.length > 0 ? individualDetails.map((data,index)=>{
                                const now = new Date().getTime()
                                const playTime  =new Date(data.timeStamp).toLocaleTimeString('en-US')
                                const timeLeft = data.timeStamp - now
                                return(
                                <div key={index}>
                                    {timeLeft > 0 &&
                                    <div className='bg-base-100 mx-5 my-3 rounded-2xl p-4 flex flex-col justify-center items-center'>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Calendar size={18}/>{data.date}</p>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Clock size={18}/>{playTime}</p>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Bookmark size={18}/>{data.slotName}</p>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Boxes size={18}/>{data.turf}</p>
                                    </div>
                                    } 
                                </div>
                            )}):<p className='p-5'>No data Found!!</p>}
                            </div>
                            <div className='w-[90%] my-2 rounded-xl bg-base-300'>
                            {individualDetails.length > 0 ? <p className='text-center text-3xl font-bold my-5'>Already played</p>:''}
                            {isGettinginddividualDetails ? <div className='flex justify-center items-center'><BallLoader/></div>:individualDetails.length > 0 ? individualDetails.map((data,index)=>{
                                const now = new Date().getTime()
                                const playTime  =new Date(data.timeStamp).toLocaleTimeString('en-US')
                                const timeLeft = data.timeStamp - now
                                return(
                                <div key={index}>
                                    {timeLeft < 0 && timeLeft < -5400000 ?
                                    <div className='bg-base-100 mx-5 my-3 rounded-2xl p-4 flex flex-col justify-center items-center'>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Calendar size={18}/>{data.date}</p>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Clock size={18}/>{playTime}</p>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Bookmark size={18}/>{data.slotName}</p>
                                        <p className='flex flex-row gap-2 items-center text-lg p-1 w-[90%] border-b-1 transition-all justify-center'><Boxes size={18}/>{data.turf}</p>
                                    </div>:<p></p>
                                    } 
                                </div>
                            )}):<p></p>}
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='bg-[rgba(0,0,0,0.5)] w-screen h-screen top-0 left-0 transition-all' onClick={() => { setWindowed(false) }}></div>
            </div>
        </div>
    )
}

export default UserDetails