import React from 'react'
import Hero from '../../components/Hero';
import Footer from '../../components/Footer/Footer';
import styles from '../../style';
import SinglePage from './SinglePage';
const Success = () => {
  return (
    <div className="w-full overflow-hidden">
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero
        heading={true}
        title={'   '}
        name="/mainSuccess.jpg"
        height={"h-[500px]"}
        />
      </div>
    </div>
    <div className={`bg-primary ${styles.paddingX} ${styles.marginY}  ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
       <SinglePage />
        </div>
        </div>
        <Footer 
 news={false}
  />
  </div>
  )
}

export default Success
