import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import styles from "../style";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import {globeIcon, americaIcon, spanishIcon, portugueseIcon} from '../assets/index';
const Navbar = ({background,forms}) => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [navbarFixed, setNavbarFixed] = useState(false);
  const {t, i18n} = useTranslation(['ABOUT']);
const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setNavbarFixed(true);
      } else {
        setNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleLanguageChange = (e) => {
     i18n.changeLanguage(e);
   };
   const [isOpen, setIsOpen] = useState(false);

   const toggleDropdown = () => {
     setIsOpen(!isOpen);
   };
  return (
    
    <nav className={`w-full px-10 flex py-6 justify-between
    ${background ? 'bg-heading' : ""}
    items-center navbar ${
      navbarFixed ? " bg-black" : ""
    } `}
    >
        <Link to="/"> {/* Set the "to" prop to the URL of the next page */}
        <img
          src={logo}
          alt="companyLogo"
          className="w-[140px] h-[36px]"
        />
      </Link>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
        <>
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >  {nav.title != "Button" && nav.title == "DropDown" &&  <div className="relative inline-block text-left">
          <div>
              <button
                  onClick={toggleDropdown}
                  type="button"
                  className="inline-flex items-center justify-center 
                  w-full px-4 py-2 text-sm font-medium text-white
                   bg-white border border-transparent rounded-md"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
              >
                  <img
                      className="w-4 h-4 mr-1"
                      src={globeIcon}
                      alt="Globe Icon"
                  />
                  <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                      <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 12L4 6H16L10 12Z"
                          fill="black"
                      />
                  </svg>
              </button>
          </div>
  
          {isOpen && (
        <div className="absolute right-0 mt-2 space-y-2 bg-white border rounded-md shadow-md">
        <button
          className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          role="menuitem"
          onClick={() => handleLanguageChange('en')}
        >
          <img
            src={americaIcon}
            alt="American Flag"
            className="w-4 h-4 mr-2"
          />
        </button>
        <button
          className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          role="menuitem"
        >
          <img
            src={spanishIcon}
            alt="Spanish Flag"
            className="w-4 h-4 mr-2"
          />
        </button>
        <button
          className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          role="menuitem"
        >
          <img
            src={portugueseIcon}
            alt="Portuguese Flag"
            className="w-4 h-4 mr-2"
          />
        </button>
      </div>
      )}
      </div>  }
            {nav.title != "Button" && nav.title != "DropDown" &&  <a href={`${nav?.link}`}>{t(nav.title)}</a> }
          
            {nav.title == "Button" && nav.title != "DropDown" &&  <button
          onClick={() => navigate("/dest")}
          className="bg-secondary hover:bg-secondary/80 text-white text-xs px-6 py-4 rounded-full transition duration-300"
        >
          Book your stay
        </button> }
          </li>
          </>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center ">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 bg-black min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
               {nav.title != "Button" ?  <a href={`${nav.link}`}>{nav.title}</a> : <button 
                onClick={()=>navigate("/dest")}
            className="bg-secondary hover:bg-secondary/80 text-white text-xs px-6 py-4 rounded-full transition duration-300">
              Book your stay</button>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
