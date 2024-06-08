import React from 'react'
import { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

type Formdatatype = {
    userrole: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmpassword: string
}
const SignUp: React.FC = () => {
    const [passwordtype, setPasswordtype] = useState<string>('password')
    const [confirmpasswordtype, setConfirmpasswordtype] = useState<string>('password')
    const [formdata, setFormdata] = useState<Formdatatype>({
        userrole:'student',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
    })
    function changeuserrole(e:React.MouseEvent<HTMLButtonElement>) {
        setFormdata({...formdata,userrole:e.currentTarget.value})
    }
    function changepasswordtype() {
        passwordtype === "password" ? setPasswordtype("text") : setPasswordtype("password")
    }
    function changeconfirmpasswordtype(){
        confirmpasswordtype === "password" ? setConfirmpasswordtype("text") : setConfirmpasswordtype("password")
    }
    function changeformvalues(e: React.ChangeEvent<HTMLInputElement>) {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    function formhandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (formdata.password !== formdata.confirmpassword) {
            alert("Passwords Do Not Match")
            return
        }
        alert(`userrole:::${formdata.userrole} ${'\n'} firstname::: ${formdata.firstname} ${'\n'} lastname:::${formdata.lastname} ${'\n'} email ::: ${formdata.email} ${'\n'} password::: ${formdata.password} ${'\n'} confirmpassword:::${formdata.confirmpassword}`)
    }
    return (
        <div className='mt-5'>
            <form onSubmit={formhandler} className='flex flex-col text-[1.2rem] mobile:text-[1.6rem]'>
                <div className='bg-[#18181B] mb-5 self-start flex border border-ourred-600 gap-10 p-2 rounded-full'>
                    <button className={`text-[1.5rem]  px-5 py-1 rounded-full ${formdata.userrole==='student' && 'bg-ourred-400'}`} type='button' value='student' onClick={changeuserrole}>Student</button>
                    <button className={`text-[1.5rem]  px-5 py-1 rounded-full ${formdata.userrole==='instructor' && 'bg-ourred-400'}`} type='button' value='instructor' onClick={changeuserrole}>Instructor</button>
                </div>
                <div className='flex justify-between w-full'>
                    <div className='w-[48%]'>
                        <label htmlFor='firstname' className='mt-2 mb-2'>First Name<span className='text-ourred-500'>*</span></label>
                        <input onChange={changeformvalues} name='firstname' value={formdata.firstname} required id='firstname' className='bg-[#18181B] mt-2 w-full border border-ourred-500 rounded-xl h-[50px] p-3 mobile:p-10 focus:outline-none focus:border-ourred-900' type='text' placeholder='Enter First Name'></input>
                    </div>
                    <div className='w-[48%]'>
                        <label htmlFor='lastname' className='mt-2 mb-2'>Last Name<span className='text-ourred-500'>*</span></label>
                        <input onChange={changeformvalues} name='lastname' value={formdata.lastname} required id='lastname' className='bg-[#18181B] border mt-2 w-full border-ourred-500 rounded-xl h-[50px] p-3 mobile:p-10 focus:outline-none focus:border-ourred-900' type='text' placeholder='Enter Last Name'></input>

                    </div>
                </div>
                <label htmlFor='email' className='mt-5 mb-2'>Email Address<span className='text-ourred-500'>*</span></label>
                <input onChange={changeformvalues} name='email' value={formdata.email} required id='email' className='bg-[#18181B] border border-ourred-500 rounded-xl h-[50px] p-3 mobile:p-10 focus:outline-none focus:border-ourred-900' type='email' placeholder='Enter Email Address'></input>

                <div className='flex justify-between w-full mt-10'>
                    <div className='relative w-[48%]'>
                        <label htmlFor='password' className='mt-10 mb-2'>Password<span className='text-ourred-500'>*</span></label>
                        <button type='button' className='absolute top-14 right-2 mobile:top-16 mobile:right-5' onClick={changepasswordtype}>{passwordtype === "password" ? <IoMdEye className='text-ourred-500 text-[2rem] ' /> : <IoMdEyeOff className='text-ourred-500s text-[2rem] ' />}</button>
                        <input onChange={changeformvalues} name='password' value={formdata.password} id='password' required maxLength={15} className='bg-[#18181B] w-full border border-ourred-500 rounded-xl h-[50px] p-3 mobile:p-10 focus:outline-none focus:border-ourred-900' type={passwordtype} placeholder='Enter Password'></input>
                    </div>
                    <div className='relative w-[48%]'>
                        <label htmlFor='confirmpassword' className='mt-10 mb-2'>Confirm Password<span className='text-ourred-500'>*</span></label>
                        <button type='button' onClick={changeconfirmpasswordtype} className='absolute top-14 right-2 mobile:top-16 mobile:right-5'>{confirmpasswordtype === "password" ? <IoMdEye className='text-ourred-500 text-[2rem] ' /> : <IoMdEyeOff className='text-ourred-500 text-[2rem] ' />}</button>
                        <input onChange={changeformvalues} name='confirmpassword' value={formdata.confirmpassword} id='confirmpassword' required maxLength={15} className='bg-[#18181B] w-full border border-ourred-500 rounded-xl h-[50px] p-3 mobile:p-10 focus:outline-none focus:border-ourred-900' type={confirmpasswordtype} placeholder='Confirm Password'></input>
                    </div>
                </div>
                <button type='submit' className='text-ourred-50 mt-14 bg-ourred-600 hover:bg-ourred-800 text-[1.2rem] font-bold sm:text-[1.6rem] px-6 py-3 rounded-xl hover:scale-[0.93] transition-transform duration-300'>SignUp</button>
            </form>
        </div>
    )
}

export default SignUp