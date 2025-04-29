import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
export const useAuthStore = create((set) => ({
    authUser: null,
    isAdmin: false,
    bookingInfo:[],
    isSigningIn: false,
    isSigningUp: false,
    isCheckingAuth: false,
    isLoggingOut: false,
    isChangingPassword: false,
    isUpdatingProfile: false,
    isGettingBookingInfo: false,
    signIn: async (data) => {
        set({ isSigningIn: true })
        try {

            const response = await axiosInstance.post('/auth/login', data)
            set({ authUser: response.data })
            if (response.data.role === 'admin') {
                set({ isAdmin: true })
            }
            return response
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningIn: false })
        }
    },
    signUp: async (regData) => {
        set({ isSigningUp: false })
        try {
            const data = {
                name: regData.name,
                email: regData.email,
                phone: regData.phone,
                password: regData.password
            }
            const response = await axiosInstance.post('/auth/signup', data)
            return response

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const auth = await axiosInstance.get("/auth/user")
            set({ authUser: auth.data })
            if (auth.data.role === 'admin') {
                set({ isAdmin: true })
            }
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    logout: async () => {
        set({ isLoggingOut: true })
        try {
            const response = await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            set({ isAdmin: false })
            return response.status
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingOut: false })
        }
    },
    passwordChange: async (passwords) => {
        set({ isChangingPassword: true })
        try {
            const response = await axiosInstance.post('/auth/changepassword', passwords)
            toast.success('Password Changed Successfully')
            return response.status
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isChangingPassword: false })
        }
    },
    changeProfileInfo: async (user) => {
        set({ isUpdatingProfile: true })
        try {
            const response = await axiosInstance.post('/auth/changeinformation', user)
            toast.success('User Information Updated Successfully')
            set({ authUser: response.data })
            return response.status
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } finally {
            set({ isUpdatingProfile: false })
        }
    },
    getBookingInfo:async()=>{
        set({isGettingBookingInfo:true})
        try {
            const response = await axiosInstance.get('/auth/bookigninfo')
            if(response.status === 200){
                const update = response.data.sort((a,b)=>a.timeStamp-b.timeStamp)
                set({ bookingInfo: update })
            return response.status
            }
            
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }finally{
            set({isGettingBookingInfo:false})
        }
    }
}))