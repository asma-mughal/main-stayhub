import React, { createContext, useContext, useState } from 'react';
import { urlAPI} from '../constants';
const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);

export const MyProvider = ({ children }) => {
  const [data, setData] = useState('abc');
  let newJson1;
  const [propertyMessage, setPropertyMessage] = useState('')
  const [singleProError, setSinglePropError] = useState(false)
  const [destProError, setDestProError] = useState(false);
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
  
    fetch(`${urlAPI}/getproperty`, requestOptions)
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
        setDestProError(true)
        callback('Error fetching data', null);
      });
  }
  const getAvailablityByDate = async(date1, date2) =>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  const data = {
    "weekly":0,
    "date1": date1,
    "date2": date2
  };

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  };

  try {
    const response = await fetch("https://rajanosha7.pythonanywhere.com/get_property_xml_date", requestOptions);
    const result = await response.text();
    const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(result, 'text/xml');
      const jsonData = xmlToJson(xmlDoc);
      return jsonData;
  } catch (error) {
    console.error('API Request Error:', error);
  }
    
  }
 async function fetchOneProperty() {
  const uniqueId = localStorage.getItem("propertyId")
    const urlAPI = `https://rajanosha7.pythonanywhere.com/get_singel_property`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "PropertyID": uniqueId,
      }),
    };

    try {
      const response = await fetch(urlAPI, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseBody = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseBody, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData;
    } catch (error) {
      setSinglePropError(true)
      console.log('Error:', error);
    }
  }
 async function GetLeaseidByReztypeid(formValues) {
    const { arrivalDate, deptDate, numAdult, numPet, numBaby, numChild} = formValues;
    console.log(formValues)
    const uniqueId = localStorage.getItem("propertyId")
    console.log(uniqueId)
    const url = `${urlAPI}/CreateQuote`;
    const requestBody = {
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
      console.log(data)
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
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const data = {
      "propertyId":uniqueId,
      "date1": date1,
      "date2": date2
    };
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${urlAPI}/is_property_available`, requestOptions);
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
  async function getMinDays(formValues) {
    const uniqueId = localStorage.getItem("propertyId")
    const url = `${urlAPI}/GetMinimumDays`;
    const requestBody = {
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
      "reztypeid": 20
    };
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(`${urlAPI}/create_qoute_by_resid`, requestOptions);
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
      const response = await fetch(`${urlAPI}/set_comments_info`, requestOptions);
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
    const arrivalDate =  localStorage.getItem('arrivalDate');
    const deptDate = localStorage.getItem("deptDate")
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const data = {
      "reztypeID": "20",
      "begindate": arrivalDate,
      "enddate": deptDate
    };
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(`${urlAPI}/optional_services`, requestOptions);
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
  async function AddCoupon(leaseId,couponCode) {
    console.log(leaseId,couponCode)
    const storedDataJSON = localStorage.getItem('quoteInfo');
    const parseData = JSON.parse(storedDataJSON);
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const data = {
      "leaseid": leaseId,
  "couponCode": couponCode
    };
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(`${urlAPI}/add_coupn_code`, requestOptions);
      const result = await response.text();
      console.log(result)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(result, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData
    } catch (error) {
      console.error('API Request Error:', error);
      return null;
    }
  }
  async function deleteCoupon(leaseID) {
    console.log(leaseID)
    // const storedDataJSON = localStorage.getItem('quoteInfo');
    // const parseData = JSON.parse(storedDataJSON);
    // const leaseId = parseData?.QuoteInfo?.Leaseid;
    // const url = `${urlAPI}/RemoveCoupon`;
    // const requestBody = {
    //   'leaseid':leaseID,
    // };

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: new URLSearchParams(requestBody)
    // };
    // try {
    //   const response = await fetch(url, requestOptions);
    //   const data = await response.text();
    //   const parser = new DOMParser();
    //   const xmlDoc = parser.parseFromString(data, 'text/xml');
    //   const xmlString = new XMLSerializer().serializeToString(xmlDoc);
    //   const parser2 = new DOMParser();
    //   const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
    //   const jsonData = xmlToJson(xmlDOM);
    //   return jsonData
    // } catch (error) {
    //   console.error('API Request Error:', error);
    
    // }
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
      const response = await fetch(`${urlAPI}/get_valid_coupn_list`, requestOptions);
      
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

  fetch(`${urlAPI}/setcustomerinfo`, requestOptions)
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
  async function fetchImage(propertyID) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const data = {
      "PropertyID": propertyID
    };
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(`${urlAPI}/get_singel_property_images`, requestOptions);
      const data = await response.text();
  
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      return jsonData?.DataSet['diffgr:diffgram']?.Property?.PropertyImg

    } catch (error) {
      console.error('API Request Error:', error);
    }
  }
  const saveProperty = async(formValues) =>{
    const {ezicAccount,
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
        const storedDataProperty = JSON.parse(localStorage.getItem('propertyRatesData'));
        let ratesValue = storedDataProperty.propertyratesdetails.ratesvalue['#text'].value;
        const currentDate = new Date();
        const differenceInDays = Math.floor((new Date(arrivalDate) - currentDate) / (1000 * 60 * 60 * 24));
        if (differenceInDays > 14) {
          ratesValue /= 2;
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        const raw = JSON.stringify({
          "portalid": "1",
          "a": "true",
          "b": ratesValue,
          "c": ezicAccount,
          "d": uniqueId,
          "e": arrivalDate,
          "f": deptDate,
          "g": tenatId,
          "h": leaseId,
          "i": transtype,
          "j": cFName,
          "k": cLName,
          "l": "ab",
          "m": "S",
          "n": "C",
          "o": creditCard,
          "p": month,
          "q": year,
          "r": cvv,
          "s": "HOTEL",
          "t": ccTypeCheck,
          "u": street,
          "v": city,
          "w": state,
          "x": zip,
          "y": country,
          "z": "12",
          "z1": "zip",
          "z2": "zip",
          "z3": "zip"
        });
  
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
  
        try {
          const response = await fetch(`${urlAPI}/payment_info`, requestOptions);
          const result = await response.text();
          console.log(result);
          const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(result, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      const parser2 = new DOMParser();
      const xmlDOM = parser2.parseFromString(xmlString, 'application/xml');
      const jsonData = xmlToJson(xmlDOM);
      setPropertyMessage(jsonData)
        } catch (error) {
          console.error('API Request Error:', error);
        }
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
    propertyMessage,
    singleProError,
    destProError,
    fetchImage,
    AddCoupon,
    deleteCoupon
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};