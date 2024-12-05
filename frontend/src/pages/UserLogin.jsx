import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setUser } from '../app/slices/userSlice'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {

    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
      const data = await res.json();
      if (data.success) {
        dispatch(setUser(data.user))
        navigate("/home")
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
        <img src="logo.png" alt="uber_logo" className='h-6 mb-5' />
      </div>
      <form onSubmit={handleSubmit}>
        <h3 className='text-sm mb-2'>What's Your email </h3>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2 outline-black  placeholder:text-base w-full text-lg' placeholder='email@example.com' required />

        <h3 className='text-sm mt-5 mb-2'>Enter password</h3>
      
          <input type="password" value={password} className='bg-[#eeeeee] rounded px-4 py-2 outline-black  placeholder:text-base w-full text-lg' onChange={(e) => setPassword(e.target.value)} placeholder='password' required />
       

        <button type='submit' disabled={loading} className='bg-black mt-5 text-white rounded p-2   w-full text-base'>
          {
            loading ? 'Loading...' : 'Login'
          }
        </button>
      </form>
      <p className='text-center'>New here ? <Link to={"/signup"} className='text-blue-500 hover:underline'>Create an account</Link> </p>
      <Link to={"/captain-login"} className='bg-green-500 inline-block text-center hover:bg-green-600 mt-24 text-white rounded p-2   w-full text-base'>Sign in as captain</Link>

    </div>
  )
}

export default UserLogin