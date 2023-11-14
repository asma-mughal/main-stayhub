import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderMem from './SliderMem'
import { useTranslation } from 'react-i18next';
const MemStay = () => {
  const { t } = useTranslation();
  return (
    <section id="features" className={"my-5"}>
    <div className="flex flex-col md:flex-row font-poppins">
    <div className="md:w-1/2 p-4">
    <h1 className={`text-[24px] font-poppins font-bold text-heading leading-[30.8px]`}>{t("Memorable Stay")}</h1>
    <p className={`text-xs my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl
    text-justify text-gray-500
    `}>{t("We strive to enrich your stay and provide an unforgettable retreat")}.</p>  
    </div>
   
  </div>
  <SliderMem t={t} />
  </section>
  )
}

export default MemStay
