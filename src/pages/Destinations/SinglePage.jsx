import React, {useEffect, useState} from 'react'
import { useMyContext } from '../../context/MyContext';
import NewCard from '../singleDest/NewCard';
const DateRange = ({setFilteredData}) =>{
  const { getAvailablityByDate,convertXmlToJson} = useMyContext()
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleSearchButtonClick = async () => {
    try {
      const jsonData = await getAvailablityByDate(startDate, endDate);
      const data = convertXmlToJson(jsonData?.string['#text'].value);
     setFilteredData(data?.Property?.PropertyAvailability)
    } catch (error) {
      console.error('Error fetching or filtering data:', error.message);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md text-left mx-3 font-poppins">
    <div className="flex space-x-4 items-center">
    <input
  type="date"
  className="border rounded-md px-3 py-1 w-1/2"
  placeholder="Start Date"
  value={startDate}
  onChange={handleStartDateChange}
/>
<input
  type="date"
  className="border rounded-md px-3 py-1 w-1/2"
  placeholder="End Date"
  value={endDate}
  onChange={handleEndDateChange}
/>
<button
          className="bg-secondary hover:bg-secondary-80 text-white text-xs px-6 py-4 rounded-full transition duration-300"
          onClick={handleSearchButtonClick}
        >
          Submit
        </button>
    </div>
  </div>
);
};

const SinglePage = () => {
  const { fetchData,convertXmlToJson, fetchImage} = useMyContext()
  const [jsonData, setJsonData] = useState({});
  const [error, setError] = useState();
  const [filteredData, setFilteredData] = useState({});
  const [imagePaths, setImagePaths] = useState([]);
  useEffect(() => {
   fetchData((error, responseData) => {
     if (error) {
       setError('Error fetching data');
     } else {
      const res = convertXmlToJson(responseData['#text']?.value)
      setJsonData((res))
     }
   });

   }, [])
   useEffect(() => {
    const propertyData = jsonData?.PropertyList?.Property;
    const paths = [];
    const fetchImagesForProperties = async () => {
      if (propertyData) {
        for (const property of propertyData) {
          const propertyID = property.PropertyID;
          const responseData = await fetchImage(propertyID['#text']?.value);
          console.log(responseData)
          if (responseData && responseData.length > 0) {
            const firstImagePath = responseData[0].imagepath['#text'].value;
            paths.push(firstImagePath);
          }
        }
      }
      setImagePaths(paths);
    }
  
    if (propertyData) {
      fetchImagesForProperties();
    }
  }, [jsonData]);
  return (
    <>
     <div className="flex flex-col md:flex-row font-poppins">
    <div className="md:w-1/2 p-4  ">
    <h1 className={`text-[24px] font-poppins font-bold text-heading leading-[30.8px]`}>Stay Hub</h1>
   
    <p className={`text-xs 
    text-justify text-gray-500
    my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl
    `}>
 Welcome to our popular destinations section, where we unveil a curated collection of captivating
  locations that are beloved by travelers worldwide. 
  Whether you seek the tranquility of 
  a beachside retreat, the vibrant energy of a bustling city, or the charm of a historic town, 
  our selection of popular destinations offers something for every wanderlust-filled soul. 
  Prepare to embark on an unforgettable journey as we highlight the unique experiences and 
  hidden gems that await you.</p>  
   
    </div>
  
   
  </div>
  <div className="md:w-1/2 p-4">
 
    <h1 className={`text-[24px] font-poppins font-bold text-heading leading-[30.8px]`}>Popular Destinations</h1>
    <p className={`text-xs my-2 xs:text-xs sm:text-base md:text-sm lg:text-base xl:text-xl
    text-justify font-poppins text-gray-500
    `}>From pristine beaches with crystal-clear waters to majestic mountains with panoramic views, breathtaking beauty at every turn.</p>  
    </div>
    <DateRange
    filteredData={filteredData}
    setFilteredData ={setFilteredData}
     />

{jsonData?.PropertyList?.Property?.length == undefined && <div className="result-not-available flex flex-col items-center justify-center h-screen">
            <p className="text-red-500 text-xl font-semibold font-poppins mb-2">
              Something Went Wrong.
            </p></div>}
    {Object.keys(filteredData).length > 0 ? (
        <NewCard data={filteredData} link={true} 
        imagePaths={imagePaths}
        />
      ) : (
        <NewCard data={jsonData?.PropertyList?.Property
        }  link={true}
        imagePaths={imagePaths}
        />
      )}
    </>

  )
}

export default SinglePage
