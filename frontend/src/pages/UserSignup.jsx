import {useState} from 'react'
import {Link} from 'react-router-dom'

const UserSignup = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = (e) =>{

    e.preventDefault()
    console.log(name,email,password)
    setEmail('')
    setPassword('')

  }

  return (
    <div className='p-5 w-full max-w-sm mx-auto'>
      <img src="logo.png" alt="uber_logo" className='h-6 mb-10' />
      <form onSubmit={handleSubmit}>
        <h3 className='text-sm mb-2'>What's Your name </h3>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2  placeholder:text-base w-full text-lg' placeholder='John Doe' required />

        <h3 className='text-sm mt-5 mb-2'>What's Your email </h3>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2  placeholder:text-base w-full text-lg' placeholder='email@example.com' required />

        <h3 className='text-sm mt-5 mb-2'>Enter password</h3>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2  placeholder:text-base w-full text-lg' placeholder='password' required />

        <button type='submit' className='bg-black mt-5 text-white rounded p-2   w-full text-base'>Sign Up</button>
      </form>
      <p className='text-center mt-5'>Already have an account ? <Link to={"/login"} className='text-blue-500 hover:underline'>Login</Link> </p>
      <p className='text-xs text-gray-600 mt-24'>By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
    </div>
  )
}

export default UserSignup