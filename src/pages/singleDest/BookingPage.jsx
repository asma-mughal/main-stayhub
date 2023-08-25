import React from 'react'
import MainForm from '../../components/Forms/MainForm';
import { useMyContext } from '../../context/MyContext';
const BookingPage = () => {
    const {GetLeaseidByReztypeid,convertXmlToJson} = useMyContext()
    const fields = [
        { name: 'arrivalDate', label: 'Arrival Date', colSpan: 5, type:'date' },
        { name: 'deptDate', label: 'Departure Date', colSpan: 5, type:'date' },
        { name: 'numAdult', label: 'Number of Adult', colSpan: 5 , type:'number'},
        { name: 'numPet', label: 'Number of Pet', colSpan: 5 , type:'number'},
        { name: 'numBaby', label: 'Number of Baby', colSpan: 5, type:'number' },
        { name: 'numChild', label: 'Number of  Child', colSpan: 5, type:'number' }
      ];
      const handleSubmit = async (formData) => {
      //arrivalDate, deptDate, numAdult, numPet, numBaby, numChild
      const res =await  GetLeaseidByReztypeid(formData);
      console.log(res)

      };
  return (
    <MainForm fields={fields} onSubmit={handleSubmit} />
  )
}

export default BookingPage
