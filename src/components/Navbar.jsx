import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import styles from "../style";
import { useNavigate } from "react-router-dom";
const Navbar = ({background,forms}) => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [navbarFixed, setNavbarFixed] = useState(false);
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
  return (
    
    <nav className={`w-full px-10 flex py-6 justify-between
    ${background ? 'bg-heading' : ""}
    items-center navbar ${
      navbarFixed ? " bg-black" : ""
    } `}
    >
      <Link href="/"><img src={logo} alt="companyLogo" className="w-[140px] h-[36px]" 
      
      />
</Link>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
        
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            {nav.title != "Button" ?  <a href={`${nav?.link}`}>{nav.title}</a> : 
            <button 
            onClick={()=>navigate("/dest")}
            className="bg-secondary hover:bg-secondary/80
             text-white text-xs px-6 py-4 rounded-full transition duration-300">
              Book your stay</button>}
           
          </li>
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
