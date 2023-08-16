import React from 'react'
import { cardImage } from '../assets';
import styles from '../style';
const CardHero = () => {
  return (
    <div className="card-container">
    <div id="app" class="bg-white w-128 h-60 rounded shadow-md flex card text-grey-darkest">
            <img class="w-1/2 h-full rounded-l-sm" src={cardImage} alt="Room Image" />
            <div class="w-full flex flex-col text-black">
                <div class="p-4 pb-0 flex-1">
                <div class="flex items-center justify-center w-24 h-8 bg-gray-100 rounded-full">
  <span class="text-center text-gray-800 text-xs font-bold">FEATURED</span>
</div>
                    <div class="text-xs flex items-center mt-3">
                      
                      <p className={`${styles.paragraph}  text-heading`}>Affordable Hotel Deals</p>
                    </div>
                    <div>
                      <p  className={`text-xs xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl`}>You'll find valuable insights and strategies 
                        to make the most of your budget while booking hotels.</p>
                    </div>
                                    </div>
                
            </div>
        </div>



    </div>
  )
}

export default CardHero
