import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assets/logo.png'
import io from 'socket.io-client'

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log('user',user)
  const fetchUserDetails = async()=>{
    try {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
        const response = await axios({
          url : URL,
          withCredentials : true
        })

        dispatch(setUser(response.data.data))

        if(response.data.data.logout){
            dispatch(logout())
            navigate("/login")
        }
        console.log("current user Details",response)
    } catch (error) {
        console.log("error",error)
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  /***socket connection */
  useEffect(()=>{
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
      auth : {
        token : localStorage.getItem('token')
      },
    })

    socketConnection.on('onlineUser',(data)=>{
      console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return ()=>{
      socketConnection.disconnect()
    }
  },[])


  const basePath = location.pathname === '/'
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-[300px,1fr]">
  {/* Sidebar (Visible on large screens, toggled on smaller screens) */}
  <section className={`bg-white border border-gray-300 shadow-md rounded-lg ${!basePath ? "hidden" : "block"} lg:block`}>
    <Sidebar />
  </section>

  {/* Main content area (Adjustable visibility for different screen sizes) */}
  <section className={`bg-white border border-gray-300 shadow-md rounded-lg ${basePath ? "hidden" : "block"}`}>
    <Outlet />
  </section>

  {/* Message prompt when no user is selected (Visible only on large screens) */}
  <div className={`flex flex-col justify-center items-center gap-2 ${basePath ? "flex" : "hidden"} lg:flex`}>
    <div>
      <img src={logo} width={250} alt="logo" />
    </div>
    <p className="text-lg mt-2 text-slate-500 text-center">Select a user to send a message</p>
  </div>
</div>


  )
}

export default Home
