import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setCaptain } from '../app/slices/userSlice'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/captains/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
      const data = await res.json();
      if (data.success) {
        dispatch(setCaptain(data.captain))
        toast.success(data.message)
        navigate("/captain-home")
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className='p-5 flex flex-col gap-5 w-full max-w-sm mx-auto'>
      <div>
        <img src="driver-logo.webp" alt="uber_logo" className='h-14 mb-5' />
      </div>
      <form onSubmit={handleSubmit}>
        <h3 className='text-sm mb-2'>What's Your email </h3>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] rounded px-4 outline-black py-2  placeholder:text-base w-full text-lg' placeholder='email@example.com' required />

        <h3 className='text-sm mt-5 mb-2'>Enter password</h3>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] rounded px-4 outline-black py-2  placeholder:text-base w-full text-lg' placeholder='password' required />

        <button disabled={loading} type='submit' className='bg-black mt-5 text-white rounded p-2   w-full text-base'>
          {
            loading ? 'Loading...' : 'Login'
          }
        </button>
      </form>
      <p className='text-center'>Join a fleet ? <Link to={"/captain-signup"} className='text-blue-500 hover:underline'>Register as a captain</Link> </p>
      <Link to={"/login"} className='bg-yellow-500 inline-block text-center hover:bg-yellow-600 mt-24 text-white rounded p-2   w-full text-base'>Sign in as user</Link>
    </div>
  )
}

export default CaptainLogin