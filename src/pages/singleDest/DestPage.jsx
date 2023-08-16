import React from 'react'
import { mainDest, star1, home, guest, bedroom, bathroom } from '../../assets'
import { aminities, destinatons } from '../../constants'
import { useParams } from 'react-router-dom'

const DestPage = ({oneProperty}) => {
  const { id } = useParams()
  const uniqueId = localStorage.setItem("propertyId", id)
  const record = destinatons.find((i)=> i.id === id);
  const starImagePath = "star.png";

  const stars = [];
  for (let i = 0; i < record?.review; i++) {
    stars.push(<img src={starImagePath} alt="Star" />);
  }
  return (

  <>
      <div className="w-full h-auto font-poppins">
        <img className="object-cover w-full h-full" src={oneProperty?.PropertyImages?.icon} alt="Image" />
      </div>
      <div className="flex flex-row items-center my-5">
        {Array.from({ length: oneProperty?.record?.review }, (_, index) => (
          <img
            key={index}
            src={star1}
            className="w-3 h-3 m-1"
            alt="Star"
          />
        ))}
        <span className={`text-sm text-justify text-gray-500 ml-2`}>
          {oneProperty?.record?.review} reviews
        </span>
      </div>
      <div className="flex-col flex">
        <h1 className={`text-[24px] font-poppins mb-2 font-bold text-heading leading-[30.8px]`}>
          {oneProperty?.record?.title}{' '}|{' '}{oneProperty?.record?.location}
        </h1>
        <h1 className="font-semibold text-heading font-poppins mb-2">The Space</h1>
        <p className={`text-xs text-justify text-gray-500 font-poppins my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl`}>
          {oneProperty?.record?.spaceDescription}
        </p>
        <h1 className="font-semibold text-heading mb-2 font-poppins">Description</h1>
        <p className={`text-xs text-justify text-gray-500 font-poppins my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl`}>
          {oneProperty?.record?.description}
        </p>
        <h1 className="font-semibold text-heading mb-2">Property Features</h1>
        <div className="container my-2">
          <div className="w-full lg:w-1/2 xl:w-1/2 ">
            <div className="flex flex-wrap items-start justify-between">
              {/* Map through property features */}
              {oneProperty?.record?.details?.map((detail, index) => (
                <div className="w-2/6 mb-3 lg:mt-0 md:w-2/5 lg:w-1/6" key={index}>
                  <div className="flex flex-col pr-4 items-center justify-start">
                    <img src={detail.icon} className="h-6 w-6 mb-3" alt={detail.title} />
                    <p className="text-xs">{detail.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <h1 className="font-semibold text-heading mb-2">Amenities</h1>
        <div className="container my-2">
          <div className="w-full lg:w-1/2 xl:w-1/2 ">
            <div className="flex flex-wrap items-start justify-between">
              {/* Map through amenities */}
              {oneProperty?.aminities?.map((amenity) => (
                <div className="w-2/6 mb-3 lg:mt-0 md:w-2/5 lg:w-1/6" key={amenity.id}>
                  <div className="flex flex-col pr-4 items-center justify-start">
                    <img src={amenity.icon} className="h-6 w-6 mb-3" alt={amenity.title} />
                    <p className="text-xs">{amenity.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

   </>
  )
}

export default DestPage
