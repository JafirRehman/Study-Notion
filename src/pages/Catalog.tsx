import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
const Catalog:React.FC = () => {
    const params=useParams()
    useEffect(()=>{
        console.log(params)
    })
    return (
        <div className='text-white mt-[60px]'>
            <div className='bg-[#18181B]'>
                <div className='max-w-[1250px] min-h-[260px] py-20 w-[90%] mx-auto flex flex-col justify-center gap-6 '>
                    <p className='text-2xl text-richblack-300'>Home/Catalog/<span className='text-yellow-25'>hello</span> </p>
                    <p className='text-6xl text-richblack-5'>hello</p>
                    <p className='text-2xl max-w-[870px] text-richblack-200 '>Blockchain is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network. An asset can be tangible (a house, car, cash, land) or intangible (intellectual property, patents, copyrights, branding). Virtually anything of value can be tracked and traded on a blockchain network, reducing risk and cutting costs for all involved.</p>
                </div>
            </div>
        </div>
    )
}

export default Catalog