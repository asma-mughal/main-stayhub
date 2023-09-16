import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../context/MyContext';
const OptionalService = () => {
    const [propertyRates, setPropertyRates] = useState(null);
    const navigate = useNavigate(); 
    const { GetOptionalServiceIDs} = useMyContext();
    useEffect(() => {
     
    }, []);
    const handleSubmit = () =>{
      setTimeout(() => {
        navigate('/optional')
      }, 1000); 
    
    }
  return (
    <div className="flex flex-col justify-center 
    font-poppins
    items-center h-screen ">
    <div className="bg-white rounded-lg p-8 shadow-xl text-center">
      <h1 className="text-3xl font-semibold mb-4">Optional Rates</h1>
      <div className="space-y-4">
        {propertyRates === null ? (
          <p>Loading Optional Services...</p>
        ) : Object.keys(propertyRates).length === 0 ? (
          <p>No optional service available.</p>
        ) : (
          Object.keys(propertyRates).map((key) => (
            <div
              key={key}
              className=" p-6 rounded-md shadow-md text-left"
            >
              <span className="font-semibold  p-1">Rates Name:</span>{' '}
              {propertyRates[key]['ratesname']['#text'].value}<br />
              <span className="font-semibold p-1">Rates Value:</span>{' '}
              ${propertyRates[key]['ratesvalue']['#text'].value}
            </div>
          ))
        )}
      </div>
      <p className="mt-4 text-red-600 text-sm">
        Disclaimer: Please review the property rates carefully before proceeding.
      </p>
      <button type="submit"
      onClick={handleSubmit}
       className="bg-secondary hover:bg-secondary/80
        mt-5 w-full
         text-white text-sm px-6 py-4 rounded-full transition duration-300 font-poppins">
            Next
          </button>
    </div>
  </div>
  )
}

export default OptionalService
