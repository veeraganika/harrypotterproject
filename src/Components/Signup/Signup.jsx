// import React, { useState, useContext } from 'react'
// import { Link, useNavigate} from 'react-router-dom';
// import  { UserProvider } from '../AuthProvider'

// import './Signup.css'
// import { toast } from 'react-toastify';


// const Signup = () => {

//   const [userSignup, setUserSignup] =useState({
//     fullName : '',
//     mobile: '',
//     email: '',
//     password: '',
//   })


//   const navigate = useNavigate()

//   const { signup } = useContext(UserProvider);


//   const userInputData= (e) => {

//     const { name, value } = e.target;

//     setUserSignup({
//       ...userSignup,
//       [name] : value
//     })
//   }

//   console.log(userSignup)

//   const signupHandler =  async (e) => {
//     e.preventDefault();
//     const userData = await signup(userSignup);

//     if(userData){
//       toast.success("User signed up successfully");
//       return navigate('/login')
//     }

//   }


//   return (
//     <div className='bg-secondary d-flex justify-content-center align-items-center vh-100' >
//         <form className='text-center d-flex flex-column signup-form-container' >
//             <input name='fullName' onChange={userInputData} className='form-control signup-inputs' type="text" placeholder='Full name...' />
//             <input name='mobile' onChange={userInputData} className='form-control signup-inputs' type="number" placeholder='Mobile...' />
//             <input name='email' onChange={userInputData} className='form-control signup-inputs' type="email" placeholder='Email...' />
//             <input name='password' onChange={userInputData} className='form-control signup-inputs' type="password" placeholder='Password...' />
//             <button className='btn btn-outline-warning signup-btn' onClick={signupHandler} >Signup</button>
//             <div className='mt-2' >
//                 <Link to='/login' className='text-white text-decoration-none'  >Already have an account? Login here</Link>
//             </div>
//         </form>
//     </div>
//   )
// }

// export default Signup

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserProvider } from '../AuthProvider';
import './SignUp.css';
const SignUp = () => {
const [userSignUp,setUserSignUp] =useState({
    fullName:'',
    mobile:'',
    email:'',
    password:''
    })

const navigate= useNavigate();

const {signUp}=useContext(UserProvider);

const userInputData=(e)=>{
  const {name,value}=e.target;

 setUserSignUp({
  ...userSignUp,
  [name]:value
 })
}
  const signUpHandler= async(e)=>{
    e.preventDefault();
    const userData=await signUp(userSignUp);

    if(userData){
      toast.success("User Signed Up Successfully");
      return navigate('/login')
    }

    }

  return (
    <div className=' text text-center justify-content-center align-items-center'>
       <h2 style={{color:'magenta'}}>SignUp</h2>
       <div className='signUp justify-content-center align-items-center'>
       <input name='fullName' onChange={userInputData} className='form-control w-75 mb-3 input-field m-auto input mt-2' type="text" placeholder='Enter your FullName...'/>
       <input name='mobile'   onChange={userInputData} className='form-control w-75 mb-3 input-field m-auto input' type="number" placeholder='Enter your MobileNumber...'/> 
       <input name='email'    onChange={userInputData} className='form-control w-75 mb-3 input-field m-auto input' type="email" placeholder='Enter your Email...'/>
       <input name='password' onChange={userInputData} className='form-control w-75 mb-3 input-field m-auto input' type="password" placeholder='Enter your Password...'/>
       <button onClick={signUpHandler} className='btn btn-outline-warning text-white w-25'>SignUp</button>
       <p>Already have an account?<Link className="text-dark text-decoration-none" to='/login'>Login here</Link></p>
    </div>
    </div>
  )
}
export default SignUp