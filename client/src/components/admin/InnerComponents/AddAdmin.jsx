import React, { useState } from 'react'
import { useAdminStore } from '../../../store/useAdminStore'
import { BadgePlus, Mail } from 'lucide-react'

function AddAdmin() {
    const [windowed, setWindowed] = useState(false)
    const[email,setEmail]= useState('')
    const { users,addadmin } = useAdminStore()
    const handleAddAdmin = async(e)=>{
        e.preventDefault()
        users.map((user)=>{
            if(user.email=== email){
                user.role = 'admin'
            }
        })
        const response =await addadmin(users,email)
        if(response === 200){
            setEmail('')
            setWindowed(false)
        }

    }
    return (
        <div>
            <button className='btn btn-success flex flex-row relative shadow-black shadow-md' onClick={() => { setWindowed(true) }}><BadgePlus size={18} />Add Admin</button>
            <div className={`fixed top-0 left-0 z-100 ${windowed ? 'scale-100' : 'scale-0'} transition-all w-screen h-screen flex items-center justify-center`}>
                <form className='fixed flex flex-col items-center w-[50%] justify-center' onSubmit={handleAddAdmin}>
                    <div className='flex flex-col w-full justify-center items-center  bg-base-300 rounded-xl shadow-2xl shadow-black'>
                        <div className='flex w-full flex-col items-center my-4'>
                            <p className=' text-md font-bold my-2 text-center text-xl'>Enter user-email to add to Admin list:</p>
                            <div className={`w-[75%] lg:w-[60%] relative transition-all`}>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className=' h-5 w-5 z-10 text-base-content/40' />
                                </div>
                                <input
                                    type='email'
                                    className='input input-bordered w-full pl-10'
                                    placeholder='Someone@example.com'
                                    required
                                    value={email}
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row gap-10'>
                        <button className={`p-4  cursor-pointer btn btn-success btn-md mb-4 hover:scale-[1.02] shadow-black shadow-md`} type='submit' >Add</button>
                        <button className={`p-4  cursor-pointer btn btn-error btn-md mb-4 hover:scale-[1.02] shadow-black shadow-md`} type='button' onClick={() => { setWindowed(false);setEmail('') }}>Cancel</button>
                        </div>
                    </div>
                </form>
                <div className='bg-[rgba(0,0,0,0.5)] w-screen h-screen top-0 left-0 transition-all' onClick={() => { setWindowed(false);setEmail('') }}></div>
            </div>
        </div>
    )
}

export default AddAdmin