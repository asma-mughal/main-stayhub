import React, {useState} from 'react'
import { useMyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
import MainForm from '../../components/Forms/MainForm';
const ConsumerInfo = () => {
    const {convertXmlToJson, xmlToJson, setCosumerInfo} = useMyContext()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 
    const fields = [
        { name: 'street1', label: 'Street # 01', colSpan: 5, type:'text' },
        { name: 'street2', label: 'Street # 02', colSpan: 5, type:'text' },
        { name: 'city', label: 'City', colSpan: 5 , type:'text'},
        { name: 'state', label: 'State', colSpan: 5 , type:'text'},
        { name: 'zip', label: 'Zip Code', colSpan: 5, type:'number' },
        { name: 'lastname', label: 'Last Name', colSpan: 5, type:'text' },
        { name: 'firstname', label: 'First Name', colSpan: 5, type:'text' },
        { name: 'homephone', label: 'Home Phone', colSpan: 5, type:'number' },
        { name: 'bizphone', label: 'Other Phone', colSpan: 5, type:'number' },
        { name: 'fax', label: 'Fax', colSpan: 5, type:'number' },
        { name: 'mobile', label: 'Mobile Number', colSpan: 5, type:'number' },
        { name: 'email', label: 'Email', colSpan: 5, type:'email' },
        { name: 'strADate', label: 'Arrival Date', colSpan: 5, type:'text' },
        { name: 'SourceOfBusiness', label: 'Source of Busniess', colSpan: 5, type:'text' }
      ];
      const handleSubmit = async (formData) => {
        console.log(formData)
        try {
          setIsLoading(true);
          const res = await setCosumerInfo(formData);
          console.log(res)
          const data = convertXmlToJson(res?.string['#text']?.value);
          const dataJSON = JSON.stringify(data);
          localStorage.setItem('propertyRatesData', dataJSON);
          const rawData = res?.string['#text']?.value;
          const xmlDataWithRoot = `<root>${rawData}</root>`;
        //   const result = parseXmlData(xmlDataWithRoot);
        //   const resultJson = JSON.stringify(result);
        //   localStorage.setItem('quoteInfo', resultJson);
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
    <div className="h-full flex flex-col justify-center items-center">
    <div>
      {isLoading ? (
     <div className="loader border-t-4 border-secondary border-solid rounded-full h-12 w-12 animate-spin mb-4">

     </div>
      ) : (
        <MainForm fields={fields} onSubmit={handleSubmit} heading={'Consumer Details'} />
      )}
    </div>
    </div>
  )
}

export default ConsumerInfo
