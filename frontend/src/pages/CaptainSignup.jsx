import { useState } from 'react'
import { Link } from 'react-router-dom'


const CaptainSignup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {

    e.preventDefault()
    console.log(name, email, password)
    setEmail('')
    setPassword('')

  }
  return (
    <div className='p-5 flex flex-col gap-5 w-full max-w-sm mx-auto'>
      <div>
        <img src="driver-logo.webp" alt="uber_logo" className='h-14 mb-5' />
      </div>
      <form onSubmit={handleSubmit}>
        <h3 className='text-sm mb-2'>What's Your name </h3>
        <input type="name" value={name} onChange={(e) => setName(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2  placeholder:text-base w-full text-lg' placeholder='email@example.com' required />

        <h3 className='text-sm mt-5 mb-2'>What's Your email </h3>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2  placeholder:text-base w-full text-lg' placeholder='email@example.com' required />

        <h3 className='text-sm mt-5 mb-2'>Enter password</h3>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2  placeholder:text-base w-full text-lg' placeholder='password' required />

        <button type='submit' className='bg-black mt-5 text-white rounded p-2   w-full text-base'>Sign Up</button>
      </form>
      <p className='text-center'>Already joined ? <Link to={"/captain-login"} className='text-blue-500 hover:underline'>Login</Link> </p>

    </div>

  )
}

export default CaptainSignup