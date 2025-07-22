import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    // const [user, setUser] = useState(null); //user is logged out
    // const [user, setUser] = useState(null); //user is logged in
    //add this all state fns into context folder
   const {user, setShowLogin, logout, credit} = useContext(AppContext)
    const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between py-4'>
        {/* left */}
        <Link to='/'> {/* open to the home page whenever click on the image or logo */}
        <img src={assets.logo} alt=""  className='w-28 sm:w-32 lg:w-40'/>
        </Link>
        
        {/* /right */}
        <div>
            {
            user ? //if user login- 1st div displayed else 2nd div
            // true
            <div className='flex items-center gap-2 sm:gap-3'>
                <button onClick={()=> navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
                    <img className='w-5 ' src={assets.credit_star} alt="" />
                    <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit left: {credit}</p>
                </button>

                <p className=' text-gray-600 max-sm:hidden pl-4'>Hii, {user.name}</p>
                <div className='relative group'>
                    <img className='w-10 drop-shadow' src={assets.profile_icon} alt="" />
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                            <li onClick={logout} className='py-1 px-2 pr-10 cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
            :
            // null or false
            <div className='flex items-center gap-2 sm:gap-5'>
                <p onClick={()=>navigate('/buy')} className='cursor-pointer'>Pricing</p>
                {/* pricing me click krne se /buy router page me jayenge- useNavigate() is used */}
                <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full ' 
                onClick={()=>setShowLogin(true)}>
                    Login</button>
            </div>
            }
       
        
        </div>
    </div>
  )
}

export default Navbar
