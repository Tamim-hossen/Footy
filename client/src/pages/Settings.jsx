import React from 'react'
import { useThemeStore } from '../store/useThemeStore.js'
function Settings() {
    const{theme, setTheme} = useThemeStore()
    const toggletheme = () =>{
        setTheme(theme === 'light' ? 'dark': 'light')
    }
  return (
    <div className='flex pt-10 mx-20 md:mx-32 flex-col gap-5'>
        <div className='flex justify-between bg-base-300 p-6 rounded-lg'>
            <p>Dark Mode:</p>
            <label>
                <input
                type='checkbox'
                className='sr-only peer'
                onClick={toggletheme}
                value={theme}
                />
                <div className={`w-14  h-7 rounded-full relative ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} inset-shadow-[5px_0_15px_rgba(1,1,1,0.25)]`}>
                    <div className={`w-5 h-5 bg-accent rounded-full absolute top-1 left-2 ${theme === 'dark' ? 'translate-x-6' : ''} transition-all`}/>
                </div>
            </label>
        </div>
    </div>
  )
}

export default Settings