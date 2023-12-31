import React,{useState} from 'react'
import MainForm from '../../components/Forms/MainForm'
import { useMyContext } from '../../context/MyContext'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import { useTranslation } from 'react-i18next';
const PropertyAvailable = () => {
    const {IsPropertyAvailable} = useMyContext()
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const navigate = useNavigate(); 
    const {t} = useTranslation()
    const fields = [
        { name: 'date1', label: 'Arrival Date', colSpan: 5, type:'date', required: true},
        { name: 'date2', label: 'Departure Date', colSpan: 5, type:'date', required: true },
      ];
      const handleSubmit = async (formData) => {
        setIsLoading(true);

        try {
          const res = await IsPropertyAvailable(formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setResult(res?.boolean['#text']?.value);
          if (res?.boolean['#text']?.value == 'true') {
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
    <>
      
      <Navbar background={true}
      forms={true}
      className="fixed top-0 w-full"
      />
  <div className="min-h-screen flex flex-col justify-between">
  <div className="pt-16 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
    {isLoading && (
      <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="loader border-t-4 border-secondary border-solid rounded-full h-12 w-12 animate-spin mb-4">
        {/* Loading spinner */}
      </div>
    </div>
    )}
    {!isLoading && (
      result === null ? (
        <MainForm fields={fields} onSubmit={handleSubmit} heading={'Property Availability Lookup'}
      t={t}
        link={"https://images.pexels.com/photos/3639542/pexels-photo-3639542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} />
      ) : (
        <div className="result-container text-center">
          {result === 'true' ? (
             <div className="result-not-available flex flex-col items-center justify-center h-screen">
            <p className="text-green-500 text-xl font-semibold font-poppins">{t("The property is available")}.</p>
            </div>
          ) : (
            <div className="result-not-available flex flex-col items-center justify-center h-screen">
            <p className="text-red-500 text-xl font-semibold font-poppins mb-2">
              {t("Sorry, the property is not available")}.
            </p>
            <div className="sad-face text-2xl">😞</div>
          </div>
          )}
        </div>
      )
    )}
    <div>
   
    </div>
  </div>
  <Footer className="fixed bottom-0 w-full" />
  </div>
  </>
  )
}

export default PropertyAvailable
