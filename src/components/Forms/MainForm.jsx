import React, {useState, useRef, useEffect} from 'react'
import Footer from '../Footer/Footer';
import Navbar from '../Navbar';

const MainForm = ({ fields, onSubmit , heading,link, ratesValue, t}) => {
  const [formData, setFormData] = useState({});
  const [formContentHeight, setFormContentHeight] = useState(0);
  const formContentRef = useRef(null)
  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const isFieldRequired = (fieldName) => {
    const fieldConfig = fields.find((field) => field.name === fieldName);
    return fieldConfig ? fieldConfig.required : false;
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(formData);
  };
  useEffect(() => {
    // Calculate the form content height after the component has mounted
    if (formContentRef.current) {
      const height = formContentRef.current.clientHeight;
      setFormContentHeight(height);
    }
  }, []);

  return (
    <>

<div className="min-h-screen p-6 flex items-center justify-center font-poppins">
  <div className="container max-w-screen-lg mx-auto">
    <div>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          {/* Left container for the image */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <div className="h-full" id="image-container">
              <img src={link} alt="image" className="w-full max-h-full rounded" />
            </div>
          </div>

              {/* Right container for the form */}
              <div id="form-content" className="lg:col-span-2" ref={formContentRef}>
                <div className="text-gray-600">
                  <p className="font-medium text-lg ">{t(heading)}</p>
                  <p className="font-sm mb-2">{t("Please fill out all the fields")}.</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  {fields.map((field) => (
                      <div className={`md:col-span-${field.colSpan}`} key={field.name}>
                        <label htmlFor={field.name}>{t(field.label)}</label>
                        {isFieldRequired(field.name) && <span className="text-red-600">*</span>}
                        {field.name === 'strPayment' ? (
                          <input
                            type="text"
                            name={field.name}
                            id={field.name}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={ratesValue} 
                            readOnly 
                          />
                        ) : field.customField ? (
                          field.customField(formData, handleChange)
                        ) : field.type === 'textarea' ? (
                          <textarea
                          name={field.name}
                          id={field.name}
                          className="h-20 border px-1 mt-1 rounded w-full bg-gray-50"
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          placeholder={field.placeholder || ''}
                          required={isFieldRequired(field.name)}
                        />
                        ) : field.type === 'select' ? (
                          <div className="relative inline-block w-full">
                            <select
                              name={field.name}
                              id={field.name}
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              value={formData[field.name] || ''}
                              onChange={handleChange}
                              placeholder={field.placeholder || ''}
                              required={isFieldRequired(field.name)}
                              style={{ position: 'relative' }}
                            >
                              {field.options.map((option) => (
                                <option key={option} value={option}>
                                  {t(option)}
                                </option>
                              ))}
                            </select>
          
                          </div>
                        ) : (
                          <input
                          type={field.type || 'text'}
                          name={field.name}
                          id={field.name}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          placeholder={field.placeholder || ''}
                          required={isFieldRequired(field.name)}
                        />
                        )}
                      </div>
                    ))}
                    <div className={`md:col-span-5 text-right`}>
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          className="bg-secondary hover:bg-secondary/80 mt-5 text-white text-sm px-6 py-4 rounded-full transition duration-300 font-poppins"
                        >
                          {t("Submit")}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </>
  )
}

export default MainForm
