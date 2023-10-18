import React, { useState } from 'react'
import './style.css'
import {AiFillCopyrightCircle } from "react-icons/ai";
import { BsFillPersonFill ,BsFillLockFill , BsFillUnlockFill } from "react-icons/bs";
import {FcGoogle} from 'react-icons/fc'
const Login = () => {
    const [pass, setPass] = useState("password")
    const unlock = () => {
        setPass("text")
    }
    const lock = () => {
        setPass("password")
    }
    const [data, setData] = useState({
        email: "",
        password : ""
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      }
  return (
    <div className="wrapper">
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>
        <div className="form-box flex column login">
            <h2 className='login-title'>Login</h2>
            <form>
                <div className="input-box">
                    <input type="email" required name='email' onChange={handleChange} value={data.email}/>
                    <label>Email</label>
                    <BsFillPersonFill className='input-icon'/>
                </div>
                <div className="input-box">
                    <input type={pass} required name='password' onChange={handleChange} value={data.password}/>
                    <label>Password</label>
                    {pass == "password" ? <BsFillLockFill className='input-icon locker' onClick={unlock}/> : <BsFillUnlockFill className='input-icon locker' onClick={lock}/>}
                </div>
                <button type='submit' className="login-btn">Login</button>
                <div className="logreg-link flex spaceBetween">
                    <p>Don't have an account?</p>
                    <button className="register-link">Register</button>
                </div>
                <div className="google flex">
                    <FcGoogle className='google-logo'/> 
                    <p>Continue with Google</p>
                </div>
            </form>
        </div>
        <div className="info-text login flex column">
            <h2>Welcome Back!</h2>
            <p>To Map Your Nap <br />Where you can <br /> find the place for your <br /> peacful nap or rest</p>
            <p>
                <AiFillCopyrightCircle className='copy-right'/> Youssef Houssein
            </p>
        </div>
    </div>
  )
}

export default Login