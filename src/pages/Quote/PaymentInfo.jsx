import React, {useState, useEffect} from 'react'
import { useMyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
import MainForm from '../../components/Forms/MainForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import { useTranslation } from 'react-i18next';
const PaymentInfo = () => {
    const {convertXmlToJson, saveProperty,propertyMessage} = useMyContext()
    const [isLoading, setIsLoading] = useState(false);
    const [isStored, setIsStored] = useState(false); 
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [paymentError, setPaymentError] = useState(false); //
    const navigate = useNavigate(); 
    const {t} = useTranslation()
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
    const storedDataProperty = JSON.parse(localStorage.getItem('propertyRatesData'));
    let ratesValue = storedDataProperty.propertyratesdetails.ratesvalue['#text'].value;
    const arrivalDate = localStorage.getItem('arrivalDate');
    const currentDate = new Date();
    const differenceInDays = Math.floor((new Date(arrivalDate) - currentDate) / (1000 * 60 * 60 * 24));
    if (differenceInDays > 14) {
      ratesValue /= 2;
    }
    
    const fields = [
      { name: 'strPayment', label: 'Amount(Initial amount)', colSpan: 5, type: 'number', required: true ,
      defaultValue: ratesValue, },
      { name: 'ezicAccount', label: 'Ezic Account (leave empty if you do not use it)', colSpan: 5, type: 'text' },
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
        
        //const folioData = convertXmlToJson(propertyMessage?.string['#text']?.value)
        //console.log(folioData)
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
        console.error('Error:', error);
      }
    };
   
    useEffect(() => {
      if (propertyMessage) {
        const data = convertXmlToJson(propertyMessage?.string['#text']?.value);
        if (data?.html?.body?.parsererror) {
          setPaymentError(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
        setIsPaymentDone(true)
        setTimeout(() => {
          navigate('/');
        }, 2000);
        }
      }
    }, [propertyMessage, navigate]);
    //  useEffect(() => {
    //     const url = 'https://portals.barefoot.com/barefootwebservice/BarefootService.asmx/PropertyBooking?username=bsc20230607&password=%2320230607vhgfbefe%23375378&barefootAccount=v3cbsc0526&portalid=1&Info=true&Info=12&Info=12&Info=6809&Info=12-01-2023&Info=12-29-2023&Info=6652&Info=195&Info=12&Info=12&Info=12&Info=ab&Info=9589454&Info=C&Info=44747&Info=12&Info=12&Info=12&Info=HOTEL&Info=12&Info=12&Info=12&Info=12&Info=12&Info=12&Info=zip&Info=zip&Info=zip';
    //     fetch(url)
    //       .then(response => {
    //         if (!response.ok) {
    //           throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    //         }
    //         return response.text();
    //       })
    //       .then(data => {
    //         console.log(data);
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //   }, []);
  return (
    <>
      <Navbar background={true}
      forms={true}
      className="fixed top-0 w-full"
      />
    <div className="min-h-screen flex flex-col justify-between">
  <div className="pt-16 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
    <div className="flex flex-col items-center h-full">
      <div className="mb-4">
        {isLoading ? (
          <div className="h-screen flex flex-col justify-center items-center">
            <div className="loader border-t-4 border-secondary border-solid rounded-full h-12 w-12 animate-spin"></div>
          </div>
        ) : isPaymentDone ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-green-600 font-semibold text-xl mb-4 font-poppins">
           <p className='text-center'>{t("Congratulations, your payment is done")}!</p>
            </div>
          </div>
        ) : paymentError ? ( 
          <div className="flex flex-col items-center h-full">
            <div className="text-red-600 font-semibold text-xl mb-4">
              {t("Sorry, something went wrong")}.
            </div>
          </div>
        ) : (
          <MainForm fields={fields} onSubmit={handleSubmit} heading={'Payment Details'}
          ratesValue={ratesValue}
          t={t}
          link={"https://images.pexels.com/photos/4386417/pexels-photo-4386417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
        )}
      </div>
    </div>
  </div>
  <Footer className="fixed bottom-0 w-full" />
  </div>
  </>
  )
}

export default PaymentInfo
