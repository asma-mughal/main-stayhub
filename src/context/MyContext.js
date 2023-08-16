import React, { createContext, useContext, useState } from 'react';
import xmlJs, {xml2js} from 'xml-js';
import { urlAPI , barefootAccount, userName, password} from '../constants';
const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);

export const MyProvider = ({ children }) => {
  const [data, setData] = useState('abc');
  
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
  const fetchImages = () =>{
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
        return jsonData;
      })
      .catch(error => {
        throw new Error('Error fetching data');
      });
  }
  const convertXmlToJson = (xmlData) => {
    const options = { compact: true, spaces: 2 };
    const result = xmlJs.xml2json(xmlData, options);
    return result;
  };
  const parseImages = (xmlResponse) =>{
    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const result = xml2js(xmlResponse, options);

    if (result.DataSet && result.DataSet.item) {
      const images = Array.isArray(result.DataSet.item)
        ? result.DataSet.item
        : [result.DataSet.item];
      console.log(images)
    }
  }
  const contextValue = {
    data,
    updateData,
    fetchData,
    convertXmlToJson,
    fetchOneProperty,
    fetchImages,
    parseImages
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};