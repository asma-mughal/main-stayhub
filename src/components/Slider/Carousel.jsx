import React,{ useState, useEffect } from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousel = ({ PropertyImage }) => {
  const settings = {
    dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
  };
  return (
    <div id="projects" name="projects">
    <Slider {...settings} style={{ backgroundColor: 'white', width: '100%' }}>
      {PropertyImage?.map((image, index) => (
        <div key={index} className="w-full">
          <div className=" h-screen/1"> 
            <div
              className="aspect-w-4 aspect-h-2 lg:aspect-w-3 lg:aspect-h-1 h-full"
            >
              <img
                className="object-cover object-center w-full h-full"
                src={image.ImageUrl['#text'].value}
                alt={`Image ${index}`}
              />
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
  

  
  
  
  
  
  )
}

export default Carousel
/*

*/