import React from 'react'
import GalleryCard from '../../components/Gallery/GalleryCard';
import { galleryData } from '../../constants';
const SinglePage = () => {
  return (
    <>
    <div className="flex flex-col md:flex-row font-poppins">
   <div className="md:w-1/2 p-4  ">
   <h1 className={`text-[24px] font-poppins font-bold text-black leading-[30.8px]`}>Success Stories</h1>
   </div>
 </div>
 <GalleryCard data={galleryData} />

   </>
  )
}

export default SinglePage
