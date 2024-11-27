import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {

    e.preventDefault()
    console.log(email, password)
    setEmail('')
    setPassword('')

  }

  return (
    <div className='p-5 flex flex-col gap-5 w-full max-w-sm mx-auto'>
      <div>
        <img src="driver-logo.webp" alt="uber_logo" className='h-14 mb-5' />
      </div>
      <form onSubmit={handleSubmit}>
        <h3 className='text-sm mb-2'>What's Your email </h3>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2  placeholder:text-base w-full text-lg' placeholder='email@example.com' required />

        <h3 className='text-sm mt-5 mb-2'>Enter password</h3>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2  placeholder:text-base w-full text-lg' placeholder='password' required />

        <button type='submit' className='bg-black mt-5 text-white rounded p-2   w-full text-base'>Login</button>
      </form>
      <p className='text-center'>Join a fleet ? <Link to={"/captain-signup"} className='text-blue-500 hover:underline'>Register as a captain</Link> </p>
      <Link to={"/login"} className='bg-yellow-500 inline-block text-center hover:bg-yellow-600 mt-24 text-white rounded p-2   w-full text-base'>Sign in as user</Link>
    </div>
  )
}

export default CaptainLogin