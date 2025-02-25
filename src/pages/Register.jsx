import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import logo from "../assets/logo.png"
import dot from "../assets/dot.png"

const RegisterPage = () => {
  const [data,setData] = useState({
    name : "",
    email : "",
    contactNumber:"",
    password : "",
   
  })
  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }


  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`

    try {
        const response = await axios.post(URL,data)
        console.log("response",response)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              name : "",
              email : "",
              password : "",
              contactNUmber : ""
            })

            navigate('/login')

        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    console.log('data',data)
  }


  return (
    <div className="flex items-center justify-center h-screen bg-blue-200">
    <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden p-6">
      
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src={logo} alt="Chat Logo" className="w-28 h-12" />
      </div>


      {/* Form */}
      <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="bg-slate-100 px-2 py-2 rounded-md focus:outline-primary"
            value={data.name}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="bg-slate-100 px-2 py-2 rounded-md focus:outline-primary"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="number"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter your contact number"
            className="bg-slate-100 px-2 py-2 rounded-md focus:outline-primary"
            value={data.contactNumber}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="bg-slate-100 px-2 py-2 rounded-md focus:outline-primary"
            value={data.password}
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="bg-blue-600 text-lg px-4 py-2 hover:bg-blue-700 rounded-md mt-2 font-bold text-white tracking-wide">
          Register
        </button>
      </form>

      <p className="my-3 text-center">
        Already have an account?{" "}
        <Link to={"/login"} className="hover:text-blue-600 font-semibold">
          Login
        </Link>
      </p>

      {/* Dotted Design (Top Right & Bottom Left) */}
      <img src={dot} alt="dotted design" className="absolute top-2 right-2 w-10 h-10 opacity-60" />
        <img src={dot} alt="dotted design" className="absolute bottom-2 left-2 w-10 h-10 opacity-60" />

    </div>
  </div>
  )
}

export default RegisterPage
