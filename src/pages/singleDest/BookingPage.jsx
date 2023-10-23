import React, {useState, useEffect} from 'react'
import MainForm from '../../components/Forms/MainForm';
import { useMyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
function parseXmlData(xmlData) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    const propertyRatesData = {};
    const propertyRatesElements = xmlDoc.querySelectorAll('propertyRates propertyratesdetails');
    propertyRatesElements.forEach((detail, index) => {
      const ratesname = detail.querySelector('ratesname').textContent;
      const ratesvalue = parseFloat(detail.querySelector('ratesvalue').textContent);
      const ratesid = parseInt(detail.querySelector('ratesid').textContent);
      propertyRatesData[`propertyRate${index + 1}`] = { ratesname, ratesvalue, ratesid };
    });
    const quoteInfoElement = xmlDoc.querySelector('QuoteInfo');
    const quoteInfoData = {};
    if (quoteInfoElement) {
      const quoteInfoFields = Array.from(quoteInfoElement.children);
      quoteInfoFields.forEach(field => {
        quoteInfoData[field.tagName] = field.textContent;
      });
    }

    // Combine the extracted data
    const extractedData = {
      propertyRates: propertyRatesData,
      QuoteInfo: quoteInfoData,
    };

    return extractedData;
  } catch (error) {
    console.error('Error parsing XML data:', error);
    return null; // Return null to indicate an error occurred
  }
}
const BookingPage = () => {
    const {GetQuoteRatesDetail,convertXmlToJson, xmlToJson} = useMyContext()
      const [isLoading, setIsLoading] = useState(false);
      const [componentLoaded, setComponentLoaded] = useState(true);
      const [errorMessage, setErrorMessage] = useState('');
      const navigate = useNavigate(); 
    const fields = [
        { name: 'arrivalDate', label: 'Arrival Date', colSpan: 5, type:'date', required: true },
        { name: 'deptDate', label: 'Departure Date', colSpan: 5, type:'date', required: true },
        { name: 'numAdult', label: 'Number of Adult', colSpan: 5 , type:'number', required: true},
        { name: 'numPet', label: 'Number of Pet', colSpan: 5 , type:'number', required: true},
        { name: 'numBaby', label: 'Number of Baby', colSpan: 5, type:'number', required: true },
        { name: 'numChild', label: 'Number of  Child', colSpan: 5, type:'number', required: true }
      ];
      const handleSubmit = async (formData) => {
        try {
          setIsLoading(true);
          const res = await GetQuoteRatesDetail(formData);
          const data = convertXmlToJson(res?.string['#text']?.value);
          console.log(data)
          if(data?.html?.body?.parsererror)
          {
            setErrorMessage('Please choose another date');
            setComponentLoaded(false)
          }
          else {
            const dataJSON = JSON.stringify(data);
            const rawData = res?.string['#text']?.value;
            const xmlDataWithRoot = `<root>${rawData}</root>`;
            const result = parseXmlData(xmlDataWithRoot);
            const resultJson = JSON.stringify(result);
            localStorage.setItem('quoteInfo', resultJson);
            localStorage.setItem('propertyRatesData', dataJSON);
            navigate('/rates'); 
          }
        } catch (error) {
          console.log(error)
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
          setTimeout(()=>{
           setComponentLoaded(true)
           setErrorMessage('')
          },2000)
        }
      };

  return (
    <>
     <Navbar background={true}
      forms={true}
      className="fixed top-0 w-full"
      />
  <div className="min-h-screen flex flex-col justify-between">
  <div className="pt-16 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
      {errorMessage && (
        <div className="text-red-500 mb-4 font-bold font-poppins">{errorMessage}</div>
      )}
      {componentLoaded && (
        <div>
          {isLoading ? (
         <div className="min-h-screen flex flex-col justify-center items-center">
         <div className="loader border-t-4 border-secondary border-solid rounded-full h-12 w-12 animate-spin mb-4">
           {/* Loading spinner */}
         </div>
       </div>
          ) : (
            <MainForm fields={fields} onSubmit={handleSubmit} heading={'Property Details'}
            link={"https://images.pexels.com/photos/6186812/pexels-photo-6186812.jpeg?auto=compress&cs=tinysrgb&w=600"} />
          )}
        </div>
      )}
    </div>
    </div>
    <Footer className="fixed bottom-0 w-full" />
    </>
  )
}

export default BookingPage
