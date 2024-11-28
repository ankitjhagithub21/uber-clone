import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setCaptain } from '../app/slices/userSlice'


const CaptainSignup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [capacity, setCapacity] = useState('')
  const [plate, setPlate] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [color, setColor] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    const userData = {
      name,
      email,
      password,
      color,
      plate,
      capacity,
      vehicleType
    }
    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/captains/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(userData)
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
        <h3 className='text-sm mb-2'>Enter Captain name </h3>
        <input type="name" value={name} onChange={(e) => setName(e.target.value)} className='bg-[#eeeeee] rounded px-4 outline-black py-2  placeholder:text-base w-full text-lg' placeholder='John Doe' required />

        <h3 className='text-sm mt-5 mb-2'>Enter Captain email </h3>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] rounded px-4 outline-black py-2  placeholder:text-base w-full text-lg' placeholder='email@example.com' required />

        <h3 className='text-sm mt-5 mb-2'>Enter password</h3>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] rounded px-4 outline-black py-2  placeholder:text-base w-full text-lg' placeholder='password' required />

        <h3 className='mt-5 mb-2 text-sm'>Enter Your Vehicle Information</h3>

        <div className="flex gap-2">
          <div>
            <h3 className='text-sm mt-5 mb-2'>vehicle Color </h3>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className='bg-[#eeeeee] rounded px-4 outline-black py-2  placeholder:text-base w-full text-lg' placeholder='Red, blue, yellow' required />
          </div>

          <div>
            <h3 className='text-sm mt-5 mb-2'>Vehicle Type</h3>
            <input type="text" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className='bg-[#eeeeee] rounded px-4 outline-black py-2  placeholder:text-base w-full text-lg' placeholder='Car, auto, motorcycle' required />
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <h3 className='text-sm mt-5 mb-2'>vehicle Plate </h3>
            <input type="text" value={plate} onChange={(e) => setPlate(e.target.value)} className='bg-[#eeeeee] rounded px-4 outline-black py-2  placeholder:text-base w-full text-lg' placeholder='Vehicle plate number' required />
          </div>

          <div>
            <h3 className='text-sm mt-5 mb-2'>Vehicle Capacity</h3>
            <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className='bg-[#eeeeee] rounded px-4 outline-black py-2  placeholder:text-base w-full text-lg' placeholder='1' required />
          </div>
        </div>

        <button disabled={loading} type='submit' className='bg-black mt-5 text-white rounded p-2  w-full text-base'>{
          loading ? 'Loading...' : 'Sign Up'
          }</button>
      </form>
      <p className='text-center'>Already joined ? <Link to={"/captain-login"} className='text-blue-500 hover:underline'>Login</Link> </p>

    </div>

  )
}

export default CaptainSignup