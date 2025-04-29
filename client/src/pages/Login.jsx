import React, { useEffect, useState } from 'react'
import { useThemeStore } from '../store/useThemeStore.js'
import { Eye, Lock, EyeClosed, Mail, Phone,User,UserPlus, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore.js'
import BallLoader from '../components/skeleton/BallLoader.jsx'
import { useNavigate } from 'react-router-dom'
function Login() {
  const { theme } = useThemeStore()
  const authUser = useAuthStore((state) => state.authUser);
  const {isSigningIn,isSigningUp,signIn,signUp} = useAuthStore()
  const [showPass, setShowPass] = useState(false)
  const nav= useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [formData2, setFromData2] = useState({
    name: '',
    email: '',
    confirmEmail:'',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const [login, setLogin] = useState(true)

  useEffect(()=>{
    if(authUser){
      nav('/')
    }
  },[authUser ])

  const handleLogin =async (e) => {
    e.preventDefault()
    if(formData.password.length < 6){
      toast.error("Password should be at least 6 characters")
    }
    else{
      try {
        const response = await signIn(formData)
        if(response.status === 200){
          setFormData({...formData,email:'',password:''})
          nav('/')
          toast.success("Logged in successfully")
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleRegister =async (e) => {
    e.preventDefault()
    const isValid = /^\d{10}$/.test(formData2.phone)
    if(formData2.email !== formData2.confirmEmail){
      toast.error("Emails Do not match")
    }
    else if(formData2.phone.length !==10 ){
      toast.error('Invalid Phone Number')
    }
    else if(formData2.password.length<6){
      toast.error("Password should be at-least 6 Characters")
    }
    else if(formData2.password !== formData2.confirmPassword){
      toast.error("Passwords do not match")
    }
    else if(!isValid){
      toast.error("Not a valid phone number")
    }
    else{
      try {
        const response = await signUp(formData2)
        if(response.status===200){
          toast.success('User Created Successfully')
          setLogin(true)
          scrollTo({top:0,behavior:'smooth'})
          setFromData2({...formData2, 
            name: '',
            email: '',
            confirmEmail:'',
            phone: '',
            password: '',
            confirmPassword: ''})
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  if(isSigningUp){
    return(
      <div>
        <BallLoader/>
      </div>
    )
  }
  if(isSigningIn){
    return(
      <div>
        <BallLoader/>
      </div>
    )
  }
  return (
    <div>
      <div className='relative w-full min-h-screen'>
        <img
          src={theme === 'light' ? 'https://res.cloudinary.com/ddvwykjjv/image/upload/v1744891001/bg8_jbqiyp.png' : 'https://res.cloudinary.com/ddvwykjjv/image/upload/v1744890999/bg9_s2ou2u.png'}
          alt='background'
          className='fixed -z-10  w-screen'
        />
        <div className=' fixed w-full h-screen bg-[rgba(0,0,0,0.15)] -z-9'></div>
        <div className={`flex justify-center w-full flex-col items-center gap-5  h-full`}>


          {/*Login */}
          <div className={` my-20 bg-[rgba(0,0,0,0.7)] rounded-xl w-[75%] text-white `}>
            <div className={`${login ? 'block duration-800':'absolute -translate-y-[42rem] scale-0 duration-0'}  transition-all flex flex-col ` }>
              <div className='flex justify-center mt-20'>
              <User className='animate-bounce' size={50}/>
              </div>
            <p className='text-center mt-10 text-4xl font-bold'>Log In</p>
            <p className='text-center mt-2 text-xl font-bold'>To your Account</p>
            <form onSubmit={handleLogin} className='p-8'>
              <div className='flex flex-col items-center my-4'>
                <p className='my-2 text-md font-bold'>E-mail</p>
                <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className=' h-5 w-5 z-10 text-base-content/40' />
                  </div>
                  <input
                    type='email'
                    className='input input-bordered w-full pl-10'
                    placeholder='Someone@example.com'
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center my-4 mb-8'>
                <p className='my-2 text-md font-bold'>Password</p>
                <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className=' h-5 w-5 z-10 text-base-content/40' />
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    className='input input-bordered w-full pl-10'
                    placeholder='********'
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                    onClick={() => { setShowPass((prev) => !prev) }}
                  >
                    {showPass ? <Eye className='h-5 w-5 z-10 text-base-content/40 ' /> : <EyeClosed className='h-5 w-5 z-10 text-base-content/40 ' />}
                  </div>
                </div>
              </div>
              <div className='flex justify-center'>{isSigningIn ? <p type='submit' className='btn btn-accent w-20 cur'><Loader2 className='animate-spin'/></p>:<button type='submit' className='btn btn-accent w-20'>Log In</button>}</div>
            </form>
            <div className='flex justify-center mb-20 mt-10 flex-col items-center gap-5'>
              <p>Don't Have an Account?</p>
              <button className='btn btn-accent w-40' onClick={() => {setLogin(false);scrollTo({top:0, behavior:'smooth'})}}>Register</button>
            </div>
          </div>
          {/*Register */}
          
           <div className={`${login ? 'fixed translate-y-[42rem] scale-0':'block'} duration-800 transition-all`}>
           <div className='flex justify-center mt-20'>
              <UserPlus className='animate-bounce' size={50}/>
              </div>
           <p className='text-center mt-10 text-4xl font-bold'>Register</p>
            <p className='text-center mt-2 text-xl font-bold'>To get started</p>
            <form onSubmit={handleRegister} className='p-8'>
              <div className='flex flex-col items-center my-4'>
                <p className='my-2 text-md font-bold'>Name</p>
                <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className=' h-5 w-5 z-10 text-base-content/40' />
                  </div>
                  <input
                    type='text'
                    className='input input-bordered w-full pl-10'
                    placeholder='Your Name'
                    value={formData2.name}
                    required
                    onChange={(e) => setFromData2({ ...formData2, name: e.target.value })}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center my-4'>
                <p className='my-2 text-md font-bold'>E-mail</p>
                <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className=' h-5 w-5 z-10 text-base-content/40' />
                  </div>
                  <input
                    type='email'
                    className='input input-bordered w-full pl-10'
                    placeholder='Someone@example.com'
                    value={formData2.email}
                    required
                    onChange={(e) => setFromData2({ ...formData2, email: e.target.value })}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center my-4'>
                <p className='my-2 text-md font-bold'>Confirm E-mail</p>
                <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className=' h-5 w-5 z-10 text-base-content/40' />
                  </div>
                  <input
                    type='email'
                    className='input input-bordered w-full pl-10'
                    placeholder='Someone@example.com'
                    required
                    value={formData2.confirmEmail}
                    onChange={(e) => setFromData2({ ...formData2, confirmEmail: e.target.value })}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center my-4'>
                <p className='my-2 text-md font-bold'>Phone Number</p>
                <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Phone className=' h-5 w-5 z-10 text-base-content/40' />
                  </div>
                  <div className='absolute inset-y-0 left-0 pl-10 flex items-center justify-center pointer-events-none'>
                    <p className=' h-6 w-10 z-10 text-base-content/40' >+880</p>
                  </div>
                  <input
                    type='text'
                    className='input input-bordered w-full pl-22'
                    required
                    value={formData2.phone}
                    onChange={(e) => setFromData2({ ...formData2, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center my-4 mb-8'>
                <p className='my-2 text-md font-bold'>Password</p>
                <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className=' h-5 w-5 z-10 text-base-content/40' />
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    className='input input-bordered w-full pl-10'
                    placeholder='********'
                    required
                    value={formData2.password}
                    onChange={(e) => setFromData2({ ...formData2, password: e.target.value })}
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                    onClick={() => { setShowPass((prev) => !prev) }}
                  >
                    {showPass ? <Eye className='h-5 w-5 z-10 text-base-content/40 ' /> : <EyeClosed className='h-5 w-5 z-10 text-base-content/40 ' />}
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-center my-4 mb-8'>
                <p className='my-2 text-md font-bold'>Confirm Password</p>
                <div className={`w-[75%] lg:w-[60%] relative transition-all ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className=' h-5 w-5 z-10 text-base-content/40' />
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    className='input input-bordered w-full pl-10'
                    placeholder='********'
                    required
                    value={formData2.confirmPassword}
                    onChange={(e) => setFromData2({ ...formData2, confirmPassword: e.target.value })}
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                    onClick={() => { setShowPass((prev) => !prev) }}
                  >
                    {showPass ? <Eye className='h-5 w-5 z-10 text-base-content/40 ' /> : <EyeClosed className='h-5 w-5 z-10 text-base-content/40 ' />}
                  </div>
                </div>
              </div>
              <div className='flex justify-center'>{isSigningUp ? <p type='submit' className='btn btn-accent w-20 cur'><Loader2 className='animate-spin'/></p>:<button type='submit' className='btn btn-accent w-20'>Register</button>}</div>
            </form>
            <div className='flex justify-center mb-20 mt-10 flex-col items-center gap-5'>
              <p>Already Have an Account?</p>
              <button className='btn btn-accent w-40' onClick={() => {setLogin(true);scrollTo({top:0, behavior:'smooth'})}}>Log In</button>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login