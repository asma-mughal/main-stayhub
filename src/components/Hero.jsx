import {useState, useEffect} from 'react';
import styles from "../style";
import Navbar from "./Navbar";
import Tags from './Tags';
import { useTranslation } from 'react-i18next';
import { useMyContext } from '../context/MyContext';
const Hero = ({heading, title, name, height}) => {
  const [isActive, setIsActive] = useState(false);
  const {t, i18n} = useTranslation(['ABOUT']);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const { jsonData,filteredProperties, setFilteredProperties} = useMyContext()
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = jsonData?.PropertyList?.Property?.filter(property =>
      property?.name['#text']?.value?.toLowerCase().includes(query.toLowerCase())
    );
    //console.log(filtered)
    setFilteredProperties(filtered);
  };
  useEffect(() => {
    if (jsonData?.PropertyList?.Property) {
      setFilteredProperties(jsonData.PropertyList.Property);
    }
  }, [jsonData]);
  // console.log(jsonData?.PropertyList?.Property[1]?.name['#text'].value)
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
      {title ? t(title) : t("Explore Destinations")}
 </h1> 
 <div className="max-w-3xl my-5 px-3">
    {heading === false && 
    <>
  
  <div className="flex items-center bg-white rounded-full shadow-xl">
   <input type="text" className="w-full  px-6 py-3 text-sm
    text-gray-800 rounded-l-full focus:outline-none " placeholder={t("Search destinations")}
    value={searchQuery}
    onChange={handleSearchInputChange}
    />
   <button className="bg-secondary hover:bg-secondary/80
   text-white text-xs px-6 py-4 rounded-r-full transition duration-300">{t("Search")}</button>
 </div> 

<Tags t={t}/>
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
