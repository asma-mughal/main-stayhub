import React, {useState, useEffect} from 'react'
import Footer from '../../components/Footer/Footer';
import Contact from '../../components/Contact';
import styles from '../../style';
import Navbar from '../../components/Navbar';
import DestPage from './DestPage';
import { useMyContext } from '../../context/MyContext';
import { useTranslation } from 'react-i18next';
const SingleDest = () => {
  const { fetchOneProperty,singleProError,getAvailablityByDate} = useMyContext()
  const [error, setError] = useState()
  const [oneProperty, setOneProperty] = useState({});
  useEffect(() => {
    fetchOneProperty()
      .then(data => {
        setOneProperty(data?.Root?.Properties?.ProperTy)
      })
      .catch(error => {
        console.error('Error fetching property data:', error);
      });
  }, []);
  useEffect(() => {
    getAvailablityByDate(oneProperty?.Basicinfo?.CheckInTime, oneProperty?.Basicinfo?.CheckOutTime)
      .then(data => {
      })
      .catch(error => {
        console.error('Error fetching property data:', error);
      });
  }, []);
  console.log(oneProperty)
  const {t} = useTranslation()
  return (
    <div className="w-full overflow-hidden">
    

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar 
        background={true}
        />
      </div>
    </div>
    <div className={`bg-primary ${styles.paddingX} ${styles.marginY}  ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      {singleProError ? <div className="result-not-available flex flex-col items-center justify-center h-screen">
            <p className="text-red-500 text-xl font-semibold font-poppins mb-2">
              {t("Something Went Wrong")}.
            </p></div> :<DestPage
       oneProperty={oneProperty}
       t={t}
       /> } 
        <Contact />
        </div>
        </div>
        <Footer 
 news={false}
  />
  </div>
  )
}

export default SingleDest
