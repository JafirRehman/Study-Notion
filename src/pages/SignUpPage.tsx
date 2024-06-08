import React from 'react'
import AuthTemplate from '../components/core/Auth/AuthTemplate'
import signupimage from "../assets/Images/signup.webp"

const SignUpPage:React.FC = () => {
  return (
    <AuthTemplate title='Join the millions learning to code with StudyNotion for free' discription='Build skills for today, tomorrow, and beyond. Education to future-proof your career.' authimg={signupimage} formtype='SignUp' /> 
  )
}

export default SignUpPage