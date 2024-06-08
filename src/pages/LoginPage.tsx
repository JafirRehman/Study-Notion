import React from 'react'
import loginimg from "../assets/Images/login.webp"
import AuthTemplate from '../components/core/Auth/AuthTemplate'

const LoginPage: React.FC = () => {
    return (
        <AuthTemplate title='Welcome Back' discription='Build skills for today, tomorrow, and beyond. Education to future-proof your career.' authimg={loginimg} formtype='Login' />
    )
}
export default LoginPage