import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import {AiFillCopyrightCircle } from "react-icons/ai";
import { BsFillPersonFill ,BsFillLockFill , BsFillUnlockFill } from "react-icons/bs";
import {FcGoogle} from 'react-icons/fc'
import {MdEmail} from 'react-icons/md'

const Login = () => {
    const wrapper = useRef()
    const [pass, setPass] = useState("password")
    const [validLogin ,setValidLogin] = useState(1)
    const [validRegister, setValidRegister] = useState(1)
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
    const [reg_data,setRegData] = useState({
        name:"",
        email:"",
        password:""
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    useEffect( () => {
        if(!data.email || !data.password) {
            setValidLogin(0)
        }
        else{
            setValidLogin(1)
        }
        if(!reg_data.name || !reg_data.email || !reg_data.password) {
            setValidRegister(0)
        }
        else{
            setValidRegister(1)
        }
    }, [data.email, data.password, reg_data.email, reg_data.password, reg_data.name])
    
    const handleRegisterData = (e) => {
        setRegData({ ...reg_data, [e.target.name]: e.target.value })
    }
    const openRegister = () => {
        if(wrapper.current){
            wrapper.current.className += ' active'
        }
    }
    const openLogin = () => {
        if(wrapper.current){
            wrapper.current.className = 'wrapper'
        }
    }
    const googleAuthLogin = () =>{
        window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`,"_self")
    }
    const googleAuthRegister = () =>{
        window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`,"_self")
    }
  return (
    <div className="wrapper" ref={wrapper}>
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>
        <div className="form-box flex column login">
            <h2 className='login-title animation'>Login</h2>
            <form>
                <div className="input-box animation">
                    <input type="email" required name='email' onChange={handleChange} value={data.email} autoComplete='off'/>
                    <label>Email</label>
                    <MdEmail className='input-icon'/>
                </div>
                <div className="input-box animation">
                    <input type={pass} required name='password' onChange={handleChange} value={data.password} autoComplete='off'/>
                    <label>Password</label>
                    {pass == "password" ? <BsFillLockFill className='input-icon locker' onClick={unlock}/> : <BsFillUnlockFill className='input-icon locker' onClick={lock}/>}
                </div>
                <button type='submit' disabled={!validLogin} className={validLogin ? "login-btn animation" : "invalid-login animation" }>Login</button>
                <div className="logreg-link animation flex spaceBetween">
                    <p>Don't have an account?</p>
                    <a className="register-link" onClick={openRegister} href='#'>Register</a>
                </div>
                <div className="google flex animation" onClick={googleAuthLogin}>
                    <FcGoogle className='google-logo'/> 
                    <p>Continue with Google</p>
                </div>
            </form>
        </div>
        <div className="info-text login flex column">
            <h2 className='animation'>Welcome Back!</h2>
            <p className='animation'>To Map Your Nap <br />Where you can <br /> find the place for your <br /> peacful nap or rest</p>
            <p className='animation'>
                <AiFillCopyrightCircle className='copy-right'/> Youssef Houssein
            </p>
        </div>

        <div className="form-box flex column register">
            <h2 className='login-title animation' >Register</h2>
            <form>
                <div className="input-box animation">
                    <input type="text" required name='name' onChange={handleRegisterData} value={reg_data.name} autoComplete='off'/>
                    <label>Name</label>
                    <BsFillPersonFill className='input-icon'/>
                </div>
                <div className="input-box animation">
                    <input type="email" required name='email' onChange={handleRegisterData} value={reg_data.email} autoComplete='off'/>
                    <label>Email</label>
                    <MdEmail className='input-icon'/>
                </div>
                <div className="input-box animation">
                    <input type={pass} required name='password' onChange={handleRegisterData} value={reg_data.password} autoComplete='off'/>
                    <label>Password</label>
                    {pass == "password" ? <BsFillLockFill className='input-icon locker' onClick={unlock}/> : <BsFillUnlockFill className='input-icon locker' onClick={lock}/>}
                </div>
                <button type='submit' disabled={!validRegister} className={validRegister ? "login-btn animation" : "invalid-login animation"}>Register</button>
                <div className="logreg-link flex spaceBetween animation">
                    <p>Already have an account?</p>
                    <a className="register-link" onClick={openLogin} href='#'>Login</a>
                </div>
                <div className="google flex animation" onClick={googleAuthRegister}>
                    <FcGoogle className='google-logo'/> 
                    <p>Continue with Google</p>
                </div>
            </form>
        </div>
        <div className="info-text register flex column">
            <h2 className='animation'>Welcome</h2>
            <p className='animation'>To Map Your Nap <br />Where you can <br /> find the place for your <br /> peacful nap or rest</p>
            <p className='animation'>Register here and login for more information</p>
            <p className='animation'>you can find your way easily</p>
            <p className='animation'>
                <AiFillCopyrightCircle className='copy-right'/> Youssef Houssein
            </p>
        </div>
    </div>
  )
}

export default Login