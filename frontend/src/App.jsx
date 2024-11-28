import { BrowserRouter, Route, Routes } from "react-router-dom"
import Start from "./pages/Start"
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignup from "./pages/CaptainSignup"
import "./App.css"
import ProtectedUserRoute from "./pages/ProtectedUserRoute"
import CaptainHome from "./pages/CaptainHome"
import ProtectedCaptainRoute from "./pages/ProtectedCaptainRoute"
import PublicRoute from "./pages/PublicRoute"


const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={
          <ProtectedUserRoute>
            <Home />
          </ProtectedUserRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <UserLogin />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <UserSignup />
          </PublicRoute>
        } />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-home" element={
          <ProtectedCaptainRoute>
            <CaptainHome />
          </ProtectedCaptainRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App