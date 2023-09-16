import React,{useState} from 'react'
import MainForm from '../../components/Forms/MainForm'
import { useMyContext } from '../../context/MyContext'
import { useNavigate } from 'react-router-dom';
const PropertyAvailable = () => {
    const {IsPropertyAvailable} = useMyContext()
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const navigate = useNavigate(); 
    const fields = [
        { name: 'date1', label: 'Arrival Date', colSpan: 5, type:'date' },
        { name: 'date2', label: 'Departure Date', colSpan: 5, type:'date' },
      ];
      const handleSubmit = async (formData) => {
        setIsLoading(true);

        try {
          const res = await IsPropertyAvailable(formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setResult(res?.boolean['#text']?.value);

          if (res?.boolean['#text']?.value === 'true') {
            setTimeout(() => {
              navigate('/getQuote');
            }, 2000); 
          } else {
            setTimeout(() => {
              navigate('/'); 
            }, 2000);
          }
        } catch (error) {
          console.error(error);
        }
    
        setIsLoading(false);
      };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
    {isLoading && (
      <div className="loader border-t-4 border-secondary border-solid rounded-full h-12 w-12 animate-spin mb-4"></div>
    )}
    {!isLoading && (
      result === null ? (
        <MainForm fields={fields} onSubmit={handleSubmit} heading={'Property Availability Lookup'} />
      ) : (
        <div className="result-container text-center">
          {result === 'true' ? (
            <p className="text-green-500 text-xl font-semibold font-poppins">The property is available.</p>
          ) : (
            <div className="result-not-available flex items-center">
                <p className="text-red-500 text-xl font-semibold font-poppins mr-2">Sorry, the property is not available.</p>
                <div className="sad-face text-xl">😞</div>
              </div>
          )}
        </div>
      )
    )}
  </div>
  )
}

export default PropertyAvailable
