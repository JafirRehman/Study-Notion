import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import Buttoncomponent from '../core/Homepage/Buttoncomponent'
import { HiSearch } from 'react-icons/hi'
import { Navdata } from '../../data/navbar-links'
import { BsChevronDown } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from "../../main";
import { TiShoppingCart } from 'react-icons/ti'
import { useEffect, useState, useRef } from 'react';
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { MdMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { IoMdHome } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

const Navbar: React.FC = () => {
  const [mobsublinks, setMobsublinks] = useState(false)
  const [navmenu, setNavmenu] = useState(false)
  const mobilenav = useRef<HTMLDivElement>(null)
  const crossbutton = useRef<HTMLDivElement>(null)
  useOnClickOutside([mobilenav, crossbutton], () => setNavmenu(false))

  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.profile);
  const { totalItems } = useSelector((state: RootState) => state.cart);

  type SublinksState = {
    _id: string,
    name: string,
    discription: string
  }
  type Navlinks = {
    title: string,
    path?: string
  }

  const location = useLocation()
  const matchRoutes = (routes: string) => {
    return matchPath({ path: routes }, location.pathname)
  }

  const [sublinks, setsublinks] = useState<null | SublinksState[]>(null);
  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.GETALLCATEGORIES_API);
      if (result?.data?.data?.length > 0) {
        setsublinks(result?.data?.data);
      }
      console.log(result.data.data)
      //localStorage.setItem("sublinks", JSON.stringify(result.data.data));

    } catch (error) {
      // setsublinks(JSON.parse(localStorage.getItem("sublinks")));
      // console.log("could not fetch sublinks",localStorage.getItem("sublinks"));
      console.log(error);
    }
  }
  useEffect(() => {
    fetchSublinks();
  }, [])

  const NavbarLinks: Navlinks[] = Navdata


  return (
    <div className='fixed w-full flex h-[60px] py-3 border-b  border-[#52525B] bg-[#0E0E11] z-40'>
      <div className='max-w-[1250px] w-[90%] mx-auto flex justify-between items-center'>
        <div className='text-white text-[2.5rem] lg:hidden'>
          <div ref={crossbutton} onClick={() => setNavmenu(!navmenu)}>
            {
              navmenu ? <RxCross1 /> : <MdMenu />
            }
          </div>
          <div ref={mobilenav} className={`${!navmenu && 'hidden'} flex items-center text-[1.7rem] flex-col fixed top-[60px] bottom-0 left-0 w-[160px] z-30 bg-[#18181B]`}>
            {
              user && (
                <div className='flex flex-col py-8 gap-4 items-center'>
                  <Buttoncomponent active={false} linkto='/login'>Login</Buttoncomponent>
                  <Buttoncomponent active={false} linkto='/signup'>Signup</Buttoncomponent>
                </div>
              )
            }
            <div className='py-10 flex flex-col items-center px-2 gap-6'>
              <Link to={'/myprofile'} className='flex items-center gap-4 '>
                <img className='w-[50px] h-[50px] rounded-full' alt='profile image' src='https://api.dicebear.com/6.x/initials/svg?seed=jafir malana&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600'/>
                <div>
                  <h1 className='font-bold'>Jafir Malana</h1>
                  <h2 className='text-[1.3rem] text-[#6a6a76]'>Welcome Back</h2>
                </div>
              </Link>
              <div className='flex gap-2 items-center'>
                <TiShoppingCart />
                <Link to={'/cart'}>Cart</Link>
              </div>
              <button className='flex gap-2 items-center'>
                <IoIosLogOut />
                <span>Logout</span>
              </button>
            </div>
            <nav className='flex flex-col gap-10 items-center border-t w-full py-10'>
              <Link to={'/'} className={`${matchRoutes('/') && 'text-ourred-500'} flex items-center gap-2`}>
                <IoMdHome />
                <span>Home</span>
              </Link>
              <div className='flex flex-col gap-4 w-full items-center'>
                <div className='flex gap-2 items-center' onClick={() => setMobsublinks(!mobsublinks)}>
                  <span>Catalog</span>
                  <BsChevronDown className='text-[1.3rem]' />
                </div>
                {
                  mobsublinks && <div className='flex w-full flex-col mt-5 text-[1.4rem]'>  
                    {
                      sublinks?.map((category, index) => (
                        <Link className='text-center w-full border-collapse border-y py-2' key={index} to={'/'}>{category.name}</Link>
                      ))
                    }
                  </div>
                }
              </div>
              <Link to={'/about'} className={`${matchRoutes('/about') && 'text-ourred-500'} flex items-center gap-2`}>
                <FaCircleInfo />
                <span>About Us</span>
              </Link>
              <Link to={'/contactus'} className={`${matchRoutes('/contactus') && 'text-ourred-500'} flex items-center gap-2`}>
                <IoMdMail />
                <span>Contact Us</span>
              </Link>

            </nav>
          </div>
        </div>
        <div className='hidden lg:block'>
          <Link to={'/'}><img className='w-[115px] mobile:w-[150px]' loading="lazy" src={logo} alt="Logo" /></Link>
        </div>
        <nav className='hidden lg:block'>
          <ul className='flex gap-10 text-ourred-50 text-[1.2rem] sm:text-[1.6rem]'>
            {
              NavbarLinks.map((link, index) => (
                <li key={index}>
                  {
                    link?.path ? (
                      <Link className={`${matchRoutes(link?.path) && "text-ourred-500"}`} to={link?.path}>{link?.title}</Link>
                    ) : (
                      <div className='flex cursor-pointer items-center relative gap-2 group'>
                        <p>{link?.title}</p>
                        <BsChevronDown className='text-[1rem]' />
                        <div className='border border-[#52525B] translate-x-[-50%] left-[50%] w-[270px] invisible group-hover:visible opacity-0 group-hover:opacity-100 duration-300  absolute top-14 bg-[#18181B]  z-20 text-ourred-50 p-5 flex flex-col text-[1.5rem] rounded-xl'>
                          <div className='border border-r-0 border-b-0 border-[#52525B] -z-10 w-5 h-5 absolute translate-x-[183%] left-[50%] -top-3 rotate-45 bg-[#18181B]'></div>
                          {
                            sublinks?.map((category, index) => (
                              <Link key={index} to={'/'} className='hover:bg-[#0E0E11] p-5 rounded-xl duration-300'>{category?.name}</Link>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        {/** Auth */}
        <div className='flex gap-5'>
          {
            token === null && (
              <>
                <div className='hidden lg:block'><Buttoncomponent active={false} linkto='/login'>Login</Buttoncomponent></div>
                <div className='hidden lg:block'><Buttoncomponent active={false} linkto='/signup'>Signup</Buttoncomponent></div>
              </>
            )
          }
          <div className='lg:hidden'>
            <Link to={'/'}><img className='w-[115px] mobile:w-[150px]' loading="lazy" src={logo} alt="Logo" /></Link>
          </div>
          <button className='text-white'>
            <HiSearch className='rounded-full text-[23px] mobile:text-[30px]' />
          </button>
          {
            user && user.accountType !== "Instructor" && (
              <Link to={'/dashboard/cart'} className='relative'>
                <TiShoppingCart className='text-[30px]' />
                {
                  totalItems > 0 && <span className='absolute bottom-0 right-0 bg-ourred-500  rounded-full w-6 h-6 text-ourred-50 text-center text-[10px]'>{totalItems}</span>
                }
              </Link>
            )
          }
          {
            user && <ProfileDropDown />
          }

        </div>
      </div>
    </div>
  )
}

export default Navbar