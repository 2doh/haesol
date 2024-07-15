import axios from "axios"

export const findParentId = async (data) => {
    try {
        const response = await axios.get(`/api/user/parents/find-id?nm=${data.nm}&phone=${data.phone}`)    
        return response
    } catch (error) {
        return "error"
    }
    
}

export const findParentPass = async (data) => {
    
    try {
        const res = await axios.get(`/api/user/parents/find-password?uid=${data.uid}&phone=${data.phone}`)
        return res
    } catch (error) {
        return "err"
    }
}