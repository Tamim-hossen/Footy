import React, { useEffect, useState } from 'react'
import Poster from '../components/Home/Poster.jsx'
import Cards from '../components/Home/Cards.jsx'
import { useThemeStore } from '../store/useThemeStore.js'
function Home() {
  const {theme} = useThemeStore()
  return (
    <div className={` relative flex flex-col gap-36 sm:gap-48 md:gap-66 lg:gap-76 xl:gap-66  2xl:gap-[30rem] transition-all ${theme === 'light' ? 
      'bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1745681240/bgdoolde_m0dfxy.png)]' : 'bg-[url(https://res.cloudinary.com/ddvwykjjv/image/upload/v1745680945/bgdooldewhite_eapomc.png)]'
    }  bg-po`}>
      
      <Poster className='fixed z-10'/>
      <Cards className=''/>
      <div className="custom-shape-divider-bottom-1745687357">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
        className={`${theme === 'light' ? 'fill-[rgba(0,0,0,0.8)]':'fill-white'}`}></path>
    </svg>
</div>
    </div>
  )
}

export default Home