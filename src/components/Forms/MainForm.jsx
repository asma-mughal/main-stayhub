import React, {useState} from 'react'

const MainForm = ({ fields, onSubmit , heading}) => {
  const [formData, setFormData] = useState({});

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

  return (
<div className="min-h-screen p-6 flex items-center justify-center font-poppins">
  <div className="container max-w-screen-lg mx-auto">
    <div>

      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">{heading}</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div className="lg:col-span-2">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
        {fields.map((field) => (
        <div className={`md:col-span-${field.colSpan}`} key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          {isFieldRequired(field.name) && <span className="text-red-600">*</span>}
          {field.customField ? field.customField(formData, handleChange) : (
            field.type === 'textarea' ? (
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
                      {option}
                    </option>
                  ))}
                </select>
                {/* Arrow icon or any other indicator if needed */}
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
            )
          )}
        </div>
      ))}
          <div className={`md:col-span-5 text-right`}>
            <div className="inline-flex items-end">
              <button type="submit" className="bg-secondary hover:bg-secondary/80
            mt-5
             text-white text-sm px-6 py-4 rounded-full transition duration-300 font-poppins">
                Submit
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
  )
}

export default MainForm
