import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Propstype={
    children:string | ReactNode,
    linkto:string,
    active:boolean
}

const Buttoncomponent:React.FC<Propstype> = ({children,linkto,active}) => {
  return (
    <Link className={`lg:mt-6 text-[1.2rem] font-bold sm:text-[1.6rem] px-6 py-2 rounded-xl hover:scale-[0.93] transition-transform duration-300
        ${active ? "text-ourred-50 bg-ourred-600 hover:bg-ourred-800" : "text-white bg-richblack-800"} `}
        to={linkto}>{children}
    </Link>
  )
}

export default Buttoncomponent