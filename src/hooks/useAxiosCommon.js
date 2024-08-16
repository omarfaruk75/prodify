import axios from 'axios'

export const axiosCommon = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
})
const useAxiosCommon = () => {
    return axiosCommon
}

export default useAxiosCommon