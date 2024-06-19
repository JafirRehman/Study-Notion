import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import Buttoncomponent from '../core/Homepage/Buttoncomponent'
import { HiSearch } from 'react-icons/hi'
import { Navdata } from '../../data/navbar-links'
import { BsChevronDown } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from "../../main";
import { TiShoppingCart } from 'react-icons/ti'

const Navbar: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>()

  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.profile);
  const { totalItems } = useSelector((state: RootState) => state.cart);

  const location = useLocation()
  const matchRoutes = (routes: string) => {
    return matchPath({ path: routes }, location.pathname)
  }

  type Navlinks = {
    title: string,
    path?: string
  }[]
  const NavbarLinks: Navlinks = Navdata

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
                    link.path ? (
                      <Link className={`${matchRoutes(link.path) && "text-ourred-500"}`} to={link.path}>{link.title}</Link>
                    ) : (
                      <div className='flex cursor-pointer items-center gap-2'>
                        <span>{link.title}</span>
                        <BsChevronDown className='text-[1rem]' />
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
            token===null && (
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
        </div>
      </div>
    </div>
  )
}

export default Navbar