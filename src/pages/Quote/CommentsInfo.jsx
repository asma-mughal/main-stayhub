import React, {useState, useEffect} from 'react'
import MainForm from '../../components/Forms/MainForm'
import { useMyContext } from '../../context/MyContext'
import { useNavigate } from 'react-router-dom'
const CommentsInfo = () => {
  const {setCommentsInfo} = useMyContext()
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate(); 
  const fields = [
      { name: 'comments', label: 'Add your Comments', colSpan: 5, type:'textarea' ,  required: true},
    ];
    const handleSubmit = async (formData) => {
      setIsLoading(true);

      try {
        const storedDataJSON = localStorage.getItem('quoteInfo');
        const parseData = JSON.parse(storedDataJSON);
        const res = await setCommentsInfo(formData,parseData?.QuoteInfo?.Leaseid);
        console.log(res)
  if (res && res?.string) {
    const resultValue = res?.string['#text']?.value;
    if (resultValue !== undefined) {
      setResult(resultValue);
      if (resultValue === 'success') {
        setTimeout(() => {
          navigate('/payment');
        }, 2000);
      } else {
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } 
  } 
      } catch (error) {
        console.error(error);
      }
  
      setIsLoading(false);
    };
  return (  <div className="h-screen flex flex-col justify-center items-center">
  {isLoading && (
    <div className="loader border-t-4 border-secondary border-solid rounded-full h-12 w-12 animate-spin mb-4"></div>
  )}
  {!isLoading && (
    result === null ? (
      <MainForm fields={fields} onSubmit={handleSubmit} heading={'Property Availability Lookup'}
      link={"https://images.pexels.com/photos/2456351/pexels-photo-2456351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} />
    ) : (
      <div className="result-container text-center">
        {result === 'success' ? (
          <p className="text-green-500 text-xl font-semibold font-poppins">Thankyou!</p>
        ) : (
          <div className="result-not-available flex items-center">
              <p className="text-red-500 text-xl font-semibold font-poppins mr-2">Sorry, Something went wrong.</p>
              <div className="sad-face text-xl">😞</div>
            </div>
        )}
      </div>
    )
  )}
</div>
  )
}

export default CommentsInfo
