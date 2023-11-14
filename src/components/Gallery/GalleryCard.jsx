import React from 'react'
import { star1 } from '../../assets'

const GalleryCard = ({data, t}) => {
  return (
    <div class="px-3 font-poppins">
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
        {data?.map((i)=>{
            return (
                <div class="my-1 px-1 w-full md:w-1/2 lg:my-4
                transform hover:scale-95 transition-transform duration-300 ease-in-out
                lg:px-4 lg:w-1/3"
                key={i.id}
                >
                <article class="overflow-hidden rounded-lg shadow-lg">
                    <a href="#">
                        <img alt="Placeholder" class="block h-80 w-full"
                         src={i.icon} />
                    </a>
    
                    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                        <h1 class="text-lg">
                            <a class="no-underline hover:underline font-semibold text-heading" href="#">
                             {t(i?.title)}
                            </a>
                           
                        </h1>
                        
                        {i?.star &&<div className="flex items-center justify-center">
                        <img src={star1} alt="Location Icon" className="w-4 h-4 m-1" />
        <span className="text-gray-600 text-sm mr-2">{i.star}</span>
       
      </div> }
                        
                    </header>
                    {i.description && <p className='pb-5 px-2 lg:px-4
xl:px-4 md:px-4
                    
                    '>{t(i.description)}</p>}
                   
    
                </article>
    
            </div>
            )
        })}
   
     
      
       
 
       

    </div>
</div>
  )
}

export default GalleryCard
