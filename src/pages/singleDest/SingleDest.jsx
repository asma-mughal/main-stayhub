import React, {useState, useEffect} from 'react'
import Footer from '../../components/Footer/Footer';
import Contact from '../../components/Contact';
import styles from '../../style';
import Navbar from '../../components/Navbar';
import DestPage from './DestPage';
import { useMyContext } from '../../context/MyContext';
const SingleDest = () => {
  const { fetchOneProperty,convertXmlToJson,getAvailablityByDate} = useMyContext()
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
    
    getAvailablityByDate()
      .then(data => {
       console.log(data)
      })
      .catch(error => {
        console.error('Error fetching property data:', error);
      });
  }, []);
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
       <DestPage
       oneProperty={oneProperty}
       />
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
