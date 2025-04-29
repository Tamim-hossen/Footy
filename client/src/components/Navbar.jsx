import React, { useEffect, useState } from 'react'
import { TableOfContents, Settings, CircleUser, Calendar, LogOut, Flag, House,ShieldUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast'

function Navbar() {
    
    const logout = useAuthStore((state) => state.logout)
    const authUser = useAuthStore((state) => state.authUser);
    const isAdmin = useAuthStore((state) => state.isAdmin);
    const [extended, setExtended] = useState(false)
    const nav = useNavigate()
    const loginButtonHandle =async () => {
        if(authUser){
            const response = await logout()
            if(response === 200){
                toast.success("Logged Out SuccessFully")
                scrollTo({top:0,behavior:'smooth'})
                nav('/')
                setExtended(false)
            }
        }
        else{
            nav('/login'); 
            setExtended(false);
            scrollTo({top:0,behavior:'smooth'})
        } 
    }
    return (
        <div className='fixed z-50'>
            <div className={` flex flex-col fixed h-screen ${extended ? 'w-60 bg-base-300 shadow-2xl' : 'w-14 '} transition-all z-50`}>
                <button  className='p-8 '>
                    <TableOfContents onClick={() => setExtended((prev) => !prev)} className='cursor-pointer text-accent bg-[rgba(0,0,0,0.5)] p-2 h-10 w-10 rounded-md' />
                </button>
                <div className={`flex flex-col h-screen justify-between my-3 p-3`}>
                    <div className={`${extended ? "translate-x-0" : "-translate-x-32"}   transition-all flex flex-col gap-2`}>
                        <button className={`p-4 flex  flex-row gap-5 cursor-pointer w-full hover:scale-[1.02]`} onClick={() => { nav('/'); setExtended(false);scrollTo({top:0,behavior:'smooth'}) }}><House />Home</button>
                        <button className={`p-4 flex  flex-row gap-5 cursor-pointer w-full hover:scale-[1.02]`} onClick={() => {nav('/profile'); setExtended(false);scrollTo({top:0,behavior:'smooth'})}}><CircleUser />User Profile</button>
                        <button className={`p-4 flex  flex-row gap-5 cursor-pointer w-full hover:scale-[1.02]`} onClick={() => {nav('/matches'); setExtended(false);scrollTo({top:0,behavior:'smooth'})}}><Calendar />Matches</button>
                        <button className={`p-4 flex  flex-row gap-5 cursor-pointer w-full hover:scale-[1.02]`} onClick={() => {nav('/pitches'); setExtended(false);scrollTo({top:0,behavior:'smooth'})}}><Flag />View Pitches</button>
                        { isAdmin && <button className={`p-4 flex  flex-row gap-5 cursor-pointer w-full hover:scale-[1.02]`} onClick={() => {nav('/admin'); setExtended(false);scrollTo({top:0,behavior:'smooth'})}}><ShieldUser />Admin Panel</button>}
                        {/* <button className={`p-4 flex  flex-row gap-5 cursor-pointer w-full hover:scale-[1.02]`} onClick={() => {nav('/settings'); setExtended(false);scrollTo({top:0,behavior:'smooth'})}}><Settings />Settings</button> */}
                    </div>
                    <div className={`${extended ? "translate-x-0" : "-translate-x-32"}  transition-all flex flex-row justify-between`}>
                        <button className={`p-4 flex flex-row cursor-pointer hover:scale-[1.02]`} onClick={() => {nav('/settings'); setExtended(false);scrollTo({top:0,behavior:'smooth'})}}><Settings /></button>
                        <button className={`p-4 flex flex-row cursor-pointer hover:scale-[1.02]`} title={authUser? 'Log Out' : 'Log In'} onClick={loginButtonHandle}><LogOut /></button>
                    </div>
                </div>
            </div>
            <div className={`w-screen h-screen ${extended ? `bg-[rgba(75,85,99,0.38)]` : "hidden"} fixed top-0 left-0 transition-all z-20 `} onClick={() => {setExtended(false)}} />
        </div>
    )
}

export default Navbar