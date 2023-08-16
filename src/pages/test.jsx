import React, {useState} from 'react'
import MainForm from '../components/Forms/MainForm';
const TestAPI = () => {
    const [responseData, setResponseData] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleProperty = async() =>{
    setLoading(true);
    setError(null);
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
             'username': 'bsc20230607',
             'password': '#20230607vhgfbefe#375378',
            'barefootAccount': 'v3cbsc0526',
                'isTest': 'true',
          'strPayment': 'paymentInfoHere',
          'EzicAccount': 'ezicAccountInfoHere',
          'propertyId': 'propertyIdHere',
          'strADate': 'ADateHere',
          'strDDate': 'DDateHere',
          'tenantid': 'tenantIdHere',
          'leaseid': 'leaseIdHere',
          'cctranstype': 'cctranstypeHere',
          'cFName': 'firstNameHere',
          'cLName': 'lastNameHere',
          'EzicTag': 'ezicTagHere',
          'EzicTranstype': 'ezicTranstypeHere',
          'EzicPaytype': 'ezicPaytypeHere',
          'cardNum': 'cardNumberHere',
          'expireMonth': 'expireMonthHere',
          'expireYear': 'expireYearHere',
          'cvv': 'cvvHere',
          'ccratetype': 'ccratetypeHere',
          'cctype': 'cctypeHere',
          'street': 'streetHere',
          'city': 'cityHere',
          'state': 'stateHere',
          'zip': 'zipHere',
          'country': 'countryHere',
          'RoutingNo': 'routingNumberHere',
          'AccSource': 'accSourceHere'
            })
          };
      
          try {
            const response = await 
            fetch('https://portals.barefoot.com/barefootwebservice/BarefootService.asmx/PropertyBookingNew', requestOptions);
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const responseBodyText = await response.text();
            setResponseData(responseBodyText);
          } catch (error) {
            setError('Error fetching data');
          } finally {
            setLoading(false);
          }
    }
    const fields = [
      { name: 'strPayment', label: 'Payment Details', colSpan: 5, placeholder: 'Payment info here', type: 'number' }, 
      { name: 'EzicAccount', label: 'EzicAccount', colSpan: 5 },
      { name: 'tenantid', label: 'Tenantid Id', colSpan: 5 },
      { name: 'leaseid', label: 'Lease Id', colSpan: 5 },
      { name: 'cctranstype', label: 'Cc transtype', colSpan: 5 },
      { name: 'cFName', label: 'CF Name', colSpan: 5 },
      { name: 'cLName', label: 'CL Name', colSpan: 5 },
      { name: 'EzicTag', label: 'EzicTag', colSpan: 5 },
      { name: 'EzicTranstype', label: 'Ezic Transtype', colSpan: 5 },
      { name: 'expireMonth', label: 'Expire Month', colSpan: 5},
      { name: 'EzicTranstype', label: 'Ezic Transtype', colSpan: 5 },
      { name: 'expireYear', label: ' Expire Year', colSpan: 5},
      { name: 'cvv', label: 'CVV', colSpan: 5 , type:'number'},
      { name: 'ccratetype', label: ' Cc ratetype', colSpan: 5 },
      { name: 'street', label: 'Street', colSpan: 5},
      { name: 'City', label: 'City', colSpan: 5 },
      { name: 'State', label: 'state', colSpan: 5 },
      { name: 'Country', label: 'Country', colSpan: 5 },
    ];
  
    const handleSubmit = formData => {
      // Handle form submission logic for Page 1
      console.log('Page 1 data:', formData);
    };
  return (
    <div>
      <MainForm fields={fields} onSubmit={handleSubmit} />
    </div>
  )
}

export default TestAPI
