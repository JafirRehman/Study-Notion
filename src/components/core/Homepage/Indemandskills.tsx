import React from 'react'
import TimelineImage from '../../../assets/Images/TimelineImage.png'
import HignlightText from './HignlightText';

const Indemandskills:React.FC = () => {
    return (
        <section className='justify-between mt-32 mobile:mt-72 mb-10 w-full text-ourred-50 gap-12 lg:gap-0 flex flex-col lg:flex-row items-center'>
            <div className='lg:w-[50%] mb-14'>
                <img alt="image" className='w-[100%]  max-w-[500px] lg:max-w-[600px] shadow-[0px_0px_50px_rgba(8,_112,_184,_0.7)] drop-shadow-[10px_10px_2px_rgba(255,107,146,1)] sm:drop-shadow-[15px_15px_2px_rgba(255,107,146,1)]' src={TimelineImage} />
            </div>
            <div className='w-[100%] lg:w-[45%] flex flex-col gap-10'>
                <h3 className='text-[2.5rem] mobile:text-[3.5rem] font-bold'>Get the Skills you need for a <HignlightText text={"Job that is in demand"} /></h3>
                <p className='text-richblack-300 text-[1.5rem] mobile:text-[1.9rem] font-bold'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
            </div>
        </section>
    )
}

export default Indemandskills