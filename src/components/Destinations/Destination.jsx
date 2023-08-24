import React, {useState, useEffect} from 'react'
import styles from '../../style'
import { arrow } from '../../assets'
import CardDest from './CardDest'
import { destinatons } from '../../constants'
import { Link, json, useNavigate } from 'react-router-dom'
import { useMyContext } from '../../context/MyContext'
const Destination = () => {
  const navigate = useNavigate()
  const { fetchData,convertXmlToJson,jsonData, setJsonData} = useMyContext()
  const [error, setError] = useState()
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
  start={0}
  end={3}
  link={true}
  filterYes= {true}
  />
  </>
  )
}

export default Destination
