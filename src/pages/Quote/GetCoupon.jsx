import React, {useState, useEffect} from 'react'
import { useMyContext } from '../../context/MyContext'

const GetCoupon = () => {
    const { GetCouponList,convertXmlToJson } = useMyContext();
    const [data, setData] = useState(null);
    useEffect(() => {
        // Load data from local storage
        const storedDataJSON = localStorage.getItem('quoteInfo');
        const parseData = JSON.parse(storedDataJSON);
        async function fetchData() {
          try {
            const couponList = await GetCouponList(parseData?.QuoteInfo?.Leaseid);
            const res = convertXmlToJson(couponList?.string['#text']?.value);
            setData(res);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, []);
    const handleSubmit = () =>{
    }
  
    const handleDeleteCoupon =() =>{

    }
    const handleAddCoupon = () =>{
        
    }
  return (
    <div className="flex flex-col justify-center font-poppins items-center h-screen ">
    <div className="bg-white rounded-lg p-8 shadow-xl text-center">
      <h1 className="text-3xl font-semibold mb-4">Coupon List</h1>
      <div className="space-y-4">
      {data ? (
              Object.entries(data.CouponCodeList).map(([key, value]) => (
                <div key={key}>
                  <span className="font-semibold p-1 font-poppins">{key}</span>
                  {Object.keys(value).length === 0 ? (
                    <p>No values available.</p>
                  ) : (
                    <pre className='font-poppins'>{JSON.stringify(value, null, 2)}</pre>
                  )}
                </div>
              ))
            ) : (
              <p className="font-poppins">Loading coupon data...</p>
            )}
        </div>
  
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-secondary hover:bg-secondary/80 mt-5 w-full text-white text-sm px-6 py-4 rounded-full transition duration-300 font-poppins">
        Next
      </button>
      <button
        type="submit"
        onClick={handleAddCoupon}
        className="bg-secondary hover:bg-secondary/80 mt-5 w-full text-white text-sm px-6 py-4 rounded-full transition duration-300 font-poppins">
        Add Coupon
      </button>
      <button
        type="submit"
        onClick={handleDeleteCoupon}
        className="bg-secondary hover:bg-secondary/80 mt-5 w-full text-white text-sm px-6 py-4 rounded-full transition duration-300 font-poppins">
        Delete Coupon
      </button>
    </div>
  </div>
  )
}

export default GetCoupon
