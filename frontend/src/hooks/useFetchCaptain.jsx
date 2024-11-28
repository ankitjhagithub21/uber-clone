import { useEffect} from "react"
import { useDispatch } from "react-redux"
import { setLoading, setCaptain } from "../app/slices/userSlice"


const useFetchCaptain = () => {
   
    const dispatch = useDispatch()
    
    useEffect(() => {
        const getCaptain = async () => {
            try {
                dispatch(setLoading(true))
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/Captains/profile`, {
                    credentials: 'include'
                })
                const data = await res.json()
                if (data.success) {
                    dispatch(setCaptain(data.captain))
                } else {
                    dispatch(setCaptain(null))
                }
            } catch (error) {
                dispatch(setCaptain(null))
            } finally {
                dispatch(setLoading(false))
            }
        }
        getCaptain()
    }, [])
}

export default useFetchCaptain