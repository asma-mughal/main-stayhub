import React, {useState, useEffect} from 'react'
import { useMyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
import MainForm from '../../components/Forms/MainForm';
const ConsumerInfo = () => {
    const {setCosumerInfo} = useMyContext()
    const [isLoading, setIsLoading] = useState(false);
    const [isStored, setIsStored] = useState(false); // 
    const navigate = useNavigate(); 
    const stateOptions = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming'
    ]
    const countryOptions =[
      'United States',
      'Canada',
      'United Kingdom',
      'Australia',
      'India',
      'Germany',
      'France',
      'Japan',
      'China',
      'Brazil',
      'Mexico',
      'South Korea',
      'Spain',
      'Italy',
      'Netherlands',
      'Sweden',
      'Norway',
      'Denmark',
      'Russia',
      'South Africa'
    ]
    const cityOptions = [
      'New York',
      'Los Angeles',
      'London',
      'Paris',
      'Sydney',
      'Tokyo',
      'Toronto',
      'Chicago',
      'Mumbai',
      'Miami',
      'Berlin',
      'Hong Kong',
      'Rome',
      'San Francisco',
      'Seoul',
      'Vancouver',
      'Madrid',
      'Melbourne',
      'Dubai',
      'Singapore',
      'Shanghai',
      'Amsterdam',
      'Boston',
      'Barcelona',
      'Vienna',
      'Stockholm',
      'Prague',
      'Buenos Aires',
      'Cape Town',
    ];
    const fields = [
        { name: 'street1', label: 'Street # 01', colSpan: 5, type:'text', required: true },
        { name: 'street2', label: 'Street # 02', colSpan: 5, type:'text', required: true },
        { name: 'city', label: 'City', colSpan: 5 , type: 'select', options: stateOptions, required: true},
        { name: 'state', label: 'State', colSpan: 5, type: 'select', options: stateOptions, required: true },
        { name: 'zip', label: 'Zip Code', colSpan: 5, type:'number', required: true },
        { name: 'country', label: 'Country', colSpan: 5,  type: 'select', options: countryOptions , required: true},
        { name: 'firstname', label: 'First Name', colSpan: 5, type:'text', required: true },
        { name: 'lastname', label: 'Last Name', colSpan: 5, type:'text', required: true },
        { name: 'homephone', label: 'Home Phone', colSpan: 5, type:'number' , required: true},
        { name: 'bizphone', label: 'Other Phone', colSpan: 5, type:'number', required: true },
        { name: 'fax', label: 'Fax', colSpan: 5, type:'number' , required: true},
        { name: 'mobile', label: 'Mobile Number', colSpan: 5, type:'number', required: true },
        { name: 'email', label: 'Email', colSpan: 5, type:'email', required: true },
        { name: 'SourceOfBusiness', label: 'Source of Busniess', colSpan: 5, type:'text', required: true }
      ];
      // useEffect(() => {
      //   const url = 'https://portals.barefoot.com/barefootwebservice/BarefootService.asmx/SetConsumerInfo?username=bsc20230607&password=%2320230607vhgfbefe%23375378&barefootAccount=v3cbsc0526&Info=street1&Info=aasddfdf&Info=street1&Info=street1&Info=street1&Info=street1&Info=street1&Info=street1&Info=d&Info=ed&Info=ds&Info=ed&Info=sf&Info=rfr&Info=rrf&Info=srgr&Info=rgreg';
    
      //   fetch(url)
      //     .then(response => {
      //       if (!response.ok) {
      //         throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
      //       }
      //       return response.text();
      //     })
      //     .then(data => {
      //       console.log(data);
      //     })
      //     .catch(error => {
      //       console.error(error);
      //     });
      // }, []);
      const handleSubmit = async (formData) => {
        try {
          setIsLoading(true);
          const data = await setCosumerInfo(formData)
          console.log(data)
          setIsStored(true);

          setTimeout(() => {
            setIsLoading(false);
            navigate('/comments'); // Navigate to the comments page after a delay
          }, 2000);
        } catch (error) {
          console.log(error)
          console.error('Error:', error);
        } 
      };
      useEffect(() => {
        if (isStored) {
          const timer = setTimeout(() => {
            setIsLoading(false);
            navigate('/comments'); 
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [isStored, navigate]);
  return (
<div className="h-full flex flex-col justify-center items-center">
  <div className="flex flex-col items-center h-full">
    <div className="mb-4">
      {isLoading ? (
          <div className="h-screen flex flex-col justify-center items-center">
        <div className="loader border-t-4 border-secondary border-solid rounded-full h-12 w-12 animate-spin"></div>
        </div>
      ) : (
        
        <MainForm fields={fields} onSubmit={handleSubmit} heading={'Consumer Details'}
        
        link={"https://images.pexels.com/photos/3767442/pexels-photo-3767442.jpeg?auto=compress&cs=tinysrgb&w=600"}/>
      )}
    </div>
  </div>
</div>
  )
}

export default ConsumerInfo
