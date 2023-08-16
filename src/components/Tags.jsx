import React from 'react'
import styles from '../style';
const Tags = () => {
  return (
    <div className="flex  justify-center pt-3 sm:mt-0">
              <div className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-2">
              <div className="flex items-center my-2 rounded-full ">
        <p className={`${styles.paragraph2} items-center text-white`}>Popular Tags: </p>
        </div>
                <div className="flex items-center my-2 bg-secondary/70 rounded-full p-2">

                  <span className=" text-white text-xs">Staycation</span>
                </div>

                <div className="flex items-center my-2  bg-secondary/70 rounded-full p-2">
                  <span className="text-white text-xs">Hotel Deals</span>
                </div>

                <div className="flex items-center my-2  bg-secondary/70 rounded-full p-2">
                  <span className=" text-white text-xs">Best Rates</span>
                </div>
              </div>
              </div>
  )
}

export default Tags
