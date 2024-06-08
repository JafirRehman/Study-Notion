import React from 'react'
import frame from "../../../assets/Images/frame.png"
import LoginForm from './LoginForm'
import HignlightText from '../Homepage/HignlightText'
import SignUpForm from './SignUpForm'

type AuthTemplateProps = {
    title: string,
    discription: string,
    authimg: string,
    formtype:string
}
const AuthTemplate: React.FC<AuthTemplateProps> = ({ title,discription,authimg,formtype }) => {
    return (
        <div className='mb-[100px] w-[90%] max-w-[1250px] mx-auto'>
            <div className='mt-32 w-full flex gap-24 md:gap-0 text-ourred-50 md:flex-row flex-col-reverse md:justify-between md:items-center'>
                <div className='w-full max-w-[450px] mx-auto md:mx-0 md:w-[45%] '>
                    <div className='w-full flex flex-col gap-8'>
                        <h1 className='text-[2.5rem] mobile:text-[3.5rem] font-bold'><HignlightText text={title} /></h1>
                        <p className='text-[1.5rem] mobile:text-[1.9rem] text-richblack-300 font-bold'>{discription}</p>
                    </div>
                    {formtype === 'Login' ? <LoginForm /> : <SignUpForm />}
                </div>
                <div className=' w-full md:w-[45%] flex justify-center md:justify-end'>
                    <div className='relative md:self-end'>
                        <img alt='frame' src={frame} className='z-0 absolute top-3 left-3 w-full' />
                        <img alt='loginimage' src={authimg} className='z-10 relative w-full max-w-[450px] md-max-w-[400px]' />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AuthTemplate