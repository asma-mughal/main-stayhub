import React, {useState, useEffect} from 'react'
import styles from '../../style'
import { arrow } from '../../assets'
import CardDest from './CardDest'
import { destinatons } from '../../constants'
import { Link, json, useNavigate } from 'react-router-dom'
import { useMyContext } from '../../context/MyContext'
import { useTranslation } from 'react-i18next';
const Destination = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();
  const { fetchData,convertXmlToJson,jsonData, setJsonData,fetchImage} = useMyContext()
  const [error, setError] = useState()
  const [imagePaths, setImagePaths] = useState([]);
  useEffect(() => {
   fetchData((error, responseData) => {
     if (error) {
       setError('Error fetching data');
     } else {
      const res = convertXmlToJson(responseData['#text']?.value)
      setJsonData((res))
     }
   });

   }, [])
   useEffect(() => {
    const propertyData = jsonData?.PropertyList?.Property;
    const paths = [];
    const fetchImagesForProperties = async () => {
      if (propertyData) {
        for (const property of propertyData) {
          const propertyID = property.PropertyID;
          const responseData = await fetchImage(propertyID['#text']?.value);
          //console.log(responseData)
          if (responseData && responseData.length > 0) {
            const firstImagePath = responseData[0].imagepath['#text'].value;
            paths.push(firstImagePath);
          }
        }
      }
      setImagePaths(paths);
    }
  
    if (propertyData) {
      fetchImagesForProperties();
    }
  }, [jsonData]);
  return (
    <>
   
    <div className="flex flex-col md:flex-row font-poppins">
    <div className="md:w-1/2 p-4">
    <h1 className={`text-[24px] font-poppins font-bold text-heading leading-[30.8px]`}>Popular Destinations</h1>
    <p className={`text-xs my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl
    text-justify text-gray-500
    `}>From pristine beaches with crystal-clear waters to majestic mountains with panoramic views, breathtaking beauty at every turn.</p>  
    </div>
    <div className="md:w-1/2 p-4 flex lg:justify-end xl:justify-end items-center
    sm:justify-start
    md:justify-start
    ">
      <Link to={"/dest"}>
    <button className="flex items-center p-2 border border-secondary bg-transparent
     rounded"
      
     >
    <span className="mr-2 text-xs"
    
  >View All</span>
      <img src={arrow} alt="Icon" className="w-3 h-3" />
      </button>
      </Link>
    </div>
   
  </div>
  <CardDest data ={jsonData}
  start={4}
  end={8}
  link={true}
  filterYes= {true}
  imagePaths={imagePaths} 
  />
  </>
  )
}

export default Destination
