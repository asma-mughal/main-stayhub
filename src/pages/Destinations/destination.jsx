import React from 'react'
import styles from '../../style'
import Hero from '../../components/Hero'
import SinglePage from './SinglePage';
import Footer from '../../components/Footer/Footer';
import Contact from '../../components/Contact';
const DestinationPage = () => {
  return (
    <div className="w-full overflow-hidden">
    

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero
        heading={true}
        title={'Explore Destinations'}
        name="/mainDest.png"
        height={"h-[500px]"}
        />
      </div>
    </div>
    <div className={`bg-primary ${styles.paddingX} ${styles.marginY}  ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <SinglePage />
        <Contact />
        </div>
        </div>
        <Footer 
 news={false}
  />
  </div>

  )
}

export default DestinationPage
