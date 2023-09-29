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
  
    fetch(`${urlAPI}/GetProperty`, requestOptions)
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
    const uniqueId = localStorage.getItem("propertyId")
    const url = `${urlAPI}/CreateQuoteByReztypeid`;
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
  async function setCommentsInfo(formValues, leaseID) {
    const { comments} = formValues;
    const url = `${urlAPI}/SetCommentsInfo`;
    const requestBody = {
      'username': userName,
      'password': password,
      'barefootAccount': barefootAccount,
      'leaseid':leaseID,
      'comments':comments,
      'commentType':'-1'
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
   
    const url = `${urlAPI}/GetValidCouponList`;
    const requestBody = {
      'username': userName,
      'password': password,
      'barefootAccount': barefootAccount,
      'leaseid':leaseId
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
  async function setCosumerInfo(formValues) {
    const uniqueId = localStorage.getItem("propertyId")
    console.log(formValues)
    const {street1,street2, city,state, zip,country,lastname,firstname,homephone,bizphone,fax,mobile,email,strADate,strDDate,SourceOfBusiness } = formValues;
    const url = `https://portals.barefoot.com/barefootwebservice/BarefootService.asmx/SetConsumerInfo?username=bsc20230607&password=%2320230607vhgfbefe%23375378&barefootAccount=v3cbsc0526&Info=${street1}&Info=${street2}&Info=${city}&Info=${state}&Info=${zip}&Info=${country}&Info=${lastname}&Info=${firstname}&Info=${homephone}&Info=${bizphone}&Info=${fax}&Info=${mobile}&Info=${email}&Info=${strADate}&Info=${strDDate}&Info=${uniqueId}&Info=${SourceOfBusiness}`;
    
      fetch(url)  
        .then(response => {
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
          }
          return response.text();
        })
        .then(data => {
          const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const tenantId = xmlDoc.getElementsByTagName("int")[0]?.textContent;
    localStorage.setItem("tenantId", tenantId);
        })
        .catch(error => {
          console.error(error);
        });
  }
  
  const saveProperty = async(payment,ezicAccount,propertyid,strADate,strEnd,tenantId,leaseId,ccTransType,firstName,lastName,ezicTagHere,ezicTranstype, ezicPayType,
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
    const url = `https://portals.barefoot.com/barefootwebservice/BarefootService.asmx/PropertyBooking?username=bsc20230607&password=%2320230607vhgfbefe%23375378&barefootAccount=v3cbsc0526&portalid=1&Info=false&Info=${payment}&Info=${ezicAccount}&Info=propertyId&Info=${strADate}&Info=${strEnd}&Info=6643&Info=120&Info=${ccTransType}&Info=${firstName}&Info=${lastName}&Info=${ezicTagHere}&Info=${ezicTranstype}&Info=${ezicPayType}&Info=${cardNumberHere}&Info=${expireMonth}&Info=${expireYear}&Info=${cvv}&Info=${ccRateType}&Info=${ccType}&Info=${street}&Info=${city}&Info=${state}&Info=${zipCode}&Info=${country}&Info=zip&Info=zip&Info=zip`;
    
      fetch(url)  
        .then(response => {
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
          }
          return response.text();
        })
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error(error);
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
    setCommentsInfo
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};