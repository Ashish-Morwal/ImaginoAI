import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react"
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

  // console.log("ENV TEST:", import.meta.env.VITE_BACKEND_URL);

  const [state, setState] = useState('Login'); //for login page- having email and password or forgot pswrd 
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // useEffect(() => {
  //   console.log("Backend URL:", backendUrl);
  // }, [backendUrl]);
 
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      //login 
      if (state === 'Login') {
        console.log('Attempting login with:', { email, password, backendUrl });
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
          .catch(error => {
            console.error('Login error details:', {
              message: error.message,
              response: error.response?.data,
              status: error.response?.status,
              url: backendUrl + '/api/user/login'
            });
            throw error;
          });

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      } 
      else {
        //signup
        console.log('Attempting signup with:', { name, email, password, backendUrl });
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
          .catch(error => {
            console.error('Signup error details:', {
              message: error.message,
              response: error.response?.data,
              status: error.response?.status,
              url: backendUrl + '/api/user/register'
            });
            throw error;
          });

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error('Full error:', error);
      toast.error(error.response?.data?.message || error.message || 'An error occurred')
    }
  }


  //for scroll not visible 
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';

    }
  }, [])


  return (
    //fixed likhne se login form visible hua niche vale generate btn me click krne se

    <div className='fixed top-0 left-0 right-0 bottom-0 
    z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>


      <motion.form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500 '
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {state != 'Login' && //visible only when user has to sign up
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img className='h-3.5 w-4 ' src={assets.user_icon} alt="" />
            <input onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm'
              type="text" name="" id="" placeholder='Full Name' required />
          </div>
        }

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt="" />
          <input onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm'
            type="email" name="" id="" placeholder='Email id' required />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt="" />
          <input onChange={e => setPassword(e.target.value)} value={password} className='outline-none text-sm'
            type="password" name="" id="" placeholder='Password' required />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer '>
          Forgot password?</p>

        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>
          {state === 'Login' ? 'login' : 'create account'}</button>


        {state === 'Login' ?
          <p className='mt-5 text-center'>
            Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>
              Sign up</span></p>
          :
          <p className='mt-5 text-center'>
            Already have an account? <span className='text-blue-600 cursor-pointer ' onClick={() => setState('Login')}>
              Login</span></p>}

        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />

      </motion.form>


    </div>
  )
}

export default Login
