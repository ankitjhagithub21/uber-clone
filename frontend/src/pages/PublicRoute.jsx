import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";



const PublicRoute = ({ children }) => {
  useFetchUser()
  const { user,loading} = useSelector(state => state.user)


  if(loading){
    return <p>Loading...</p>
  }

  if (user) {
    return <Navigate to={"/home"}/>
  }

  return (
    <>{children}</>
  )
}

export default PublicRoute