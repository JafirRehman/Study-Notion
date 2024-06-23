import React, { useRef, useState } from 'react'
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { BsChevronDown } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const ProfileDropDown: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false)

    const dropdownref = useRef<HTMLDivElement>(null)

    useOnClickOutside(dropdownref, () => setOpen(false))

    return (
        <div className='relative' ref={dropdownref}>
            <button className='flex flex-row items-center gap-2' onClick={() => setOpen(pre => !pre)} >
                <img className='w-[30px] h-[30px] rounded-full' src='https://api.dicebear.com/6.x/initials/svg?seed=jafir malana&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600' />
                <BsChevronDown className='text-[1rem]' />
            </button>
            {
                open && (
                    <div className='border border-[#52525B]  translate-x-[-50%] left-[50%] visible group-hover:visible opacity-100 group-hover:opacity-100 duration-300  absolute top-16 bg-[#18181B]  z-20 text-ourred-50 flex flex-col text-[1.5rem] rounded-xl'>
                        <div className='border border-r-0 border-b-0 border-[#52525B] w-5 h-5 absolute translate-x-[90%] left-[50%] -top-3 rotate-45 bg-[#18181B]'></div>
                        <Link to={'/myprofile'} className='m-[-1px] m-b-[-2px] border border-[#52525B] hover:bg-[#0E0E11] rounded-b-none rounded-xl p-5'>
                            <div className='flex items-center gap-4'>
                                <RxDashboard />
                                <span>Dashboard</span>
                            </div>
                        </Link>
                        <button className='m-[-1px] border border-[#52525B] hover:bg-[#0E0E11] rounded-t-none rounded-xl p-5'>
                            <div className='flex items-center gap-4'>
                                <IoIosLogOut />
                                <span>Logout</span>
                            </div>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ProfileDropDown