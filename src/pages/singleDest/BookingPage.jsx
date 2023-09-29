import React, {useState} from 'react'
import MainForm from '../../components/Forms/MainForm';
import { useMyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
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
          const data = convertXmlToJson(res?.string['#text']?.value);
          const dataJSON = JSON.stringify(data);
          localStorage.setItem('propertyRatesData', dataJSON);
          const rawData = res?.string['#text']?.value;
          const xmlDataWithRoot = `<root>${rawData}</root>`;
          const result = parseXmlData(xmlDataWithRoot);
          const resultJson = JSON.stringify(result);
          localStorage.setItem('quoteInfo', resultJson);
          setTimeout(()=>{
         
          },2000)
        } catch (error) {
          console.log(error)
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
          navigate("/rates")
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
