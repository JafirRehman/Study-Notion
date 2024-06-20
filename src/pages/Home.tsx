import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import HignlightText from '../components/core/Homepage/HignlightText';
import Buttoncomponent from '../components/core/Homepage/Buttoncomponent';
import Banner from "../assets/Images/banner.mp4"
import { TypeAnimation } from 'react-type-animation';
import Footer from '../components/common/Footer';
import Indemandskills from '../components/core/Homepage/Indemandskills';

const Home: React.FC = () => {
  return (
    <div className='mt-20 w-[90%] max-w-[1250px] mx-auto'>

      <section className='w-full text-white gap-12 flex flex-col items-center justify-center'> {/* first section */}

        <Link to={'/signup'} className='rounded-full'>
          <div className='bg-[#18181B] drop-shadow-[0_1.5px_rgb(252,55,111)]
            hover:drop-shadow-none text-ourred-50 hover:scale-[0.93] font-bold 
            transition-all duration-200 hover:border-2  border-ourred-500 flex flex-row gap-3 items-center 
            justify-center rounded-full  px-10 py-2 sm:px-16 text-[1.3rem] sm:py-4 sm:text-[1.8rem]'>
            <p>Become an Istructor</p>
            <FaArrowRight className='mt-2 text-ourred-500 text-[1.2rem] sm:text-[1.7rem]' />
          </div>
        </Link>

        <div className='font-bold text-[2.5rem] mobile:text-[3.5rem] text-center leading-[39px] text-ourred-50'>
          Empower Your Future with <HignlightText text="Coding Skills" />
        </div>
        <p className='w-[85%] text-center font-bold text-[1.5rem] mobile:text-[1.9rem] text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects and personalized feedback from instructors.
        </p>
        <Buttoncomponent linkto="./about" active={true}>
          Learn More
        </Buttoncomponent>

        <div className='mt-14 mobile:mt-20 '>
          <video loop autoPlay muted className='w-[98%] mx-auto shadow-[0px_0px_50px_rgba(8,_112,_184,_0.7)] drop-shadow-[10px_10px_2px_rgba(255,107,146,1)] sm:drop-shadow-[15px_16px_2px_rgba(255,107,146,1)]'>
            <source src={Banner} type='video/mp4'></source>
          </video>
        </div>

        <div className='mt-14 mobile:mt-72 flex flex-col gap-20 lg:gap-0 justify-between lg:flex-row h-fit mx-auto w-[100%]'>

          <div className='z-10 flex flex-col gap-10 mobile:gap-16 items-start w-[100%] lg:w-[50%]'>
            <h2 className='font-bold text-[2.5rem] mobile:text-[3.5rem] leading-[39px]'>Unlock Your <HignlightText text={"coding potential"} /> with our online courses</h2>
            <p className='font-bold text-[1.5rem] mobile:text-[1.9rem] text-richblack-300'>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</p>
            <Buttoncomponent linkto='/about' active={true}>
              <div className='flex gap-2 items-center '>
                <h3>Try it Yourself </h3>
                <FaArrowRight className='mt-2 text-[1.5rem]' />
              </div>
            </Buttoncomponent>
          </div>

          <div className='relative w-[100%] lg:w-[48%]'>
            <div className='z-0 absolute blur-[60px] w-[45%] h-[50%] top-14 left-10 bg-gradient-to-r from-richblack-200 to-ourred-400 rounded-full'></div>
            <div className='bg-white/6 z-10 h-fit backdrop-blur-3xl border border-richblack-300 px-10 py-5 text-[0.8rem] mobile:text-[1.1rem] sm:text-[1.3rem] flex gap-1 sm:gap-2 items-start w-[100%] lg:leading-10'>
              <div className='flex flex-col w-[5%] text-richblack-300 font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
              </div>

              <div className='bg-gradient-to-b from-[#1FA2FF] to-[#12D8FA] 
              text-transparent bg-clip-text font-mono w-[90%]'>
                <TypeAnimation sequence={[
                  `<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet" href="styles.css"\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n</nav>`
                  , 1000, ""
                ]}
                  wrapper="span"
                  speed={90}
                  style={{ whiteSpace: 'pre-line' }}
                  repeat={Infinity}
                  omitDeletionAnimation={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECOND SECTION */}
      <Indemandskills/>

      {/* FOOTER SECTION */}
      <Footer/>

    </div>
  )
}
export default Home