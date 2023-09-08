import React, {useState, useEffect} from 'react'

const PropertyRates = () => {
    const [propertyRates, setPropertyRates] = useState(null);
  
    useEffect(() => {
      const storedDataJSON = localStorage.getItem('propertyRatesData');
      const storedData = JSON.parse(storedDataJSON);
      if (storedData) {
        setPropertyRates(storedData);
      }
    }, []);
  console.log(propertyRates)
    return (
        <div className="flex justify-center items-center h-screen font-poppins">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Property Rates</h1>
          {propertyRates === null ? (
            <p>Loading property rates data...</p>
          ) : (
            <div>
              {Object.keys(propertyRates).length === 0 ? (
                <p>No property rates data available.</p>
              ) : (
                <ul className="list-disc list-inside">
                  {Object.keys(propertyRates).map((key) => (
                    <li key={key} className="mb-2">
                      <span className="font-semibold">Value:</span>{' '}
                      {propertyRates[key]['ratesname']['#text'].value},{' '}
                      <span className="font-semibold">Value:</span>{' '}
                      {propertyRates[key]['ratesvalue']['#text'].value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

export default PropertyRates
