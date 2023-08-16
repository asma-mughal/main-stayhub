import React,{useEffect, useState} from 'react'
import { bathroom, bedroom, comfort2, gallery4, guest, home, location } from '../../assets'
import { destinatons } from '../../constants'
import { Link } from 'react-router-dom'
import { useMyContext } from '../../context/MyContext';
import {xml2js} from 'xml-js';
const CardDest = ({data, start, end,link}) => {
  const { fetchImages, parseImages} = useMyContext();
  const [result,setResult] = useState([])
  useEffect(() => {
    fetchImages()
      .then(data => {
      console.log(data)
      // const propertyImages = data.DataSet["xs:schema"]["xs:element"]["xs:complexType"]["xs:choice"]["xs:element"]["xs:complexType"]["xs:sequence"]["xs:element"];

      // const extractedImages = propertyImages.map(image => {
      //   return {
      //     propertyId: image["attributes"]["name"] === "propertyId" ? image["attributes"]["type"] : "",
      //     imageNo: image["attributes"]["name"] === "imageNo" ? image["attributes"]["type"] : "",
      //     imagepath: image["attributes"]["name"] === "imagepath" ? image["attributes"]["type"] : "",
      //     imageDesc: image["attributes"]["name"] === "imageDesc" ? image["attributes"]["type"] : "",
      //   };
      // });
      
      // console.log(extractedImages);
      })
      .catch(error => {
        console.error('Error fetching property data:', error);
      });
  }, []);
  return (
    <div className="px-3 font-poppins">
    <div className="flex flex-wrap -mx-2"> {/* Adjust mx-2 for spacing */}
      {data?.PropertyList?.Property?.slice(start, end).map((item, index) => (
        <div
          className="my-2 px-2 w-full md:w-1/2 lg:my-4 lg:w-1/3"
          key={index}
        >
          <article className="h-full overflow-hidden rounded-lg shadow-lg flex flex-col">
            <a href="#">
              <img
                alt="Placeholder"
                className="block h-48 md:h-64 lg:h-80 xl:h-80 w-full object-cover"
                src={gallery4}
              />
            </a>
  
            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                <Link to={`/single/${item.PropertyID?._text}`}>
                  <a className="no-underline hover:underline font-semibold text-heading" href="#">
                    {item?.name?._text}
                  </a>
                </Link>
              </h1>
  
              {item.a6 && (
                <div className="flex items-center justify-center">
                  <img src={location} alt="Location Icon" className="w-4 h-4 m-1" />
                  <span className="text-gray-600 text-sm mr-2">{item.a6._text}</span>
                </div>
              )}
            </header>
  
            {item.description && (
              <p className="flex-grow pb-3 px-2 md:px-4">{item.description._text}</p>
            )}
  
            {item.details && (
              <div className="flex">
                {/* Render your details */}
              </div>
            )}
  
            {item.price && (
              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <a className="flex items-center no-underline hover:underline text-black" href="#">
                  <p className="ml-2 text-sm">${item.price?._text} per night</p>
                </a>
              </footer>
            )}
          </article>
        </div>
      ))}
    </div>
  </div>
  
  )
}

export default CardDest
