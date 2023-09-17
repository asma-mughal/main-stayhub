import React, { createContext, useContext, useState } from 'react';
import { urlAPI , barefootAccount, userName, password} from '../constants';
const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);

export const MyProvider = ({ children }) => {
  const [data, setData] = useState('abc');
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
      body: new URLSearchParams({
        'username': userName,
        'password': password,
        'barefootAccount': barefootAccount,
      })
    };
  
    fetch(`${urlAPI}/barefootwebservice/BarefootService.asmx/GetProperty`, requestOptions)
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
    return fetch(`${urlAPI}/barefootwebservice/BarefootService.asmx/GetPropertyAvailabilityByDateXML`, requestOptions)
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
  
    return fetch(`${urlAPI}/barefootwebservice/BarefootService.asmx/GetPropertyDetails`, requestOptions)
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
    const url = 'https://portals.barefoot.com/barefootwebservice/BarefootService.asmx/CreateQuote';
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
    const url = `https://portals.barefoot.com/barefootwebservice/BarefootService.asmx/IsPropertyAvailability`;
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
    const url = `${urlAPI}/barefootwebservice/BarefootService.asmx/GetMinimumDays`;
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

  //GetQuoteRatesDetail
  async function GetQuoteRatesDetail(formValues) {
    const { arrivalDate, deptDate, numAdult, numPet, numBaby, numChild} = formValues;
    const uniqueId = localStorage.getItem("propertyId")
    const url = `${urlAPI}/barefootwebservice/BarefootService.asmx/CreateQuoteByReztypeid`;
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
      'num_child': numChild,
      'reztypeid':20
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
  async function GetOptionalServiceIDs(formValues) {
    const uniqueId = localStorage.getItem("propertyId")
    const url = `${urlAPI}/barefootwebservice/BarefootService.asmx/CreateQuote`;
    const requestBody = {
      'username': userName,
      'password': password,
      'barefootAccount': barefootAccount,
      'reztypeID':20,
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
     console.log(jsonData)
    } catch (error) {
      console.error('API Request Error:', error);
    
    }
  }
  const saveProperty = async(payment,ezicAccount,propertyid,strDate,strEnd,tenantId,leaseId,ccTransType,firstName,lastName,ezicTagHere,ezicTranstype, ezicPayType,
    cardNumberHere,
   expireMonth,
   expireYear,
   cvv,
   ccRateType,
   ccType,
   street,
    city,
    state,
    zipCode,
   country) =>{
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
          'strPayment': payment,
          'EzicAccount': ezicAccount,
          'propertyId': propertyid,
          'strADate': strDate,
          'strDDate': strEnd,
          'tenantid': tenantId,
          'leaseid': leaseId,
          'cctranstype': ccTransType,
          'cFName': firstName,
          'cLName':lastName,
          'EzicTag': ezicTagHere,
          'EzicTranstype': ezicTranstype,
          'EzicPaytype': ezicPayType,
          'cardNum': cardNumberHere,
          'expireMonth': expireMonth,
          'expireYear':expireYear,
          'cvv':cvv,
          'ccratetype': ccRateType,
          'cctype':ccType,
          'street':street,
          'city': city,
          'state': state,
          'zip': zipCode,
          'country':country,
          'RoutingNo': 'routingNumberHere',
          'AccSource': 'accSourceHere'
            })
          };
      
          try {
            const response = await 
            fetch(`${urlAPI}/barefootwebservice/BarefootService.asmx/PropertyBookingNew`, requestOptions);
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const responseBodyText = await response.text();
            console.log(responseBodyText)
          } catch (error) {
          } finally {
           
          }
    }
  const fetchImages = () =>{
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
        'PropertyID': '6750'
      })
    };
  
    return fetch(`${urlAPI}/barefootwebservice/BarefootService.asmx/GetPropertyAllImgs`,
     requestOptions)
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
      })
      .catch(error => {
        throw new Error('Error fetching data');
      });
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
    fetchImages,
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
    xmlToJson
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};