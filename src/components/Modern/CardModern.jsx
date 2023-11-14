import React from 'react'
import { Link } from 'react-router-dom'
import { location } from '../../assets'
const CardModern = ({data, start, end,link, t}) => {
  return (
    <div className="px-3 font-poppins">
    <div className="flex flex-wrap -mx-2"> {/* Adjust mx-2 for spacing */}
      {data?.slice(start, end).map((i, index) => (
        <div
          className="my-2 px-2 w-full md:w-1/2 lg:my-4 lg:w-1/3"
          key={index}
        >
          <article className="h-full overflow-hidden rounded-lg shadow-lg flex flex-col">
            <a href="#">
              <img
                alt="Placeholder"
                className="block h-48 md:h-64 lg:h-80 xl:h-80 w-full object-cover"
                src={i.icon}
              />
            </a>
  
            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                <Link to={link ? `/single/${i.id}` : ''}>
                  <a className="no-underline hover:underline font-semibold text-heading" href="#">
                  {t(i?.title)}
                  </a>
                </Link>
              </h1>
            </header>
  
            {i.description && (
              <p className="flex-grow pb-3 px-2 md:px-4">{t(i.description)}</p>
            )}
  
  
            {i.price && (
              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <a className="flex items-center no-underline hover:underline text-black" href="#">
                  <p className="ml-2 text-sm">${t(i.price)} {t("per night")}</p>
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

export default CardModern
