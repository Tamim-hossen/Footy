import React, { useEffect, useState, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '../store/useThemeStore.js'
import { User, Pen, Mail, Phone, PenLine, Lock, Eye, EyeClosed,Loader2 } from 'lucide-react'
import BallLoader from '../components/skeleton/BallLoader.jsx'
import toast from 'react-hot-toast'
function Profile() {
  const { theme } = useThemeStore()
  const { authUser, isCheckingAuth, passwordChange,changeProfileInfo,isChangingPassword,isUpdatingProfile } = useAuthStore()
  const nav = useNavigate()
  const [user, setUser] = useState({ name: '', email: '', phone: '', currentPassword: '' });
  const [changeEdited, setChangeEdited] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [bg, setBg] = useState('')
  const [editable, setEditable] = useState('')
  const images = ['https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-56-09_rerarm.svg',
    'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-57-39_m3xzue.svg',
    'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-59-37_a3gxk3.svg',
    'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-56-59_bu739x.svg',
    'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-59-01_zxklkz.svg',
    'https://res.cloudinary.com/ddvwykjjv/image/upload/v1745769604/patternpad-2025-04-27-21-58-03_kofuex.svg']

  const nameInputRef = useRef(null)
  const emailInpurRef = useRef(null)
  const phoneInpurRef = useRef(null)
  useEffect(() => {

    if (!authUser) {
      scrollTo({ top: 0 })
      nav('/')
    }
    else {
      setUser({ name: authUser.name, email: authUser.email, phone: authUser.phone });
      setBg(Math.floor(Math.random() * images.length))
    }
  }, [])
  useEffect(() => {
    if (editable === 'name') {
      nameInputRef.current?.focus();
    }
    else if (editable === 'email') {
      emailInpurRef.current?.focus();
    }
    else if (editable === 'phone') {
      phoneInpurRef.current?.focus();
    }
  }, [editable]);
  const handleProfileEdit = async()=>{
    if(user.currentPassword.length < 6){
      toast.error('Passwords Must be at least 6 characters long!!')
    }
    else{
      try {
        const response = await changeProfileInfo(user)
        if(response === 200){
          setChangeEdited(false)
          setUser({ ...user, currentPassword: '' })
        }
      } catch (error) {
        console.log(error)
      }
    }

  }

  const handlePasswordChange = async () => {
    if (passwords.currentPassword.length < 6 || passwords.newPassword.length < 6 || passwords.confirmNewPassword.length < 6) {
      toast.error('Passwords Must be at least 6 characters long!!')
    }
    else if (passwords.newPassword !== passwords.confirmNewPassword) {
      toast.error('Passwords do not match!!')
    }
    else if (passwords.newPassword === passwords.currentPassword) {
      toast.error('New password Cannot be same as old password!!')
    }
    else {
      try {
        const response = await passwordChange(passwords)
        if (response === 200) {
          setPasswords({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          })
          setChangePassword(false)
          setShowPass(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  if (isCheckingAuth) {
    return(<div className={`flex flex-col items-center justify-center gap-10 w-full relative h-fixed ${theme === 'light' ?
      'bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1745681240/bgdoolde_m0dfxy.png)]' : 'bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1745680945/bgdooldewhite_eapomc.png)]'
      }`}>
      <BallLoader />
    </div>)
  }
  if (isCheckingAuth) {
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
        <p className='text-5xl font-bold mt-20'>Profile</p>
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
          <div className='flex justify-center mb-5'><p className='text-lg font-bold'>Account Status: <label className={`${authUser.status === 'active' ? 'text-green-600' :'text-red-600'} animate-pulse`}>{authUser.status === 'active' ? 'Active':'Suspended'}</label></p></div>
          {/*Name */}
          <div className='flex flex-col justify-center items-center mb-5'>
            <p className='text-xl font-bold'>Name</p>
            <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <User className={` h-5 w-5 text-base-content/40 ${changePassword || changeEdited ? '' : 'z-10'} transition-all`} />
              </div>
              {editable === 'name' ?
                <input
                  type='text'
                  ref={nameInputRef}
                  className={`input input-bordered w-full pl-10 ${editable === 'name' ? '' : ''} `}
                  placeholder={authUser.name}
                  value={user?.name}
                  required
                  onChange={(e) => { setUser({ ...user, name: e.target.value }) }}
                /> :
                <p className='input input-bordered w-full pl-10 cursor-default'>{user ? user.name : authUser.name}</p>
              }
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer' title='Edit' onClick={() => { setEditable((prev) => (prev === 'name' ? '' : 'name')) }}>
                {editable === 'name' ? <PenLine className=' h-5 w-5' /> : <Pen className=' h-5 w-5' />}
              </div>
            </div>
          </div>
          {/*Email */}
          <div className='flex flex-col justify-center items-center mb-5'>
            <p className='text-xl font-bold'>Email</p>
            <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className={` h-5 w-5 text-base-content/40 ${changePassword || changeEdited ? '' : 'z-10'} transition-all`} />
              </div>
              {editable === 'email' ?
                <input
                  type='email'
                  ref={emailInpurRef}
                  className={`input input-bordered w-full pl-10 `}
                  placeholder={authUser.email}
                  value={user?.email}
                  required
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                /> :
                <p className='input input-bordered w-full pl-10 cursor-default'>{user ? user.email : authUser.email}</p>
              }
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer' title='Edit' onClick={() => { setEditable((prev) => (prev === 'email' ? '' : 'email')) }}>
                {editable === 'email' ? <PenLine className=' h-5 w-5' /> : <Pen className=' h-5 w-5' />}
              </div>
            </div>
          </div>
          {/*Phone */}
          <div className='flex flex-col justify-center items-center mb-5'>
            <p className='text-xl font-bold'>Phone Number</p>
            <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Phone className={` h-5 w-5 text-base-content/40 ${changePassword || changeEdited ? '' : 'z-10'} transition-all`} />
              </div>
              {editable === 'phone' ?
                <input
                  type='number'
                  ref={phoneInpurRef}
                  className={`input input-bordered w-full pl-10 `}
                  placeholder={authUser.phone}
                  value={user?.phone}
                  required
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                /> :
                <p className='input input-bordered w-full pl-10 cursor-default'>{user ? user.phone : authUser.phone}</p>
              }
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer' title='Edit' onClick={() => { setEditable((prev) => (prev === 'phone' ? '' : 'phone')) }}>
                {editable === 'phone' ? <PenLine className=' h-5 w-5' /> : <Pen className=' h-5 w-5' />}
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center mb-5'><button className='btn bg-green-200 text-gray-900' onClick={() => { setChangePassword(true) }}>Change Password</button></div>
          <div className={`mb-20 flex flex-row justify-center items-center gap-30 ${user.name !== authUser.name ? 'scale-100' :
             user.email !== authUser.email ? 'scale-100' : user.phone !== authUser.phone ? 'scale-100':'scale-0'} transition-all duration-700`}>
            <button className='btn bg-green-300 text-black' onClick={()=>{setChangeEdited(true)}}>Save</button>
            <button className='btn bg-red-300 text-black' onClick={()=>{setUser({...user, name:authUser.name,email:authUser.email,phone:authUser.phone});setEditable('')}}>Cancel</button>
          </div>
        </div>
      </div>
      {/*password */}
      <div className={`fixed top-0 ${changePassword ? 'scale-100' : 'scale-0'} transition-all w-full h-full flex items-center justify-center`}>
        <div className='absolute w-[70%] h-[80%] flex flex-col items-center justify-center z-20 border-2 rounded-2xl bg-[#000000bc]'>
          {/*Current*/}
          <div className='flex flex-col justify-center items-center mb-5 w-full'>
            <p className='text-xl font-bold mb-5'>Current Password</p>
            <div className={`w-[75%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className=' h-5 w-5 z-10 text-base-content/40' />
              </div>
              <input
                type={showPass ? 'text' : 'password'}
                className={`input input-bordered w-full pl-10 `}
                placeholder='Enter Current Password'
                value={passwords.currentPassword}
                required
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer' title={`${showPass ? 'Hide Password' : 'Show Password'}`} onClick={() => { setShowPass((prev) => !prev) }}>
                {showPass ? <EyeClosed className=' h-5 w-5' /> : <Eye className=' h-5 w-5' />}
              </div>
            </div>
          </div>
          {/*New*/}
          <div className='flex flex-col justify-center items-center mb-5 w-full'>
            <p className='text-xl font-bold mb-5'>New Password</p>
            <div className={`w-[75%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className=' h-5 w-5 z-10 text-base-content/40' />
              </div>
              <input
                type={showPass ? 'text' : 'password'}
                className={`input input-bordered w-full pl-10 `}
                placeholder='Enter New Password'
                value={passwords.newPassword}
                required
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer' title={`${showPass ? 'Hide Password' : 'Show Password'}`} onClick={() => { setShowPass((prev) => !prev) }}>
                {showPass ? <EyeClosed className=' h-5 w-5' /> : <Eye className=' h-5 w-5' />}
              </div>
            </div>
          </div>
          {/*Confirm*/}
          <div className='flex flex-col justify-center items-center mb-5 w-full'>
            <p className='text-xl font-bold mb-5'>Confirm Password</p>
            <div className={`w-[75%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className=' h-5 w-5 z-10 text-base-content/40' />
              </div>
              <input
                type={showPass ? 'text' : 'password'}
                className={`input input-bordered w-full pl-10 `}
                placeholder='Enter Current Password'
                value={passwords.confirmNewPassword}
                required
                onChange={(e) => setPasswords({ ...passwords, confirmNewPassword: e.target.value })}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer' title={`${showPass ? 'Hide Password' : 'Show Password'}`} onClick={() => { setShowPass((prev) => !prev) }}>
                {showPass ? <EyeClosed className=' h-5 w-5' /> : <Eye className=' h-5 w-5' />}
              </div>
            </div>
          </div>
          {isChangingPassword ?<div>
            <button className='btn bg-green-300 text-black w-26'><Loader2 className='animate-spin'/></button>
          </div> :<div>
            <button className='btn bg-green-300 text-black' onClick={handlePasswordChange}>Submit</button>
          </div>}
        </div>
        <div className='absolute w-screen h-screen z-15 bg-[#0000009f]' onClick={() => setChangePassword(false)} />
      </div>
      {/*save */}
      <div className={`fixed top-0 ${changeEdited ? 'scale-100' : 'scale-0'} transition-all w-full h-full flex items-center justify-center`}>
        <div className='absolute w-[70%] h-[80%] flex flex-col items-center justify-center z-20 border-2 rounded-2xl bg-[#000000bc]'>
          {/*Current*/}
          <div className='flex flex-col justify-center items-center mb-5 w-full'>
            <p className='text-xl font-bold mb-5'>Current Password</p>
            <div className={`w-[75%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className=' h-5 w-5 z-10 text-base-content/40' />
              </div>
              <input
                type={showPass ? 'text' : 'password'}
                className={`input input-bordered w-full pl-10 `}
                placeholder='Enter Current Password'
                value={user.password}
                required
                onChange={(e) => setUser({ ...user, currentPassword: e.target.value })}
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer' title={`${showPass ? 'Hide Password' : 'Show Password'}`} onClick={() => { setShowPass((prev) => !prev) }}>
                {showPass ? <EyeClosed className=' h-5 w-5' /> : <Eye className=' h-5 w-5' />}
              </div>
            </div>
          </div>
          {isUpdatingProfile ? <div><button className='btn bg-green-300 text-black w-50'><Loader2 className='animate-spin'/></button></div>:
          <div className='flex flex-row gap-10'>
            <button className='btn bg-green-300 text-black' onClick={handleProfileEdit}>Submit</button>
            <button className='btn bg-red-300 text-black' onClick={() => {setChangeEdited(false);setShowPass((prev) => !prev)}}>Cancel</button>
          </div> }
        </div>
        <div className='absolute w-screen h-screen z-15 bg-[#0000009f]'  />
      </div>
    </div>
  )
}

export default Profile