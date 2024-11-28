import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import useFetchCaptain from "../hooks/useFetchCaptain";


const ProtectedCaptainRoute = ({ children }) => {
  useFetchCaptain()
  const { captain, loading } = useSelector(state => state.user)


  if (loading) {
    return <p>Loading...</p>
  }

  if (!captain) {
    return <Navigate to={"/captain-login"}/>
  }

  return (
    <>{children}</>
  )
}

export default ProtectedCaptainRoute