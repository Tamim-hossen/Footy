import {create} from 'zustand'
import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios.js'
export const useAdminStore = create((set)=>({
    users:[],
    bookings :[],
    individualDetails:[],
    isGettingUsers:false,
    isGettingBookings : false,
    isRemovingAdmin: false,
    isbanningOrUnbaning:false,
    isGettinginddividualDetails: false,
    getUsers: async()=>{
        set({isGettingUsers:true})
        try {
            const users = await axiosInstance.get('admin/users')
            set({users:users.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isGettingUsers:false})
        }
    },
    suspendUser:async (users,id)=>{
        set({isbanningOrUnbaning:true})
        try {
            const userId = {id}
           const update= await axiosInstance.post('/admin/banuser',userId)
           if(update.status === 200){
            set({users : users})
            toast.success(update.data.message)
           }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isbanningOrUnbaning:false})
        }
    },
    unSuspendUser:async (users,id)=>{
        set({isbanningOrUnbaning:true})
        try {
            const userId = {id}
           const update= await axiosInstance.post('/admin/unbanuser',userId)
           if(update.status === 200){
            toast.success(update.data.message)
            set({users : users})
           }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isbanningOrUnbaning:false})
        }
    },
    addadmin:async (users,email)=>{
        try {
            const userEmail = {email}
           const update= await axiosInstance.post('/admin/addadmin',userEmail)
           if(update.status === 200){
            set({users : users})
            toast.success(update.data.message)
            return update.status
           }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    removeadmin:async (users,email)=>{
        set({isRemovingAdmin:true})
        try {
            const userEmail = {email}
           const update= await axiosInstance.post('/admin/removeadmin',userEmail)
           if(update.status === 200){
            set({users : users})
            toast.success(update.data.message)
            return update.status
           }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isRemovingAdmin:false})
        }
    },
    getBookings: async(turf)=>{
        set({isGettingBookings:true})
        try {
            const response = await axiosInstance.get('/admin/getbookings')
            const sorted = response.data.sort((a,b) => { return b.placedOn - a.placedOn})
            set({bookings:sorted})
        } catch (error) {
            toast.error('error')
            console.log(error)
        } finally{
            set({isGettingBookings:false})
        }
    },
    getUSerDetails: async (userId)=>{
        set({isGettinginddividualDetails:true})
        try {
            const user = {
                userId : userId
            }
            const response = await axiosInstance.get('/admin/getindividualdetails',{params: user})
            if(response.status === 200){
                const update = response.data.sort((a,b)=>a.timeStamp-b.timeStamp)
                set({individualDetails: update})
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isGettinginddividualDetails:false})
        }
    }
}))