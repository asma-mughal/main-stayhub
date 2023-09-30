import React, {useState, useEffect} from 'react'
import { useMyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
import MainForm from '../../components/Forms/MainForm';
const PaymentInfo = () => {
    const {convertXmlToJson, xmlToJson, saveProperty} = useMyContext()
    const [isLoading, setIsLoading] = useState(false);
    const [isStored, setIsStored] = useState(false); // 
    const navigate = useNavigate(); 
    const fields = [
      { name: 'strPayment', label: 'Amount(Initial amount)', colSpan: 5, type: 'number', required: true },
      { name: 'ezicAccount', label: 'Ezic Account (leave empty if you don\'t use it)', colSpan: 5, type: 'text' },
      { name: 'strADate', label: 'Arrival Date', colSpan: 5, type: 'date', required: true },
      { name: 'strEnd', label: 'Departure Date', colSpan: 5, type: 'date', required: true },
      { name: 'cFName', label: 'First Name', colSpan: 5, type: 'text', required: true },
      { name: 'cLName', label: 'Last Name', colSpan: 5, type: 'text', required: true },
      { name: 'ezicTag', label: 'Ezic Tag', colSpan: 5, type: 'text' },
      { name: 'creditCard', label: 'Credit Card Number', colSpan: 5, type: 'number', required: true },
      { name: 'expireDate', label: 'CC Expire Date', colSpan: 5, type: 'date', required: true },
      { name: 'cvv', label: 'CC Security Number', colSpan: 5, type: 'number', required: true },
      { name: 'ccType', label: 'CC Type', colSpan: 5, type: 'text', required: true },
      { name: 'street', label: 'Street', colSpan: 5, type: 'text', required: true },
      { name: 'state', label: 'State', colSpan: 5, type: 'text', required: true },
      { name: 'city', label: 'City', colSpan: 5, type: 'text', required: true },
      { name: 'zip', label: 'Zip code', colSpan: 5, type: 'text', required: true },
      { name: 'country', label: 'Country', colSpan: 5, type: 'text', required: true },
    ];
        const handleSubmit = async (formData) => {
        try {
          setIsLoading(true);
          const data = await saveProperty(formData)
          console.log(data)
          setTimeout(() => {
            setIsLoading(false);
            //navigate('/comments'); // Navigate to the comments page after a delay
          }, 2000);
        } catch (error) {
          console.log(error)
          console.error('Error:', error);
        } 
      };
    
  return (
    <div className="h-full flex flex-col justify-center items-center">
  <div className="flex flex-col items-center h-full">
    <div className="mb-4">
      {isLoading ? (
          <div className="h-screen flex flex-col justify-center items-center">
        <div className="loader border-t-4 border-secondary border-solid rounded-full h-12 w-12 animate-spin"></div>
        </div>
      ) : (
        
        <MainForm fields={fields} onSubmit={handleSubmit} heading={'Payment Details'} />
      )}
    </div>
  </div>
</div>
  )
}

export default PaymentInfo
