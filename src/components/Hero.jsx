import {useState} from 'react';
import styles from "../style";
import Navbar from "./Navbar";
import Tags from './Tags';
import CardHero from './CardHero';
const Hero = ({heading, title, name, height}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <section id="home" className="font-poppins relative" >
<section 
 onClick={handleClick}
className={`flex flex-col ${height ? height : "h-auto"}  bg-black/10 text-white bg-center bg-cover 
bg-blend-overlay bg-fixed transition-opacity duration-500 

hover:bg-opacity-50`}
 style={{
  backgroundImage: `url(${name})` ,
}}>
        <Navbar background={false} />
    

<div class="flex-1 flex items-start">
  <div class={`text-center mx-auto ${styles.paddingY}`}>
    <h1 class={`lg:text-[30px] xl:text-[30px] text-[25px]
 font-poppins font-semibold text-white leading-[30.8px]`}>
      {title ? title : "Explore Destinations"}
 </h1> 
 <div className="max-w-3xl my-5 px-3">
    {heading === false && 
    <>
  
  <div className="flex items-center bg-white rounded-full shadow-xl">
   <input type="text" className="w-full  px-6 py-3 text-sm
    text-gray-800 rounded-l-full focus:outline-none " placeholder="Search destinations..." />
   <button className="bg-secondary hover:bg-secondary/80
   text-white text-xs px-6 py-4 rounded-r-full transition duration-300">Search</button>
 </div> 

<Tags />
</>
}
</div> 
       
    </div>

</div>

</section>

    </section>
    
  );
};

export default Hero;
