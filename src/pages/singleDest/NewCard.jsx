import React, {useState} from 'react'
import { gallery4,location } from '../../assets'
import { Link } from 'react-router-dom'
function handleLinkClick(propertyId) {
  localStorage.setItem('propertyId', propertyId);
}

const NewCard = ({ data,imagePaths,t }) => {
  const maxDescriptionLength = 150; 
  return (
    <div className="px-3 font-poppins">
    <div className="flex flex-wrap -mx-2"> {/* Adjust mx-2 for spacing */}
      {data?.map((item, index) => (
       <div className="my-2 px-2 w-full md:w-1/2 lg:my-4 lg:w-1/3" key={index}>
       <article className="h-full overflow-hidden rounded-lg shadow-lg flex flex-col">
         <a href="#">
         <Link  to={`/single/${item.PropertyID['#text']?.value}` }> 
           <img
             alt="Placeholder"
             className="block h-80 w-full object-cover"
             src={imagePaths[index] || gallery4}
            loading='lazy'
           />
           </Link>
         </a>

         <header className="flex items-center justify-between leading-tight p-2 md:p-4">
           <h1 className="text-lg">
             <Link to={`/single/${item.PropertyID['#text']?.value}`}
             onClick={() => handleLinkClick(item.PropertyID['#text']?.value)}
             >
               <a className="no-underline hover:underline font-semibold text-heading" href="#">
                 {item['name']['#text']?.value}
               </a>
             </Link>
           </h1>

           {item?.a6 && (
             <div className="flex items-center justify-center">
               <img src={location} alt="Location Icon" className="w-4 h-4 m-1" />
               <span className="text-gray-600 text-sm mr-2">{item['a6']['#text']?.value}</span>
             </div>
           )}
         </header>
         {item['description']?.['#text']?.value &&  (
  <p className="pb-3 px-2 md:px-4">
  {item['description']?.['#text']?.value
    ?.replace(/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/g, '').substring(0, maxDescriptionLength)}
  {item['description']?.['#text']?.value.length > maxDescriptionLength && '...'}
  {item['description']?.['#text']?.value.length > maxDescriptionLength && (
    <button className="hover:underline focus:outline-none" onClick={() => handleLinkClick(item.PropertyID['#text']?.value)}>
      <Link to={`/single/${item.PropertyID['#text']?.value}`}>
        <a className="text-secondary text-sm" href="#">
         {t("Read more")}
        </a>
      </Link>
    </button>
  )}
</p>
)}
{/*   
         {item['NumberFloors'] && (
            <div className="flex">
            <div className="w-1/4 p-4 text-center border-r">
              <div className="mb-2">
              <img src={home} alt="Icon 1" className="w-5 h-5 mx-auto" />
              </div>
              <p className='text-xs'>1 Home</p>
            </div>
            <div className="w-1/4 p-4 text-center border-r">
              <div className="mb-2">
              <img src={guest} alt="Icon 1" className="w-5 h-5 mx-auto" />
              </div>
              <p className='text-xs'>1 Guests</p>
            </div>
            <div className="w-1/4 p-4 text-center border-r">
              <div className="mb-2">
              <img src={bedroom} alt="Icon 1" className="w-5 h-5 mx-auto" />
              </div>
              <p className='text-xs'>1 Boudoir</p>
            </div>
            <div className="w-1/4 p-4 text-center">
              <div className="mb-2">
              <img src={bathroom} alt="Icon 1" className="w-5 h-5 mx-auto" />
              </div>
              <p className='text-xs'>1 lavatory</p>
            </div>
            </div>
         )}
*/}
            
{item['maxprice']['#text']?.value && <footer class="flex items-center justify-between 
leading-none p-2 md:p-4">
                     <a class="flex items-center no-underline hover:underline text-black" href="#">
                         <p class="ml-2 text-sm">
                            $ {item['maxprice']['#text']?.value} {t("per night")}
                         </p>
                     </a>
                  
                 </footer>}

       </article>
     </div>
      ))}
    </div>
  </div>
  );
};

export default NewCard
