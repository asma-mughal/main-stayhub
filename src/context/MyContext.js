import React, { createContext, useContext, useState } from 'react';
import { urlAPI , barefootAccount, userName, password} from '../constants';
const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);

export const MyProvider = ({ children }) => {
  const [data, setData] = useState('abc');
  let newJson1;
  const [propertyMessage, setPropertyMessage] = useState('')
  let transtype = '';
   const [jsonData, setJsonData] = useState({});
   const [filteredProperties, setFilteredProperties] = useState([]);
  const updateData = newData => {
    setData(newData);
  };
  function xmlToJson(xml) {
    const result = {};

    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        result['attributes'] = {};
        for (let i = 0; i < xml.attributes.length; i++) {
          const attribute = xml.attributes[i];
          result['attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      result['value'] = xml.nodeValue.trim();
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const child = xml.childNodes[i];
        const nodeName = child.nodeName;

        if (result[nodeName]) {
          if (!Array.isArray(result[nodeName])) {
            result[nodeName] = [result[nodeName]];
          }
          result[nodeName].push(xmlToJson(child));
        } else {
          result[nodeName] = xmlToJson(child);
        }
      }
    }

    return result;
  }
  function fetchData(callback) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'ASP.NET_SessionId=nksnbl2xfnhvahhvq1feejmt'
      },
    };
  
    fetch(`https://rajanosha7.pythonanywhere.com/getproperty`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(responseBody => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseBody, 'text/xml');
  
        const xmlString = new XMLSerializer().serializeToString(xmlDoc);
        const parser2 = new DOMParser();
        const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
        const jsonData = xmlToJson(xmlDOM);
        callback(null, jsonData?.string);
      })
      .catch(error => {
        callback('Error fetching data', null);
      });
  }
  const getAvailablityByDate = (date1, date2) =>{
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'ASP.NET_SessionId=nksnbl2xfnhvahhvq1feejmt'
      },
      body: new URLSearchParams({
        'username': userName,
        'password': password,
        'barefootAccount': barefootAccount,
        'date1' :date1,
        'date2' : date2,
        'weekly' : 0
      })
    };
    return fetch(`${urlAPI}/GetPropertyAvailabilityByDateXML`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(responseBody => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseBody, 'text/xml');
      const jsonData = xmlToJson(xmlDoc);
      return jsonData;
    })
    .catch(error => {
      throw new Error('Error fetching data');
    });
    
  }
  function fetchOneProperty() {
    const uniqueId = localStorage.getItem("propertyId")
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'ASP.NET_SessionId=nksnbl2xfnhvahhvq1feejmt'
      },
      body: new URLSearchParams({
        'username': userName,
        'password': password,
        'barefootAccount': barefootAccount,
        'PropertyID': uniqueId
      })
    };
  
    return fetch(`${urlAPI}/GetPropertyDetails`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(responseBody => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseBody, 'text/xml');
        const xmlString = new XMLSerializer().serializeToString(xmlDoc);
        const parser2 = new DOMParser();
        const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
        const jsonData = xmlToJson(xmlDOM);
        return jsonData;
      })
      .catch(error => {
        throw new Error('Error fetching data');
      });
  }
 async function GetLeaseidByReztypeid(formValues) {
    const { arrivalDate, deptDate, numAdult, numPet, numBaby, numChild} = formValues;
    console.log(formValues)
    const uniqueId = localStorage.getItem("propertyId")
    const url = `${urlAPI}/CreateQuote`;
    const requestBody = {
      'username': userName,
      'password': password,
      'barefootAccount': barefootAccount,
      'strADate':arrivalDate,
      'strDDate': deptDate,
      'propertyId':uniqueId,
      'num_adult': numAdult,
      'num_pet': numPet,
      'num_baby': numBaby,
      'num_child': numChild
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestBody)
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData;
    } catch (error) {
      console.error('API Request Error:', error);
    
    }
  }
  async function IsPropertyAvailable(formValues) {
    const { date1, date2} = formValues;
    const uniqueId = localStorage.getItem("propertyId")
    const url = `${urlAPI}/IsPropertyAvailability`;
    const requestBody = {
      'username': userName,
      'password': password, 
      'barefootAccount': barefootAccount,
       'date1' :date1,
       'date2' :date2,
       'propertyId':uniqueId
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestBody)
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData;
    } catch (error) {
      console.error('API Request Error:', error);
    
    }
  }
  async function getMinDays(formValues) {
    const uniqueId = localStorage.getItem("propertyId")
    const url = `${urlAPI}/GetMinimumDays`;
    const requestBody = {
      'username': userName,
      'password': password, 
      'barefootAccount': barefootAccount,
       'propertyId':uniqueId,
       'reztypeid':'20'
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestBody)
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData;
    } catch (error) {
      console.error('API Request Error:', error);
    
    }
  }
  async function GetQuoteRatesDetail(formValues) {
    const { arrivalDate, deptDate, numAdult, numPet, numBaby, numChild} = formValues;
    localStorage.setItem('arrivalDate', arrivalDate);
    localStorage.setItem('deptDate', deptDate);
    const uniqueId = localStorage.getItem("propertyId")
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = {
      "strADate": arrivalDate,
      "strDDate": deptDate,
      "propertyId": uniqueId,
      "num_adult": numAdult,
      "num_pet": numPet,
      "num_baby": numBaby,
      "num_child": numChild,
      "reztypeid": 1
    };
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
  
    try {
      const response = await fetch("https://rajanosha7.pythonanywhere.com/create_qoute_by_resid", requestOptions);
      const result = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(result, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData;
    } catch (error) {
      console.error('API Request Error:', error);
    }
  }
  async function setCommentsInfo(formValues, leaseID) {
    const { comments} = formValues;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "leaseid": leaseID,
      "comments": comments,
      "commentType": 4
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch("https://rajanosha7.pythonanywhere.com/set_comments_info", requestOptions);
      const result = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(result, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData;
    } catch (error) {
      console.log('error', error);
    }

  }
  async function GetOptionalServiceIDs(formValues) {
    const uniqueId = localStorage.getItem("propertyId");
    const url = `${urlAPI}/GetOptionalServiceIDs`;
    const requestBody = {
      'username': userName,
      'password': password,
      'barefootAccount': barefootAccount,
      'reztypeID':20,
      'begindate':formValues?.ArrivedDate,
      'enddate':formValues?.DepartureDate
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestBody)
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData
    } catch (error) {
      console.error('API Request Error:', error);
    
    }
  }
  async function AddCoupon(couponCode, leaseId) {
    const url = `${urlAPI}/AddCoupon`;
    const requestBody = {
      'username': userName,
      'password': password,
      'barefootAccount': barefootAccount,
      'leaseid':leaseId,
    'couponCode':couponCode,

    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestBody)
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData
    } catch (error) {
      console.error('API Request Error:', error);
    
    }
  }
  async function deleteCoupon(couponCode, leaseId) {
    const url = `${urlAPI}/RemoveCoupon`;
    const requestBody = {
      'username': userName,
      'password': password,
      'barefootAccount': barefootAccount,
      'leaseid':leaseId,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestBody)
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData
    } catch (error) {
      console.error('API Request Error:', error);
    
    }
  }
  async function GetCouponList(leaseId) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "leaseid": leaseId
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch("https://rajanosha7.pythonanywhere.com/get_valid_coupn_list", requestOptions);
      
      if (!response.ok) {
        throw new Error('API Request Error');
      }
  
      const data = await response.text();
  
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      
      return jsonData;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }
  async function setCosumerInfo(formValues) {
    const uniqueId = localStorage.getItem("propertyId")
    const arrivalDate =  localStorage.getItem('arrivalDate');
    const deptDate = localStorage.getItem("deptDate")
    const {street1,street2, city,state, zip,country,lastname,firstname,homephone,bizphone,fax,mobile,email,SourceOfBusiness } = formValues;
    const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestBody = {
    "a": "saif",
    "b": "azeem",
    "c": "Abbasi",
    "d": "saif",
    "e": "azeem",
    "f": "Abbasi",
    "g": "saif",
    "h": "azeem",
    "i": "Abbasi",
    "j": "saif",
    "k": "azeem",
    "l": "Abbasi",
    "m": "saif",
    "n": "azeem",
    "o": "Abbasi",
    "p": "saif",
    "q": "azeem",
    "r": "Abbasi"
  };

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(requestBody),
    redirect: 'follow'
  };

  fetch("https://rajanosha7.pythonanywhere.com/setcustomerinfo", requestOptions)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();

    const xmlDoc = parser.parseFromString(data, "text/xml");
    const tenantId = xmlDoc.getElementsByTagName("int")[0]?.textContent;
    localStorage.setItem("tenantId", tenantId);
  
    })
    .catch(error => console.log('error', error));
  }
  const checkCCType = (ccType,isTestMode) =>{

    let mappedCcType;

    if (isTestMode === 'ON') {
      // When isTestMode is 'ON,' set ccType to an empty string
      mappedCcType = '';
    } else {
      // Convert ccType and comparison values to lowercase for case-insensitive comparison
      const lowercaseCcType = ccType.toLowerCase();
    
      switch (lowercaseCcType) {
        case 'master':
          mappedCcType = '1';
          break;
        case 'visa':
          mappedCcType = '2';
          break;
        case 'discover':
          mappedCcType = '3';
          break;
        case 'amex':
          mappedCcType = '4';
          break;
        default:
          // Handle other cases or set a default value if needed
          mappedCcType = ''; // Set to empty string by default
      }
    }
  return mappedCcType
  }
  const saveProperty = async(formValues) =>{
    const {strPayment,ezicAccount,
      cFName,cLName,ezicTag,ezicTranstype,
      creditCard,
      expireDate,
     cvv,
     ccType,
     street,
      city,
      state,
      zip,
     country} = formValues;
     const ccTypeCheck = checkCCType(ccType)
     const uniqueId = localStorage.getItem("propertyId");
     const storedDataJSON = localStorage.getItem('quoteInfo');
        const parseData = JSON.parse(storedDataJSON);
        const leaseId = parseData?.QuoteInfo?.Leaseid;
        const tenatId =  localStorage.getItem("tenantId");
        const dateObj = new Date(expireDate);
        const year = dateObj.getFullYear(); 
        const arrivalDate =  localStorage.getItem('arrivalDate');
        const deptDate = localStorage.getItem("deptDate")
        const month = dateObj.toLocaleString('default', { month: 'long' });
        if (formValues.ezicAccount !== undefined) {
        transtype = 'EZC3'
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const data = {
          "portalid": "true",
          "a": strPayment,
          "b": ezicAccount,
          "c": uniqueId,
          "d": arrivalDate,
          "e": deptDate,
          "f": tenatId,
          "g": leaseId,
          "h": transtype,
          "i": cFName,
          "j": cLName,
          "k": "",
          "l": ezicTranstype,
          "m": "s",
          "n": creditCard,
          "o": month,
          "p": year,
          "q": cvv,
          "r": "HOTEl",
          "s": ccTypeCheck,
          "t": street,
          "u": city,
          "v": state,
          "w": zip
        };
    
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: 'follow'
        };
    
        fetch("https://rajanosha7.pythonanywhere.com/payment_info", requestOptions)
          .then(response => response.text())
          .then(data =>{
            const parser = new DOMParser();
            console.log(data)
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      console.log(jsonData)
      setPropertyMessage(jsonData)
          })
          .catch(error => console.log('error', error));
    }
 
  // const convertXmlToJson = (xmlData) => {
  //   const options = { compact: true, spaces: 2 };
  //   const result = xmlJs.xml2json(xmlData, options);
  //   return result;
  // };

  const convertXmlToJson = (xmlData) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    return xmlToJsonTwo(xmlDoc);
  };
  const xmlToJsonTwo = (xml) => {
    const result = {};

    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        result['@attributes'] = {};
        for (let i = 0; i < xml.attributes.length; i++) {
          const attribute = xml.attributes.item(i);
          result['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      result['#text'] = xml.nodeValue;
    }

    const elementNodes = Array.from(xml.childNodes).filter(node => node.nodeType === 1);
    if (elementNodes.length > 0) {
      elementNodes.forEach(node => {
        if (!result[node.nodeName]) {
          result[node.nodeName] = xmlToJson(node);
        } else {
          if (!Array.isArray(result[node.nodeName])) {
            result[node.nodeName] = [result[node.nodeName]];
          }
          result[node.nodeName].push(xmlToJson(node));
        }
      });
    }

    return result;
  };
  const parseImages = (xmlResponse) =>{
    // const options = { compact: true, ignoreComment: true, spaces: 4 };
    // const result = xml2js(xmlResponse, options);

    // if (result.DataSet && result.DataSet.item) {
    //   const images = Array.isArray(result.DataSet.item)
    //     ? result.DataSet.item
    //     : [result.DataSet.item];
    //   console.log(images)
    // }
  }
  const contextValue = {
    data,
    updateData,
    fetchData,
    convertXmlToJson,
    fetchOneProperty,
    parseImages,
    jsonData, setJsonData,
    getAvailablityByDate,
    saveProperty,
    GetLeaseidByReztypeid,
    filteredProperties, setFilteredProperties,
    IsPropertyAvailable,
    getMinDays,
    GetQuoteRatesDetail,
    GetOptionalServiceIDs,
    xmlToJson,
    GetCouponList,
    setCosumerInfo,
    setCommentsInfo,
    propertyMessage
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};