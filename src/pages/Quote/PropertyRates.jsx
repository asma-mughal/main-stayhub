import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
const PropertyRates = () => {
    const [propertyRates, setPropertyRates] = useState(null);
    const navigate = useNavigate(); 
    useEffect(() => {
      const storedDataJSON = localStorage.getItem('propertyRatesData');
      const storedData = JSON.parse(storedDataJSON);
      if (storedData) {
        setPropertyRates(storedData);
      }
    }, []);
    const handleSubmit = () =>{
      setTimeout(() => {
        navigate('/optional')
      }, 2000); 
    
    }
    return (
      <>
         <Navbar background={true}
      forms={true}
      className="fixed top-0 w-full"
      />
      <div className="flex flex-col justify-center font-poppins items-center h-screen">
      <div className="bg-white rounded-lg p-8 shadow-xl text-center">
        <h1 className="text-3xl font-semibold mb-4">Property Rates</h1>
        <div className="space-y-4">
          {propertyRates === null ? (
            <p>Loading property rates data...</p>
          ) : Object.keys(propertyRates).length === 0 ? (
            <p>No property rates data available.</p>
          ) : (
            Object.keys(propertyRates).map((key) => {
              const ratesName = propertyRates[key]['ratesname']?.['#text']?.value;
              const ratesValue = propertyRates[key]['ratesvalue']?.['#text']?.value;
    
              // Check if ratesName and ratesValue are valid before rendering
              if (ratesName && ratesValue) {
                return (
                  <div key={key} className="p-6 rounded-md shadow-md text-left">
                    <span className="font-semibold p-1">Rates Name:</span> {ratesName}<br />
                    <span className="font-semibold p-1">Rates Value:</span> ${ratesValue}
                  </div>
                );
              } else {
                return (
                  <div key={key} className="p-6 rounded-md shadow-md text-left">
                    <p>Data for this rate is incomplete or invalid.</p>
                  </div>
                );
              }
            })
          )}
        </div>
        <p className="mt-4 text-red-600 text-sm">
          Disclaimer: Please review the property rates carefully before proceeding.
        </p>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-secondary hover:bg-secondary/80 mt-5 w-full text-white text-sm px-6 py-4 rounded-full transition duration-300 font-poppins"
        >
          Next
        </button>
      </div>
    </div>
    
  <Footer className="fixed bottom-0 w-full" />
    </>
    );
  };

export default PropertyRates
