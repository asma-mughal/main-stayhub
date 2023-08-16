import React from 'react'
import { arrow } from '../../assets'
import GalleryCard from './GalleryCard'
import { galleryData } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
const Gallery = () => {
  const navigate = useNavigate()
  return (
    <section id="features" className={"my-5"}>
    <div className="flex flex-col md:flex-row font-poppins">
    <div className="md:w-1/2 p-4">
    <h1 className={`text-[24px] font-poppins font-bold text-heading leading-[30.8px]`}>Achievers Archive</h1>
    <p className={`text-xs my-2 text-justify xs:text-xs text-gray-500 
    sm:text-base md:text-sm lg:text-base xl:text-xl`}>
    At our esteemed establishment, we believe in going above and beyond to ensure your stay surpasses all expectations.</p>  
    </div>
    <div className="md:w-1/2 p-4 flex lg:justify-end xl:justify-end items-center
    sm:justify-start
    md:justify-start
    ">
     
    <button className="flex items-center p-2 border border-secondary bg-transparent
     rounded"
     onClick={()=>navigate("/success")}
     >
    <span className="mr-2 text-xs">View All</span>
      <img src={arrow} alt="Icon" className="w-3 h-3" />
      </button>
   
    </div>
  
  </div>
  <GalleryCard data={galleryData} />
  </section>
  )
}

export default Gallery
