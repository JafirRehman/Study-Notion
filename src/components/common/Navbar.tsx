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
import { useEffect, useState } from 'react';
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";

const Navbar: React.FC = () => {

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
    <div className='w-full flex h-[60px] py-3 border-b  border-[#52525B]'>
      <div className='max-w-[1250px] w-[90%] mx-auto flex justify-between items-center'>
        {/** logo */}
        <div className=''>
          <Link to={'/'}><img className='w-[115px] mobile:w-[150px]' loading="lazy" src={logo} alt="Logo" /></Link>
        </div>
        {/** navbar links */}
        <nav>
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
        <div className='flex gap-5 text-ourred-50'>
          {
            token === null && (
              <>
                <Buttoncomponent active={false} linkto='/login'>Login</Buttoncomponent>
                <Buttoncomponent active={false} linkto='/signup'>Signup</Buttoncomponent>
              </>
            )
          }
          <button>
            <HiSearch className='rounded-full text-[30px]' />
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
          <div className='flex flex-row items-center gap-2 relative'>
            <button className=''>
              <img className='w-[30px] h-[30px] rounded-full' src='https://api.dicebear.com/6.x/initials/svg?seed=jafir malana&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600' />
            </button>
            <BsChevronDown className='text-[1rem]' />
            <div className='border border-[#52525B]  translate-x-[-50%] left-[50%] visible group-hover:visible opacity-100 group-hover:opacity-100 duration-300  absolute top-16 bg-[#18181B]  z-20 text-ourred-50 flex flex-col text-[1.5rem] rounded-xl'>
              <div className='border border-r-0 border-b-0 border-[#52525B] w-5 h-5 absolute translate-x-[90%] left-[50%] -top-3 rotate-45 bg-[#18181B]'></div>
              <div className='m-[-1px] m-b-[-2px] border border-[#52525B] hover:bg-[#0E0E11] rounded-b-none rounded-xl p-5'>
                <Link to={'/myprofile'} className='flex items-center gap-4'>
                  <RxDashboard />
                  <span>Dashboard</span>
                </Link>
              </div>
              <div className='m-[-1px] border border-[#52525B] hover:bg-[#0E0E11] rounded-t-none rounded-xl p-5'>
                <button className='flex gap-4 items-center'>
                  <IoIosLogOut />
                  <span>Logout</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar