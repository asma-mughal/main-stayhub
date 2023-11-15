import React from 'react'
import CardDest from '../../components/Destinations/CardDest'
import { modern, modernDetail } from '../../constants'
import { food } from '../../assets'

import { useTranslation } from 'react-i18next'
const SinglePage = () => {
  const {t} = useTranslation()
  return (
    <section id="features" >
    <div className="font-poppins">
    <div className="">
    <h1 className={`text-[24px] font-poppins font-bold text-heading 
    text-start leading-[30.8px]`}>{t("Welcome to our exceptional collection of private vacation homes nestled in the High Desert. Immerse yourself in a world of unparalleled luxury, tranquility, and captivating design")}.</h1>
    
    </div>
    <div className="md:w-1/2 p-4 flex lg:justify-end xl:justify-end items-center
    sm:justify-start
    md:justify-start
    ">
    
    </div>
   
  </div>
  {modernDetail.map((i)=>{
    return (
      <div class="container mx-auto font-poppins mb-10 "
      key={i.id}
      >
      <div class="flex flex-wrap items-start justify-between">
        <div class="w-full lg:w-1/5">
          <div class="mr-0 lg:mr-8">
            <h1 class=" font-semibold text-heading mb-2">{t(i?.title)}</h1>
            <p class="text-gray-500 mb-5">{t(i?.description)}</p>
          </div>
        </div>
        <div class="w-full lg:w-4/5">
          <div class="flex justify-between">
            {i?.icon.map((j)=>{
              return (
                <div class="w-1/3 px-2">
                <img class="w-full h-auto" src={j} alt="Image 1" />
              </div>
              )
            })}
           
           
          </div>
        </div>
      </div>
    </div>
    )
  })}
 



  </section>
  )
}

export default SinglePage
