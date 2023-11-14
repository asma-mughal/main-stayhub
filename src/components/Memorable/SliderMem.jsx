import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from '../../style';
import { cardImage } from '../../assets';
import { memorableStay } from '../../constants';
const SliderMem = ({t}) => {
 
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

      };
  return (
    <div>
    <Slider {...settings}>
      {memorableStay.map((i)=>{
        return (
          <div className="card-container font-poppins px-4">
          <div id="app" class="bg-white w-128 h-60 rounded shadow-md flex card text-grey-darkest">
                  <img class="w-1/2 h-full rounded-l-sm" src={i.icon} alt="Room Image" />
                  <div class="w-full flex flex-col text-black">
                      <div class="p-4 pb-0 flex-1">
                      <div class="flex items-center justify-center w-24 h-8
                       bg-secondary/60 rounded-full">
        <span class="text-center text-black text-xs font-bold">{t(i?.tag)}</span>
      </div>
                          <div class="text-xs flex items-center mt-3">
                            
                            <p className={`font-poppins font-bold text-[12px]
                            lg:text-[18px]
                            xl:text-[18px]
                             leading-[30.8px]
                             text-heading`}>
                             {t(i?.title)}.</p>
                          </div>
                          <div>
                            <p  className={`text-xs xs:text-xs 
                            sm:text-base md:text-sm lg:text-base
                             xl:text-xl`}>{t(i?.description)}</p>
                          </div>
                                          </div>
                      
                  </div>
              </div>
      
      
      
          </div>
        )
      })}
   
    </Slider>
  </div>
  )
}

export default SliderMem
