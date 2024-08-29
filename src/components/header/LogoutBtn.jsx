import React from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom' 
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/')
        })
    }
  return (
    <button
    className='inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn