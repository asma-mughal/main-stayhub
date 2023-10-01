import React, {useState, useEffect} from 'react'
import { useMyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
import MainForm from '../../components/Forms/MainForm';
const PaymentInfo = () => {
    const {convertXmlToJson, saveProperty,propertyMessage} = useMyContext()
    const [isLoading, setIsLoading] = useState(false);
    const [isStored, setIsStored] = useState(false); 
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const navigate = useNavigate(); 
    const stateOptions = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming'
    ]
    const countryOptions =[
      'United States',
      'Canada',
      'United Kingdom',
      'Australia',
      'India',
      'Germany',
      'France',
      'Japan',
      'China',
      'Brazil',
      'Mexico',
      'South Korea',
      'Spain',
      'Italy',
      'Netherlands',
      'Sweden',
      'Norway',
      'Denmark',
      'Russia',
      'South Africa'
    ]
    const cityOptions = [
      'New York',
      'Los Angeles',
      'London',
      'Paris',
      'Sydney',
      'Tokyo',
      'Toronto',
      'Chicago',
      'Mumbai',
      'Miami',
      'Berlin',
      'Hong Kong',
      'Rome',
      'San Francisco',
      'Seoul',
      'Vancouver',
      'Madrid',
      'Melbourne',
      'Dubai',
      'Singapore',
      'Shanghai',
      'Amsterdam',
      'Boston',
      'Barcelona',
      'Vienna',
      'Stockholm',
      'Prague',
      'Buenos Aires',
      'Cape Town',
    ];
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
      { name: 'state', label: 'State', colSpan: 5, type:'select', options: stateOptions, required: true},
      { name: 'city', label: 'City', colSpan: 5, type:'select', options: cityOptions, required: true},
      { name: 'zip', label: 'Zip code', colSpan: 5, type: 'text', required: true },
      { name: 'country', label: 'Country', colSpan: 5, type:'select', options: countryOptions, required: true },
    ];
    const handleSubmit = async (formData) => {
      try {
        setIsLoading(true);
        const data = await saveProperty(formData);
        console.log(data)
        setTimeout(() => {
          setIsLoading(false);
          setIsPaymentDone(true); // Mark the payment as done
        }, 2000);
      } catch (error) {
        console.log(error);
        console.error('Error:', error);
      }
    };
    useEffect(() => {
      if (isPaymentDone) {
        setTimeout(() => {
          navigate('/'); // Navigate to the main page after a delay
        }, 2000);
      }
    }, [isPaymentDone, navigate]);
    console.log(propertyMessage)
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center h-full">
        <div className="mb-4">
          {isLoading ? (
            <div className="h-screen flex flex-col justify-center items-center">
              <div className="loader border-t-4 border-secondary border-solid rounded-full h-12 w-12 animate-spin"></div>
            </div>
          ) : isPaymentDone ? (
            <div className="flex flex-col items-center h-full">
            <div className="text-green-600 font-semibold text-xl mb-4">
              Congratulations, your payment is done!
            </div>
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
