import React, {useState} from 'react'
import MainForm from '../../components/Forms/MainForm';
import { useMyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
const BookingPage = () => {
    const {GetQuoteRatesDetail,convertXmlToJson} = useMyContext()
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate(); 
    const fields = [
        { name: 'arrivalDate', label: 'Arrival Date', colSpan: 5, type:'date' },
        { name: 'deptDate', label: 'Departure Date', colSpan: 5, type:'date' },
        { name: 'numAdult', label: 'Number of Adult', colSpan: 5 , type:'number'},
        { name: 'numPet', label: 'Number of Pet', colSpan: 5 , type:'number'},
        { name: 'numBaby', label: 'Number of Baby', colSpan: 5, type:'number' },
        { name: 'numChild', label: 'Number of  Child', colSpan: 5, type:'number' }
      ];
      const handleSubmit = async (formData) => {
        try {
          setIsLoading(true);
          const res = await GetQuoteRatesDetail(formData);
          console.log(res)
          const data = convertXmlToJson(res?.string['#text']?.value);
          console.log(data)
          const dataJSON = JSON.stringify(data);
          // localStorage.setItem('propertyRatesData', dataJSON);
          setTimeout(()=>{
         
          },2000)
        } catch (error) {
          console.log(error)
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
          //navigate("/rates")
        }
      };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
    <div>
      {isLoading ? (
     <div className="loader border-t-4 border-secondary border-solid rounded-full h-12 w-12 animate-spin mb-4">

     </div>
      ) : (
        <MainForm fields={fields} onSubmit={handleSubmit} heading={'Property Details'} />
      )}
    </div>
    </div>
  )
}

export default BookingPage
