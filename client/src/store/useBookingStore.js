import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
export const useBookingStore = create((set)=>({
    cart: {},
    dateInfo: {},
    isbookingslot:false,
    isgettingDateInfo:false,
    setCart: async(cart)=>{
        try {
            set({cart:cart})
            return 200
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    placeBooking: async(cart)=>{
        set({isbookingslot:true})
        try {
            const response = await axiosInstance.post('/booking/book',cart)
            if(response.status === 200){
                set((state) => ({
                    dateInfo : {...state.dateInfo,[cart.slotName]:true}
                }))
                toast.success('Slot Booked')
                return response.status
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isbookingslot:false})
        }
    },
    getDateInfo:async(turfInfo)=>{
        set({isgettingDateInfo:true})
        try {
            const response = await axiosInstance.get('/booking/getInfo',{params:turfInfo})
            if(response.status === 200){
                set({dateInfo:response.data})
                return response.status
            }
        } catch (error) {
            if(error.response.status === 404){
                set({dateInfo:{}})
                return 200
            }
            else {
                toast.error(error.response.data.message)
            }
        } finally{
            set({isgettingDateInfo:false})
        }
    },
    setDateInfo: ()=>{set({dateInfo:{}})}
}))