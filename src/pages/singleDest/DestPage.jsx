  import React from 'react'
  import {  home, guest, bedroom, bathroom, info } from '../../assets'
  import { useNavigate } from "react-router-dom";
  import Carousel from '../../components/Slider/Carousel';
  import { amenityIconMapping } from '../../constants';
  const DestPage = ({oneProperty, t}) => {
    const navigate = useNavigate();
    let totalBedrooms = 0;
    let totalBathrooms = 0;

    if (oneProperty?.details?.BedroomAccommodations?.BedroomAccommodation) {
      totalBedrooms = oneProperty.details.BedroomAccommodations.BedroomAccommodation.length;
    }

    if (oneProperty?.details?.BathroomAccommodations?.BathroomAccommodation) {
      totalBathrooms = oneProperty.details.BathroomAccommodations.BathroomAccommodation.length;
    }
    const extractUniqueAmenities = () => {
      const amenityPattern = /[A-Za-z\s-]+/g;
      const amenitiesSet = new Set();
    
      oneProperty?.CustomAmenities?.CustomAmenity?.forEach((amenity) => {
        const customName = amenity?.CustomName['#text']?.value;
        const value = amenity?.Value['#text']?.value;

        const amenitiesList = customName.match(amenityPattern);
        if (customName && value) {
        if (amenitiesList) {
          amenitiesList.forEach((amenity) => {
            const trimmedAmenity = amenity.trim();
    
            if (trimmedAmenity === 'DVD' || trimmedAmenity === 'DVR') {
              amenitiesSet.add('DVD/DVR');
            } else {
              amenitiesSet.add(trimmedAmenity);
            }
          });
        }
      }
      });
    
      return Array.from(amenitiesSet);
    };
    
    const uniqueAmenities = extractUniqueAmenities();
    const getDefaultIcon = () => {
      return info;
    };
    return (

    <>
        <div className="w-full font-poppins">
  {oneProperty?.PropertyImages?.PropertyImage && <Carousel PropertyImage={oneProperty?.PropertyImages?.PropertyImage}/> }
        
        </div>
        <div className="flex flex-row items-center my-5">
        </div>
        <div className="flex-col flex">
        
          <h1 className="font-semibold text-heading font-poppins mb-2">{t("The Space")}</h1>
          <p className={`text-xs text-justify text-gray-500 font-poppins my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl`}>
          {t("Welcome to our popular destinations section, where we unveil a curated collection of captivating locations that are beloved by travelers worldwide. Whether you seek the tranquility of a beachside retreat, the vibrant energy of a bustling city, or the charm of a historic town, our selection of popular destinations offers something for every wanderlust-filled soul. Prepare to embark on an unforgettable journey as we highlight the unique experiences and hidden gems that await you")}.
          </p>
          {oneProperty?.Basicinfo?.City['#text']?.value && 
          <>
          <h1 className="font-semibold text-heading mb-2 font-poppins">{t("Property Location")}</h1>
          <p className="text-xs text-justify text-gray-500 font-poppins 
        xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl">
          <p className="text-xs text-justify text-gray-500 font-poppins
          my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl">
    {oneProperty?.Basicinfo?.Street['#text']?.value} {oneProperty?.Basicinfo?.City['#text']?.value},
    {' '} {oneProperty?.Basicinfo?.State['#text']?.value} {oneProperty?.Basicinfo?.Zip['#text']?.value}, {oneProperty?.Basicinfo?.Country['#text']?.value}
  </p>
  </p>
          </>
  }
          <h1 className="font-semibold text-heading mb-2 font-poppins">{t("Description")}</h1>
          <p className={`text-xs text-justify text-gray-500 font-poppins my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl`}>
            {oneProperty?.Basicinfo?.Description['#text']?.value?.replace(/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/g, '')}
          </p>
        
          <h1 className="font-semibold text-heading mb-2 font-poppins">{t("Property Features")}</h1>
  {oneProperty?.BathroomAccommodations && (
    <div className="flex">
    
      <div className="w-1/4 p-4 text-center border-r">
        <div className="mb-2">
          <img src={home} alt="Home Icon" className="w-5 h-5 mx-auto" />
        </div>
        <p className="text-xs font-poppins">{t("Home")}</p>
      </div>
      <div className="w-1/4 p-4 text-center border-r">
        <div className="mb-2">
          <img src={guest} alt="Guest Icon" className="w-5 h-5 mx-auto" />
        </div>
        <p className="text-xs font-poppins">{t("Guests")}</p>
      </div>
      <div className="w-1/4 p-4 text-center border-r">
        <div className="mb-2">
          <img src={bedroom} alt="Bedroom Icon" className="w-5 h-5 mx-auto" />
        </div>
        <p className="text-xs font-poppins">{totalBedrooms} {t("Bedroom(s)")}</p>
      </div>
      <div className="w-1/4 p-4 text-center">
        <div className="mb-2">
          <img src={bathroom} alt="Bathroom Icon" className="w-5 h-5 mx-auto" />
        </div>
        <p className="text-xs font-poppins">{totalBathrooms} {t("Bathroom(s)")}</p>
      </div>
    </div>
  )}
          <h1 className="font-semibold text-heading mb-2 font-poppins">{t("Amenities")}</h1>
          <div className="container my-2">
            <div className="w-full lg:w-1/2 xl:w-1/2 ">
              <div className="flex flex-wrap items-start justify-between">
              {uniqueAmenities?.map((amenity) => (
    <div className="w-2/6 mb-3 lg:mt-0 md:w-2/5 lg:w-1/6" key={oneProperty?.id}>
      <div className="flex flex-col pr-4 items-center justify-start">
      <img src={amenityIconMapping[amenity] || getDefaultIcon()} className="h-6 w-6 mb-3" alt={amenity} />
        <p className="text-xs font-poppins text-center">{(amenity)}</p>
      </div>
    </div>
  ))}
              </div>
            </div>
          </div>

          <button 
            onClick={()=>navigate("/available")}
              className="bg-secondary hover:bg-secondary/80
              mt-5 w-[150px]
              text-white text-xs px-6 py-4 capitalize
                rounded-full transition duration-300 font-poppins">
               {t("Book your stay")}</button>
        </div>
        

    </>
    )
  }

  export default DestPage
