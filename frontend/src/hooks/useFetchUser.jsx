import { useEffect} from "react"
import { useDispatch } from "react-redux"
import { setLoading, setUser } from "../app/slices/userSlice"


const useFetchUser = () => {
   
    const dispatch = useDispatch()
    
    useEffect(() => {
        const getUser = async () => {
            try {
                dispatch(setLoading(true))
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    credentials: 'include'
                })
                const data = await res.json()
                if (data.success) {
                    dispatch(setUser(data.user))
                } else {
                    dispatch(setUser(null))
                }
            } catch (error) {
                dispatch(setUser(null))
            } finally {
                dispatch(setLoading(false))
            }
        }
        getUser()
    }, [])
}

export default useFetchUser