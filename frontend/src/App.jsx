import { Route, Routes } from "react-router-dom"
import Start from "./pages/Start"
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignup from "./pages/CaptainSignup"
import "./App.css"
import ProtectedRoute from "./pages/ProtectedRoute"


const App = () => {
 
 
  return (
   <div>
    <Routes>
      <Route path="/" element={<Start/>}/>
      <Route path="/home" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }/>
      <Route path="/login" element={<UserLogin/>}/>
      <Route path="/signup" element={<UserSignup/>}/>
      <Route path="/captain-login" element={<CaptainLogin/>}/>
      <Route path="/captain-signup" element={<CaptainSignup/>}/>
    </Routes>
   </div>
  )
}

export default App