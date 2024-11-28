import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import useFetchUser from "../hooks/useFetchUser";


const ProtectedUserRoute = ({ children }) => {
  useFetchUser()
  const { user, loading } = useSelector(state => state.user)
  

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to={"/login"}/>
  }

  return (
    <>{children}</>
  )
}

export default ProtectedUserRoute