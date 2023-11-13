import React, {useState, useEffect} from 'react'
import { useMyContext } from '../../context/MyContext'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
const GetCoupon = () => {
    const { GetCouponList,convertXmlToJson, AddCoupon,deleteCoupon } = useMyContext();
    const [data, setData] = useState(null);
    const navigate = useNavigate(); 
     const storedDataJSON = localStorage.getItem('quoteInfo');
     const parseData = JSON.parse(storedDataJSON);
     let numberOfCoupons;
    useEffect(() => {
       
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
      navigate('/consumer')
    }
    const handleAddCoupon =async() =>{
    const leaseId = parseData?.QuoteInfo?.Leaseid;
    const counponCode = data?.CouponCodeList?.Coupons?.Coupon?.Code['#text']?.value 
    const result = await AddCoupon(leaseId,counponCode)
    const res = convertXmlToJson(result?.string['#text'].value);
    //console.log(res?.Response)
    if(res?.Response.Success['#text'].value){
      console.log("Go to Next Page")
    }
    }
    const handleDeleteCoupon = async() =>{
      const leaseId = parseData?.QuoteInfo?.Leaseid;
      const result = await deleteCoupon(leaseId)
      const res = convertXmlToJson(result?.string['#text'].value);
      //console.log(res?.Response)
      if(res?.Response.Success['#text'].value){
        console.log("Go to Next Page")
      }
    }
    const couponsObject = data?.CouponCodeList?.Coupons;
    if (couponsObject && typeof couponsObject === 'object') {
      numberOfCoupons = Object.keys(couponsObject).length;
    } else {
      console.log("Coupons object is undefined or not an object.");
    }
  return (
    <>
    <Navbar background={true}
      forms={true}
      className="fixed top-0 w-full"
      />
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
                    <pre className='font-poppins'>{JSON.stringify(value?.Coupon?.Name['#text']?.value, null, 2)}</pre>
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
      {data && (
  <>
    { numberOfCoupons > 0 &&(
      <>
        <button
          type="submit"
          onClick={handleAddCoupon}
          className="bg-secondary hover-bg-secondary/80 mt-5 w-full text-white text-sm px-6 py-4 rounded-full transition duration-300 font-poppins"
        >
          Add Coupon
        </button>
        <button
          type="submit"
          onClick={handleDeleteCoupon}
          className="bg-secondary hover-bg-secondary/80 mt-5 w-full text-white text-sm px-6 py-4 rounded-full transition duration-300 font-poppins"
        >
          Remove Coupon
        </button>
      </>
    )}
  </>
)}

    </div>
  </div>
  
  <Footer className="fixed bottom-0 w-full" />
  </>
  )
}

export default GetCoupon
