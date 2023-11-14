import React from 'react'
import CardDest from '../Destinations/CardDest'
import { layout } from '../../style'
import { arrow } from '../../assets'
import { modern } from '../../constants'
import { Link } from 'react-router-dom'
import CardModern from './CardModern'
import { useTranslation } from 'react-i18next';
const Modern = () => {
  const { t } = useTranslation();
  return (
    <section id="features" className={"my-5"}>
    <div className="flex flex-col md:flex-row font-poppins">
    <div className="md:w-1/2 p-4">
    <h1 className={`text-[24px] font-poppins font-bold text-heading leading-[30.8px]`}>{t("Embrace Modern Elegance")}</h1>
    <p className={`text-xs my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl
    text-justify text-gray-500
    `}>{t("Discover a haven of design-centric retreats that combine exquisite aesthetics")}.
  {" "}{t("an array of top-notch amenities")}.</p>  
    </div>
    <div className="md:w-1/2 p-4 flex lg:justify-end xl:justify-end items-center
    sm:justify-start
    md:justify-start
    ">
      <Link to="/modern">
    <button className="flex items-center p-2 border  bg-transparent
     rounded  border-secondary">
    <span className="mr-2 text-xs">{t("View All")}</span>
      <img src={arrow} alt="Icon" className="w-3 h-3" />
      </button>
      </Link>
    </div>
   
  </div>
  <CardModern data={modern}
  start={0}
  end={3}
  link={false}
  t={t}
  />
  </section>
  )
}

export default Modern
