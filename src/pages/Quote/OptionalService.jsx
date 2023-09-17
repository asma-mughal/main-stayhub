import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../context/MyContext';
import MainForm from '../../components/Forms/MainForm';
const OptionalService = () => {
    const [propertyRates, setPropertyRates] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fields = [
      { name: 'arrivalDate', label: 'Arrival Date', colSpan: 5, type:'date' },
      { name: 'deptDate', label: 'Departure Date', colSpan: 5, type:'date' },
      { name: 'numAdult', label: 'Number of Adult', colSpan: 5 , type:'number'},
      { name: 'numPet', label: 'Number of Pet', colSpan: 5 , type:'number'},
      { name: 'numBaby', label: 'Number of Baby', colSpan: 5, type:'number' },
      { name: 'numChild', label: 'Number of  Child', colSpan: 5, type:'number' }
    ];
    const navigate = useNavigate(); 
    const { GetOptionalServiceIDs,convertXmlToJson} = useMyContext();
    const [optionalServices, setOptionalServices] = useState();
    useEffect(() => {
      const storedDataJSON = localStorage.getItem('quoteInfo');
    const storedData = JSON.parse(storedDataJSON);
      const fetchData = async () => {
        try {
          const optionalServiceData = await GetOptionalServiceIDs(storedData?.QuoteInfo);
          const data = convertXmlToJson(optionalServiceData?.string?.['#text']?.value)
          setOptionalServices(data?.OptionalServices)
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    }, []); 
    const handleSubmit = () =>{
      setTimeout(() => {
        navigate('/optional')
      }, 1000); 
    
    }
  return (
    <div className="flex flex-col justify-center font-poppins items-center h-screen ">
  <div className="bg-white rounded-lg p-8 shadow-xl text-center">
    <h1 className="text-3xl font-semibold mb-4">Optional Services</h1>
    <div className="space-y-4">
      {optionalServices && typeof optionalServices === 'object' && Object.keys(optionalServices).length === 0 ? (
        <p>No optional services available.</p>
      ) : optionalServices ? (
        Object.values(optionalServices).map(service => (
          <div key={service.ratesID} className="p-6 rounded-md shadow-md text-left">
            <span className="font-semibold p-1">Rates ID:</span> {service.ratesID}<br />
            <span className="font-semibold p-1">Rates Name:</span> {service.ratesName}
          </div>
        ))
      ) : (
        <p className='font-poppins'>Loading optional services...</p>
      )}
    </div>

    <button
      type="submit"
      onClick={handleSubmit}
      className="bg-secondary hover:bg-secondary/80 mt-5 w-full text-white text-sm px-6 py-4 rounded-full transition duration-300 font-poppins">
      Next
    </button>
  </div>
</div>


  
  
  
  
  )
}

export default OptionalService
