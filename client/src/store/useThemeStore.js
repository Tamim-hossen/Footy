import {create} from 'zustand'

export const useThemeStore = create((set)=>({
    theme: localStorage.getItem("theme")||'light',
    setTheme: (changedTheme)=>{
        document.documentElement.setAttribute("data-theme",changedTheme)
        localStorage.setItem("theme",changedTheme)
        set({theme:changedTheme})
    }
}))