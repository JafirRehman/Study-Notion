import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
type Formdatatype = {
    email: string,
    password: string
}
const LoginForm: React.FC = () => {
    const [passwordtype, setPasswordtype] = useState<string>('password')
    const [formdata, setFormdata] = useState<Formdatatype>({
        email: '',
        password: ''
    })
    function changepasswordtype() {
        passwordtype === "password" ? setPasswordtype("text") : setPasswordtype("password")
    }
    function changeformvalues(e: React.ChangeEvent<HTMLInputElement>) {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    function formhandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        alert(`email ::: ${formdata.email} password::: ${formdata.password}`)
    }
    return (
        <div>
            <form onSubmit={formhandler} className='flex flex-col text-[1.2rem] mobile:text-[1.6rem]'>
                <label htmlFor='email' className='mt-2 mb-2'>Email Address<span className='text-ourred-500'>*</span></label>
                <input onChange={changeformvalues} name='email' value={formdata.email} required id='email' className='bg-[#18181B] border border-ourred-500 rounded-xl h-[50px] p-10 focus:outline-none focus:border-ourred-900' type='email' placeholder='Enter Email Address'></input>
                <label htmlFor='password' className='mt-10 mb-2'>Password<span className='text-ourred-500'>*</span></label>
                <div className='relative'>
                    <button type='button' onClick={changepasswordtype}>{passwordtype === "password" ? <IoMdEye className='text-ourred-500 absolute top-6 right-5 text-[2.3rem] ' /> : <IoMdEyeOff className='text-ourred-500 absolute top-6 right-5 text-[2.3rem] ' />}</button>
                    <input onChange={changeformvalues} name='password' value={formdata.password} id='password' required maxLength={15} className='bg-[#18181B] w-full border border-ourred-500 rounded-xl h-[50px] p-10 focus:outline-none focus:border-ourred-900' type={passwordtype} placeholder='Enter Password'></input>
                </div>
                <Link className='mt-2 text-[1.1rem] self-end text-blue-100' to={"/home"}>Forgot Password</Link>
                <button type='submit' className='text-ourred-50 mt-14 bg-ourred-600 hover:bg-ourred-800 text-[1.2rem] font-bold sm:text-[1.6rem] px-6 py-3 rounded-xl hover:scale-[0.93] transition-transform duration-300'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm