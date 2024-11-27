import {Link} from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='h-screen  w-full flex flex-col  home'>
        <div className=' h-full p-5'>
          <img src="logo.png" alt="uber_logo" className='h-8'/>
        </div>
        <div className='bg-white p-5'>
          <h2 className='text-2xl mb-3 '>Get Started With Uber</h2>
          <Link to="/login" className='bg-black inline-block text-center text-white w-full rounded-lg p-2'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start