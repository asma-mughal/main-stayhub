import React,{useState, useEffect} from 'react'
import { mainDest, star1, home, guest, bedroom, bathroom } from '../../assets'
import { aminities, destinatons } from '../../constants'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Carousel from '../../components/Slider/Carousel';
const DestPage = ({oneProperty}) => {
  const { id } = useParams()
  const uniqueId = localStorage.setItem("propertyId", id)
  const [shuffledIndex, setShuffledIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const getRandomIndex = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  useEffect(() => {
    const newShuffledIndex = getRandomIndex(0, 3);
    setShuffledIndex(newShuffledIndex);
  }, []);
    let totalBedrooms = 0;
  let totalBathrooms = 0;

  if (oneProperty?.details?.BedroomAccommodations?.BedroomAccommodation) {
    totalBedrooms = oneProperty.details.BedroomAccommodations.BedroomAccommodation.length;
  }

  if (oneProperty?.details?.BathroomAccommodations?.BathroomAccommodation) {
    totalBathrooms = oneProperty.details.BathroomAccommodations.BathroomAccommodation.length;
  }
  const url = oneProperty?.PropertyImages?.PropertyImage?.[shuffledIndex]?.ImageUrl?.['#text']?.value || 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  console.log(oneProperty)

  return (

  <>
      <div className="w-full font-poppins">
{ url && <Carousel PropertyImage={oneProperty?.PropertyImages?.PropertyImage}/> }
       
      </div>
      <div className="flex flex-row items-center my-5">
       
        <span className={`text-sm text-justify text-gray-500 ml-2`}>
          {oneProperty?.record?.review} reviews
        </span>
      </div>
      <div className="flex-col flex">
       
        <h1 className="font-semibold text-heading font-poppins mb-2">The Space</h1>
        <p className={`text-xs text-justify text-gray-500 font-poppins my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl`}>
        Welcome to our popular destinations section, where we unveil a curated collection of captivating locations that are beloved by travelers worldwide. Whether you seek the tranquility of a beachside retreat, the vibrant energy of a bustling city, or the charm of a historic town, our selection of popular destinations offers something for every wanderlust-filled soul. Prepare to embark on an unforgettable journey as we highlight the unique experiences and hidden gems that await you.
        </p>
        {oneProperty?.Basicinfo?.City['#text']?.value && 
        <>
        <h1 className="font-semibold text-heading mb-2 font-poppins">Property Location</h1>
        <p className="text-xs text-justify text-gray-500 font-poppins 
       xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl">
        <p className="text-xs text-justify text-gray-500 font-poppins
         my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl">
  {oneProperty?.Basicinfo?.Street['#text']?.value} {oneProperty?.Basicinfo?.City['#text']?.value},
 {'  '}  {oneProperty?.Basicinfo?.State['#text']?.value} {oneProperty?.Basicinfo?.Zip['#text']?.value}, {oneProperty?.Basicinfo?.Country['#text']?.value}
</p>
</p>
        </>
}
        <h1 className="font-semibold text-heading mb-2 font-poppins">Description</h1>
        <p className={`text-xs text-justify text-gray-500 font-poppins my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl`}>
          {oneProperty?.Basicinfo?.Description['#text']?.value}
        </p>
       
        <h1 className="font-semibold text-heading mb-2 font-poppins">Property Features</h1>
{oneProperty?.BathroomAccommodations && (
  <div className="flex">
   
    <div className="w-1/4 p-4 text-center border-r">
      <div className="mb-2">
        <img src={home} alt="Home Icon" className="w-5 h-5 mx-auto" />
      </div>
      <p className="text-xs font-poppins">Home</p>
    </div>
    <div className="w-1/4 p-4 text-center border-r">
      <div className="mb-2">
        <img src={guest} alt="Guest Icon" className="w-5 h-5 mx-auto" />
      </div>
      <p className="text-xs font-poppins">Guests</p>
    </div>
    <div className="w-1/4 p-4 text-center border-r">
      <div className="mb-2">
        <img src={bedroom} alt="Bedroom Icon" className="w-5 h-5 mx-auto" />
      </div>
      <p className="text-xs font-poppins">{totalBedrooms} Bedroom(s)</p>
    </div>
    <div className="w-1/4 p-4 text-center">
      <div className="mb-2">
        <img src={bathroom} alt="Bathroom Icon" className="w-5 h-5 mx-auto" />
      </div>
      <p className="text-xs font-poppins">{totalBathrooms} Bathroom(s)</p>
    </div>
  </div>
)}
        <h1 className="font-semibold text-heading mb-2 font-poppins">Amenities</h1>
        <div className="container my-2">
          <div className="w-full lg:w-1/2 xl:w-1/2 ">
            <div className="flex flex-wrap items-start justify-between">
              {/* Map through amenities */}
              {oneProperty?.CustomAmenities?.CustomAmenity?.map((amenity) => (
                <div className="w-2/6 mb-3 lg:mt-0 md:w-2/5 lg:w-1/6" key={amenity.id}>
                  <div className="flex flex-col pr-4 items-center justify-start">
                    <img src={amenity.icon} className="h-6 w-6 mb-3" alt={amenity.title} />
                    <p className="text-xs font-poppins">{amenity?.Name['#text']?.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
           onClick={()=>navigate("/getQuote")}
            className="bg-secondary hover:bg-secondary/80
            mt-5 w-[150px]
             text-white text-xs px-6 py-4 capitalize
              rounded-full transition duration-300 font-poppins">
              Book your stay</button>
      </div>
      

   </>
  )
}

export default DestPage
