import React, { useEffect, useState } from 'react'
import { useAdminStore } from '../../store/useAdminStore.js'
import { useAuthStore } from '../../store/useAuthStore.js'
import { Ban, Loader2, User, Mail, Phone, UserCog, Power } from 'lucide-react'
import AddAdmin from './InnerComponents/AddAdmin.jsx'
import UserDetails from './InnerComponents/UserDetails.jsx'
import DotLoader from '../skeleton/DotLoader.jsx'
function GetUsers() {
  const { authUser } = useAuthStore()
  const { users, getUsers, isGettingUsers, suspendUser, unSuspendUser } = useAdminStore()
  const [isloading, setIsLoading] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])
  const banUser = async (id) => {
    if (window.confirm('Are you sure you want to Ban this User?')) {
      setIsLoading(true)
      try {
        users.map((user) => {
          if (user._id === id) {
            user.status = 'suspended'
          }
        })
        suspendUser(users, id)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)

      }
    }
  }
  const unbanUser = (id) => {
    if (window.confirm('Are you sure you want to Unban this User?')) {
      setIsLoading(true)
      try {
        users.map((user) => {
          if (user._id === id) {
            user.status = 'active'
          }
        })
        unSuspendUser(users, id)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)

      }
    }
  }

  if (isGettingUsers) {
    return (
      <div>
        <DotLoader />
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center gap-10 min-h-screen w-full overflow-x-hidden'>
      <div className='w-full max-w-5xl px-4 h-full flex flex-col justify-center items-center gap-5'>
        {/* Current User Info */}
        <div className='w-[22rem] md:w-[35rem] lg:w-[45rem] flex flex-col justify-between bg-[#75757581] p-2 rounded-2xl transition-all shadow-md shadow-black'>
          <p className='h-10 p-2 w-full text-xl font-bold'>
            Current User:{' '}
            <label className={`${authUser?.role === 'admin' ? 'text-green-600' : ''}`}>
              {authUser?.role}
            </label>
          </p>
          <div className='p-2 px-4 bg-base-300 rounded-xl flex flex-col gap-3 shadow-sm shadow-black'>
            <p className='flex flex-row gap-2 items-center text-lg p-1 w-[100%] md:w-[70%] border-b-1 transition-all'> <User size={18} />Name: {authUser?.name}</p>
            <p className='flex flex-row gap-2 items-center text-lg p-1 w-[100%] md:w-[70%] border-b-1 transition-all'> <Mail size={18} />Email: {authUser?.email}</p>
            <p className='flex flex-row gap-2 items-center text-lg p-1 w-[100%] md:w-[70%] border-b-1 transition-all'> <Phone size={18} />Phone Number: {authUser?.phone}</p>
          </div>
        </div>

        {/* Admins List */}
        <div className='w-[22rem] md:w-[35rem] lg:w-[45rem] transition-all flex flex-col justify-between bg-[#75757581] p-2 rounded-2xl overflow-hidden shadow-md shadow-black'>
          <div className='flex flex-row mb-3 p-2'>
            <p className='h-10  w-full text-xl font-bold'>Admins:</p>
            <AddAdmin />
          </div>
          {users
            .filter((user) => user.role === 'admin')
            .map((user, _id) => {
              const phone = String(user.phone).split('88')[1]
              return (
                <div
                  className='p-2 px-4 bg-base-300 rounded-xl flex flex-col gap-3 mb-5 shadow-sm shadow-black overflow-hidden'
                  key={_id}
                >
                  <div className='w-full flex flex-col md:flex-row justify-between transtion-all gap-5 p-2'>
                    <div className='px-5 w-[100%] md:w-[60%]'>
                      <p className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[100%] border-b-1 transition-all pl-5'><User size={18} />Name: {user.name}</p>
                      <a href={`mailto:${user.email}`} className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[100%] border-b-1 transition-all pl-5 text-green-600'>
                        <Mail size={18} />Email: {user.email}
                      </a>
                      <a href={`tel:${phone}`} className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[100%] border-b-1 transition-all pl-5 text-blue-600'><Phone size={18} />
                        Phone Number: {phone}
                      </a>
                      <p className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[100%] border-b-1 transition-all pl-5'><UserCog size={18} />
                        User role: {user.role}
                      </p>
                    </div>
                    <div className='flex flex-row sm:flex-col items-center justify-center sm:items-end'>
                      <div className='flex flex-row mb-3 p-2'>
                        <UserDetails props={{ user }} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        {/* Users List */}
        <div className='w-[22rem] md:w-[35rem] lg:w-[45rem] transition-all flex flex-col justify-between bg-[#75757581] p-2 rounded-2xl overflow-hidden shadow-md shadow-black mb-10'>
          <p className='h-10 p-2 w-full text-xl font-bold text-center mb-2'>Users</p>
          {users
            .filter((user) => user.role !== 'admin')
            .map((user, index) => {
              const phone = String(user.phone).split('88')[1]
              return(
                <div
                  className='p-2 px-4 bg-base-300 rounded-xl flex flex-col gap-3 mb-5 shadow-sm shadow-black overflow-hidden'
                  key={index}
                >
                  <div className='w-full flex flex-col md:flex-row justify-between transtion-all gap-5 p-2'>
                    <div className='px-5 w-[100%] md:w-[60%]'>
                      <p className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[100%] border-b-1 transition-all pl-5'><User size={18} />Name: {user.name}</p>
                      <a href={`mailto:${user.email}`} className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[100%] border-b-1 transition-all pl-5 text-green-600'>
                        <Mail size={18} />Email: {user.email}
                      </a>
                      <a href={`tel:${phone}`} className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[100%] border-b-1 transition-all pl-5 text-blue-600'><Phone size={18} />
                        Phone Number: {phone}
                      </a>
                      <p className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[100%] border-b-1 transition-all pl-5'><UserCog size={18} />
                        User role: {user.role}
                      </p>
                      <p className='break-words overflow-hidden text-ellipsis flex flex-row gap-2 items-center text-lg p-1 w-[100%] border-b-1 transition-all pl-5'><Power size={18} /> Status: {' '}
                        <label className={`${user.status === 'suspended' ? 'text-red-500 font-semibold' : 'text-green-500 font-semibold'}`}>
                          {user.status === 'suspended' ? 'Suspended' : 'Active'}</label>
                      </p>
  
                    </div>
                    <div className='flex flex-row mb-3 p-2 justify-center items-center gap-5 sm:flex-col'>
                      <div className='flex flex-row '>
                        <UserDetails props={{ user }} />
                      </div>
                      {isloading ? <button className={`btn btn-success w-22 text-center flex flex-row relative  shadow-md shadow-black`}>
                        <Loader2 size={18} className='animate-spin' />
                      </button> : <button className={`btn flex  w-22 text-center flex-row ${user.status === 'active' ? 'btn-error' : 'btn-success'} shadow-md shadow-black`} onClick={() => { user.status == 'active' ? banUser(user._id) : unbanUser(user._id) }}>
                        <p className='flex flex-row justify-center items-center gap-1 '>
                          <Ban size={18} />
                          {user.status === 'active' ? 'Ban' : 'Unban'}
                        </p>
                      </button>}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default GetUsers
