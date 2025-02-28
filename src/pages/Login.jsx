import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import {setToken} from "../redux/userSlice"
import { useDispatch } from "react-redux";
import logo from "../assets/logo.png"
import dot from "../assets/dot.png"

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const location = useLocation()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!location?.state?.name){
      navigate('/login')
    }
  },[])

  const handleOnChange = (e)=>{
    const { name,value} = e.target

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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/login`

    try {
        const response = await axios({
          method :'post',
          url : URL,
          data : {
            userId : location?.state?._id,
            email:data.email,
            password : data.password
          },
          withCredentials : true
        })

        toast.success(response.data.message)

        if(response.data.success){
            dispatch(setToken(response?.data?.token))
            localStorage.setItem('token',response?.data?.token)

            setData({
                email:"",
              password : "",
            })
            navigate('/chat')
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200 relative">
    <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden p-6">
      
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src={logo} alt="Chat Logo" className="w-28 h-12" />
      </div>


      {/* Form */}
      <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
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

        <button
          type="submit"
          className="bg-blue-600 text-lg px-4 py-2 hover:bg-blue-700 rounded-md mt-2 font-bold text-white tracking-wide"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="my-3 text-center">
        Don't have an account?{" "}
        <Link to={"/"} className="hover:text-blue-600 font-semibold">
          Signup
        </Link>
      </p>

   
      <img src={dot} alt="dotted design" className="absolute top-2 right-2 w-10 h-10 opacity-60" />
      <img src={dot} alt="dotted design" className="absolute bottom-2 left-2 w-10 h-10 opacity-60" />
    </div>
  </div>
  );
};

export default LoginPage;
