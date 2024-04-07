import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({insideRegister}) {

    const navigate = useNavigate()
    const [googleDetails,setGoogleDetails] = useState(null)
    const [userDetails,setUserDetails] = useState({
        username:"",password:"",email:""
    })
    console.log(userDetails);
    const handleLogin =()=>{
        const {username,password}=userDetails
        if(username&&password){
            navigate('/home')
        }
        else{
            toast.warning("Please fill the form completely!!!")
        }
    }
    const handleRegister =()=>{
        const {username,password,email}=userDetails
        if(username&&password&&email){
            navigate('/home')
        }
        else{
            toast.warning("Please fill the form completely!!!")
        }
    }
    console.log(googleDetails);

    useEffect(()=>{
        if(googleDetails){
            sessionStorage.setItem("user",JSON.stringify(googleDetails))
            toast.success("Login Successful")
            setTimeout(() => {
                navigate('/home')
            }, 2000);
        }
    },[googleDetails])

  return (
    <div className='log'>
        <div style={{height:"100vh"}} className="d-flex justify-content-center align-items-center">
            <div className="row r1">
                <div className="pp1 d-flex flex-column justify-content-center align-items-center col-lg-6">
                    {insideRegister?
                        <h2 className='fw-bolder'>REGISTER</h2>
                        :
                        <h2 className='fw-bolder'>LOGIN</h2>
                    }
                    
                    <p>{insideRegister?"Register to Website":"Login to explore more"}</p>
                    <input style={{backgroundColor:'#b8b3f8'}} onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} className='form-control w-75 mb-3' type="text" placeholder='Username'/>
                    <input style={{backgroundColor:'#b8b3f8'}} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} className='form-control w-75 mb-3' type="password" placeholder='Password'/>
                    {
                        insideRegister&&
                        <input style={{backgroundColor:'#b8b3f8'}} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} className='form-control w-75 mb-3' type="mail" placeholder='email'/>
                    }
                    {
                        insideRegister?
                        <button onClick={handleRegister} className='btn bb mb-3'>Register Now</button>
                        :
                        <button onClick={handleLogin} className='btn bb mb-3'>Login Now</button>
                    }                 
                    <div className='line w-75'></div>
                    <p className='pt-3'><span className='fw-bolder'>OR</span> {insideRegister? "Register with" : "Login with"}</p>
                    <GoogleLogin
                    onSuccess={credentialResponse => {
                        const data = jwtDecode(credentialResponse.credential)
                        setGoogleDetails(data)
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    />
                    <div className='mt-5'>
                        {insideRegister?
                            <p>Alredy have an accout? <Link to={'/'} >Login</Link></p>
                            :
                            <p>Dont have an account? <Link to={'/register'} >Register</Link></p>
                        }
                    </div>
                </div>
                <div className="pp2 col-lg-6 d-flex justify-content-center align-items-center">
                    <img className='img-fluid' src="https://cdni.iconscout.com/illustration/premium/thumb/user-login-4268415-3551762.png" alt="" />
                </div>
            </div>
        </div>
        <ToastContainer position="top-center" theme="colored" autoClose={3000}/>
    </div>
  )
}

export default Login